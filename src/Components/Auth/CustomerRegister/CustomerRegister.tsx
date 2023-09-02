import "./CustomerRegister.css";
import { useForm } from "react-hook-form";
import * as zod from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRef, useState } from "react";
import MyInput from "../../MyStyles/MyInput/MyInput";
import { Theme } from "../../../Models/ThemeType";
import {
  CustomerRegisterDetails,
  CustomerRegisterReq,
} from "../../../Models/RegisterModel";
import { useNavigate } from "react-router-dom";
import webApiService from "../../../Services/WebApiService";
import { useDispatch } from "react-redux";
import { LoginReqModel } from "../../../Models/Login";
import { userLoggedIn } from "../../../Redux/UserAppState";
import { loggedIn } from "../../../Redux/GuardAppState";
import { ClientTypes } from "../../../Models/ClientType";
interface CustomerRegisterProp {
  theme: Theme;
}
function CustomerRegister({ theme }: CustomerRegisterProp): JSX.Element {
  const schema = zod
    .object({
      email: zod
        .string()
        .nonempty("Oops! You need to type your email here")
        .email("Email fail! Please type in your correct email address"),
      password: zod
        .string()
        .nonempty("Hey, we need a password here")
        .min(4, "ohh, you need 4 or more characters"),
      confirm: zod
        .string()
        .nonempty("Hey, we need a password here")
        .min(4, "ohh, you need 4 or more characters"),
      firstName: zod
        .string()
        .nonempty("We need your first name - it's nicer that way"),
      lastName: zod.string().nonempty("Last name, too, please!"),
    })
    .refine((value) => value.password === value.confirm, {
      message: "Passwords must match",
      path: ["confirm"],
    });

  const {
    register,
    handleSubmit,
    formState: { errors, isValid, isSubmitting },
    trigger,
  } = useForm<CustomerRegisterDetails>({
    mode: "onTouched",
    resolver: zodResolver(schema),
  });

  const anchorRefs = {
    email: useRef(null),
    password: useRef(null),
    confirm: useRef(null),
    firstName: useRef(null),
    lastName: useRef(null),
  };
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [errorSpan, setErrorSpan] = useState("");
  const onSubmit = (data: CustomerRegisterDetails) => {
    trigger();
    const reqBody = {
      firstName: data.firstName,
      lastName: data.lastName,
      password: data.password,
      email: data.email,
    } as CustomerRegisterReq;
    return webApiService
      .customerRegister(reqBody)
      .then(() => {
        const reqBody = {
          email: data.email,
          password: data.password,
          clientType: "CUSTOMER",
        } as LoginReqModel;
        return webApiService
          .login(reqBody)
          .then((res) => {
            dispatch(userLoggedIn(res.data));
            dispatch(loggedIn(ClientTypes.CUSTOMER));
            navigate("/welcome");
          })
          .catch(() => navigate("/login"));
      })
      .catch((err) =>
        err?.response
          ? setErrorSpan(err.response.data.description)
          : setErrorSpan("something went wrong")
      );
  };
  return (
    <div className="CustomerRegister">
      <form
        action=""
        className="registerForm"
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
          anchorRef={anchorRefs.lastName}
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

        <MyInput
          name="confirm"
          type="password"
          anchorRef={anchorRefs.confirm}
          error={errors.confirm}
          register={register}
          title="CONFIRM PASSWORD"
          theme={theme}
        />
        <span className="errorSpan">{errorSpan}</span>
        <button
          type="submit"
          disabled={!isValid || isSubmitting}
          className="authSubmitButton"
        >
          JOIN COUPLA
        </button>
      </form>
    </div>
  );
}

export default CustomerRegister;
