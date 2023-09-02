import "./AddCompany.css";
import * as zod from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { CompanyModel } from "../../../Models/CompanyModel";
import { useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import MyInput from "../../MyStyles/MyInput/MyInput";
import { RootState } from "../../../Redux/Store";
import webApiService from "../../../Services/WebApiService";
import { addedCompanyAction } from "../../../Redux/CompanyAppState";
import SuccessDialog from "../../MyStyles/SuccessDialog/SuccessDialog";

function AddCompany(): JSX.Element {
  const theme = useSelector((state: RootState) => state.themeReducer.theme);
  const schema = zod.object({
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
    mode: "onTouched",
    resolver: zodResolver(schema),
  });
  const anchorRefs = {
    email: useRef(null),
    password: useRef(null),
    name: useRef(null),
  };
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [errorSpan, setErrorSpan] = useState("");
  const [isOpen, setOpen] = useState(false);
  const handleClose = () => {
    setOpen(false);
    navigate("/admin/companies");
  };
  const onSubmit = (data: CompanyModel) => {
    trigger();
    return webApiService
      .addCompany(data)
      .then((res) => {
        dispatch(addedCompanyAction(res.data));
        setOpen(true);
      })
      .catch((err) =>
        err?.response
          ? setErrorSpan(err.response.data.description)
          : setErrorSpan("something went wrong")
      );
  };
  return (
    <div className="AddCompany">
      <form
        action=""
        className="addCompanyForm"
        onSubmit={handleSubmit(onSubmit)}
      >
        <MyInput
          name="name"
          type="string"
          anchorRef={anchorRefs.name}
          error={errors.name}
          register={register}
          title="COMPANY NAME"
          theme={theme}
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
          ADD COMPANY
        </button>
      </form>
      <SuccessDialog
        isDeleteMessageDialogOpen={isOpen}
        handelDeleteMessageClose={handleClose}
        content={"Company added successfully"}
      />
    </div>
  );
}

export default AddCompany;
