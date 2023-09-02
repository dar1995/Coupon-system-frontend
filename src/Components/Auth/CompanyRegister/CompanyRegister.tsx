import "./CompanyRegister.css";
import { useForm } from "react-hook-form";
import * as zod from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRef, useState } from "react";
import MyInput from "../../MyStyles/MyInput/MyInput";
import { Theme } from "../../../Models/ThemeType";
import {
  CompanyRegisterDetails,
  CompanyRegisterReq,
} from "../../../Models/RegisterModel";
import webApiService from "../../../Services/WebApiService";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { userLoggedIn } from "../../../Redux/UserAppState";
import { loggedIn } from "../../../Redux/GuardAppState";
import { ClientTypes } from "../../../Models/ClientType";
import { LoginReqModel } from "../../../Models/Login";
interface CompanyRegisterProp {
  theme: Theme;
}
function CompanyRegister({ theme }: CompanyRegisterProp): JSX.Element {
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
      name: zod
        .string()
        .nonempty("We need your company's name - it's nicer that way"),
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
  } = useForm<CompanyRegisterDetails>({
    mode: "onTouched",
    resolver: zodResolver(schema),
  });

  const anchorRefs = {
    email: useRef(null),
    password: useRef(null),
    confirm: useRef(null),
    name: useRef(null),
  };
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [errorSpan, setErrorSpan] = useState("");
  const onSubmit = (data: CompanyRegisterDetails) => {
    trigger();
    const reqBody = {
      name: data.name,
      password: data.password,
      email: data.email,
    } as CompanyRegisterReq;
    return webApiService
      .companyRegister(reqBody)
      .then(() => {
        const reqBody = {
          email: data.email,
          password: data.password,
          clientType: "COMPANY",
        } as LoginReqModel;
        return webApiService
          .login(reqBody)
          .then((res) => {
            dispatch(userLoggedIn(res.data));
            dispatch(loggedIn(ClientTypes.COMPANY));
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
    <div className="CompanyRegister">
      <form
        action=""
        className="registerForm"
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

export default CompanyRegister;
