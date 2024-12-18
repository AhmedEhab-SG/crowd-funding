import ButtonStyled from "../../shared/ButtonStyled";
import InputStyled from "../../shared/InputStyled";
import en from "../../../locales/en.json";
import { SubmitHandler, useForm } from "react-hook-form";
import { Login } from "../../../types/auth";
import loginSchema from "../../../schemas/auth/login.schema";
import { zodResolver } from "@hookform/resolvers/zod";
import { useState } from "react";
import { trim } from "../../../utils/functions/general";
import { ClipLoader } from "react-spinners";
import { login } from "../../../api/routes/auth";
import { getHeaderAuthorization } from "../../../api/utils";
import useLocalStorage from "../../../hooks/useLocalStorage";
import { useNavigate } from "react-router-dom";
import { appRoutes } from "../../../config";

const {
  email,
  forgotPassword,
  password,
  rememberMe,
  login: loginText,
  invaildCredentials,
  logining,
} = en.pages.auth.login.form;

const Form = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [invalidCredentials, setInvalidCredentials] = useState(false);
  const { setValue } = useLocalStorage("session");
  const push = useNavigate();

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<Login>({
    resolver: zodResolver(loginSchema),
  });

  const onSubmitHandler: SubmitHandler<Login> = async (data) => {
    try {
      setIsLoading(() => true);
      setInvalidCredentials(() => false);

      const res = await login(data);

      if (!res.data) {
        setIsLoading(() => false);
        setInvalidCredentials(() => true);
      }

      const accessToken = getHeaderAuthorization(res);

      if (!accessToken) {
        setInvalidCredentials(() => true);
        return;
      }

      if (data.rememberMe) {
        setValue({ ...res.data.user, accessToken }, "localStorage");
      } else {
        setValue({ ...res.data.user, accessToken }, "sessionStorage");
      }

      setIsLoading(() => false);
      reset();
      push(appRoutes.home);
    } catch (error) {
      setIsLoading(() => false);
      setInvalidCredentials(() => true);
    }
  };

  return (
    <form
      onSubmit={handleSubmit(onSubmitHandler)}
      className="flex flex-col gap-4"
    >
      <InputStyled
        border
        placeholder={email}
        className="rounded-sm"
        tagSize="sm"
        placeholderClassName="text-gray-500"
        {...register("email")}
        error={errors.email?.message}
        disabled={isLoading}
      />
      <InputStyled
        border
        placeholder={password}
        tagSize="sm"
        className="rounded-sm"
        placeholderClassName="text-gray-500"
        type="password"
        {...register("password")}
        error={errors.password?.message}
        disabled={isLoading}
      />

      <ButtonStyled
        size="sm"
        className="p-0 text-blue-600 self-start hover:text-black"
        title={forgotPassword}
        disabled={isLoading}
      />

      <ButtonStyled
        type="submit"
        title={isLoading ? logining : loginText}
        disabled={isLoading}
        SvgIcon={isLoading && <ClipLoader size={20} color="white" />}
        className="text-white bg-primary hover:bg-green-900"
      />

      <InputStyled
        contianerClassName="flex gap-2 flex-row-reverse items-center"
        labelClassName="p-0 m-0 text-responsive-2xs font-normal"
        inputContainerClassName="w-fit"
        type="checkbox"
        disabled={isLoading}
        label={rememberMe}
        {...register("rememberMe")}
      />

      {!isLoading && invalidCredentials && (
        <p
          className={trim(`
            text-responsive-2sm
            text-center
            text-red-500
            font-semibold
            bg-red-100
            p-2`)}
        >
          {invaildCredentials}
        </p>
      )}
    </form>
  );
};

export default Form;
