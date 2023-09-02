import "./Login.css";
import { SubmitHandler, useForm } from "react-hook-form";
import * as zod from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { LoginReqModel } from "../../../Models/Login";
import { useRef, useState } from "react";
import MyInput from "../../MyStyles/MyInput/MyInput";
import MySelect from "../../MyStyles/MySelect/MySelect";
import { ClientTypes } from "../../../Models/ClientType";
import { getEnumValuesAsStringArray } from "../../../Contexts/SearchMethods";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../../Redux/Store";
import webApiService from "../../../Services/WebApiService";
import { useNavigate } from "react-router-dom";
import { userLoggedIn } from "../../../Redux/UserAppState";
import { loggedIn } from "../../../Redux/GuardAppState";

function Login(): JSX.Element {
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
    clientType: zod
      .string()
      .nonempty("We really need to know your client type"),
  });
  const {
    register,
    handleSubmit,
    formState: { errors, isValid, isSubmitting },
    trigger,
  } = useForm<LoginReqModel>({
    mode: "onTouched",
    resolver: zodResolver(schema),
  });

  const anchorRefs = {
    email: useRef(null),
    password: useRef(null),
    clientType: useRef(null),
  };
  const [errorSpan, setErrorSpan] = useState("");
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const onSubmit: SubmitHandler<LoginReqModel> = (data: LoginReqModel) => {
    trigger();
    return webApiService
      .login(data)
      .then((res) => {
        dispatch(userLoggedIn(res.data));
        dispatch(loggedIn(data.clientType as unknown as ClientTypes));
        navigate("/home");
      })
      .catch((err) =>
        err?.response
          ? setErrorSpan(err.response.data.description)
          : setErrorSpan("something went wrong")
      );
  };

  const clientTypeAsString: string[] = getEnumValuesAsStringArray(ClientTypes);

  return (
    <div className="Login">
      <form
        className="loginForm"
        onSubmit={(...args) => void handleSubmit(onSubmit)(...args)}
      >
        <MySelect
          name="clientType"
          anchorRef={anchorRefs.clientType}
          error={errors.clientType}
          register={register}
          title="I AM"
          id="clientTypeLabel"
          items={clientTypeAsString}
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
          SIGN IN
        </button>
      </form>
    </div>
  );
}

export default Login;
