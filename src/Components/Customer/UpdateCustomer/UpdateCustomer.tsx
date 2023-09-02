import "./UpdateCustomer.css";
import { RootState } from "../../../Redux/Store";
import * as zod from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { CustomerModel } from "../../../Models/CustomerModel";
import { useRef, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import webApiService from "../../../Services/WebApiService";
import { updatedCustomerAction } from "../../../Redux/CustomerAppState";
import MyInput from "../../MyStyles/MyInput/MyInput";
import SuccessDialog from "../../MyStyles/SuccessDialog/SuccessDialog";
import { useDispatch, useSelector } from "react-redux";

function UpdateCustomer(): JSX.Element {
  const theme = useSelector((state: RootState) => state.themeReducer.theme);
  const params = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const id = +(params.id || 0);
  const obj = useSelector((state: RootState) =>
    state.customersReducer.customers.find((obj) => obj.id === id)
  );
  const defaultValuesObj = { ...obj };
  const [errorSpan, setErrorSpan] = useState("");
  const [isOpen, setOpen] = useState(false);
  const handleClose = () => {
    setOpen(false);
    navigate("/admin/customers");
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
    defaultValues: defaultValuesObj,
    mode: "onTouched",
    resolver: zodResolver(schema),
  });
  const anchorRefs = {
    email: useRef(null),
    password: useRef(null),
    firstName: useRef(null),
    LastName: useRef(null),
    id: useRef(null),
  };
  const onSubmit = (data: CustomerModel) => {
    trigger();
    return webApiService
      .updateCustomer(id, data)
      .then((res) => {
        dispatch(updatedCustomerAction(res.data));
        setOpen(true);
      })
      .catch((err) =>
        err?.response
          ? setErrorSpan(err.response.data.description)
          : setErrorSpan("something went wrong")
      );
  };
  return (
    <div className="UpdateCustomer">
      <form
        action=""
        className="updateCustomerForm"
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
          description="Cannot edit customer's Id"
        />
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
          UPDATE CUSTOMER
        </button>
      </form>
      <SuccessDialog
        isDeleteMessageDialogOpen={isOpen}
        handelDeleteMessageClose={handleClose}
        content={"Customer updated successfully"}
      />
    </div>
  );
}

export default UpdateCustomer;
