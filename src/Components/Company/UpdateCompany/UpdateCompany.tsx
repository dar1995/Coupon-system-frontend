import "./UpdateCompany.css";
import * as zod from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../../Redux/Store";
import { CompanyModel } from "../../../Models/CompanyModel";
import { useRef, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import MyInput from "../../MyStyles/MyInput/MyInput";
import webApiService from "../../../Services/WebApiService";
import { updatedCompanyAction } from "../../../Redux/CompanyAppState";
import SuccessDialog from "../../MyStyles/SuccessDialog/SuccessDialog";
function UpdateCompany(): JSX.Element {
  const theme = useSelector((state: RootState) => state.themeReducer.theme);
  const params = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const id = +(params.id || 0);
  const obj = useSelector((state: RootState) =>
    state.companiesReducer.companies.find((obj) => obj.id === id)
  );
  const defaultValuesObj = { ...obj };
  const [errorSpan, setErrorSpan] = useState("");
  const [isOpen, setOpen] = useState(false);
  const handleClose = () => {
    setOpen(false);
    navigate("/admin/companies");
  };
  const schema = zod.object({
    id: zod.number(),
    email: zod
      .string()
      .nonempty("Oops! You need to type your email here")
      .email("Email fail! Please type in your correct email address"),
    password: zod
      .string()
      .nonempty("Hey, we need a password here")
      .min(4, "ohh, you need 4 or more characters"),
    name: zod
      .string()
      .nonempty("We need your company's name - it's nicer that way"),
  });
  const {
    register,
    handleSubmit,
    formState: { errors, isValid, isSubmitting },
    trigger,
  } = useForm<CompanyModel>({
    defaultValues: defaultValuesObj,
    mode: "onTouched",
    resolver: zodResolver(schema),
  });
  const anchorRefs = {
    email: useRef(null),
    password: useRef(null),
    name: useRef(null),
    id: useRef(null),
  };

  const onSubmit = (data: CompanyModel) => {
    trigger();
    return webApiService
      .updateCompany(id, data)
      .then((res) => {
        dispatch(updatedCompanyAction(res.data));
        setOpen(true);
      })
      .catch((err) =>
        err?.response
          ? setErrorSpan(err.response.data.description)
          : setErrorSpan("something went wrong")
      );
  };
  return (
    <div className="UpdateCompany">
      <form
        action=""
        className="updateCompanyForm"
        onSubmit={(...args) => void handleSubmit(onSubmit)(...args)}
      >
        <MyInput
          name="id"
          type="number"
          anchorRef={anchorRefs.id}
          error={errors.id}
          register={register}
          title="ID"
          theme={theme}
          isDisabled={true}
          description="Cannot edit company's Id"
        />

        <MyInput
          name="name"
          type="string"
          anchorRef={anchorRefs.name}
          error={errors.name}
          register={register}
          title="COMPANY NAME"
          theme={theme}
          isDisabled={true}
          description="Cannot edit company's name"
        />

        <MyInput
          name="email"
          type="email"
          anchorRef={anchorRefs.email}
          error={errors.email}
          register={register}
          title="EMAIL ADDRESS"
          theme={theme}
        />

        <MyInput
          name="password"
          type="password"
          anchorRef={anchorRefs.password}
          error={errors.password}
          register={register}
          title="PASSWORD"
          theme={theme}
        />

        <span className="errorSpan">{errorSpan}</span>

        <button
          type="submit"
          disabled={!isValid || isSubmitting}
          className="authSubmitButton"
        >
          UPDATE COMPANY
        </button>
      </form>
      <SuccessDialog
        isDeleteMessageDialogOpen={isOpen}
        handelDeleteMessageClose={handleClose}
        content={"Company updated successfully"}
      />
    </div>
  );
}

export default UpdateCompany;
