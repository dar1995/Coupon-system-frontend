import { useDispatch, useSelector } from "react-redux";
import "./AddCustomer.css";
import { RootState } from "../../../Redux/Store";
import * as zod from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { CustomerModel } from "../../../Models/CustomerModel";
import { useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import webApiService from "../../../Services/WebApiService";
import { addedCustomerAction } from "../../../Redux/CustomerAppState";
import MyInput from "../../MyStyles/MyInput/MyInput";
import SuccessDialog from "../../MyStyles/SuccessDialog/SuccessDialog";

function AddCustomer(): JSX.Element {
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
    firstName: zod
      .string()
      .nonempty("We need your first name - it's nicer that way"),
    lastName: zod.string().nonempty("Last name, too, please!"),
  });
  const {
    register,
    handleSubmit,
    formState: { errors, isValid, isSubmitting },
    trigger,
  } = useForm<CustomerModel>({
    mode: "onTouched",
    resolver: zodResolver(schema),
  });
  const anchorRefs = {
    email: useRef(null),
    password: useRef(null),
    firstName: useRef(null),
    LastName: useRef(null),
  };
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [errorSpan, setErrorSpan] = useState("");
  const [isOpen, setOpen] = useState(false);
  const handleClose = () => {
    setOpen(false);
    navigate("/admin/customers");
  };
  const onSubmit = (data: CustomerModel) => {
    trigger();
    return webApiService
      .addCustomer(data)
      .then((res) => {
        dispatch(addedCustomerAction(res.data));
        setOpen(true);
      })
      .catch((err) =>
        err?.response
          ? setErrorSpan(err.response.data.description)
          : setErrorSpan("something went wrong")
      );
  };
  return (
    <div className="AddCustomer">
      <form
        action=""
        className="addCustomerForm"
        onSubmit={handleSubmit(onSubmit)}
      >
        <MyInput
          name="firstName"
          type="string"
          anchorRef={anchorRefs.firstName}
          error={errors.firstName}
          register={register}
          title="FIRST NAME"
          theme={theme}
        />
        <MyInput
          name="lastName"
          type="string"
          anchorRef={anchorRefs.LastName}
          error={errors.lastName}
          register={register}
          title="LAST NAME"
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
          ADD CUSTOMER
        </button>
      </form>
      <SuccessDialog
        isDeleteMessageDialogOpen={isOpen}
        handelDeleteMessageClose={handleClose}
        content={"Customer added successfully"}
      />
    </div>
  );
}

export default AddCustomer;
