import ButtonStyled from "../../shared/ButtonStyled";
import InputStyled from "../../shared/InputStyled";
import en from "../../../locales/en.json";
import { useState } from "react";
import { Signup } from "../../../types/auth";
import { zodResolver } from "@hookform/resolvers/zod";
import { SubmitHandler, useForm } from "react-hook-form";
import signupSchema from "../../../schemas/auth/signup.schema";
import { ClipLoader } from "react-spinners";

const {
  name,
  email,
  reEmail,
  password,
  rePassword,
  sendMe,
  contactMe,
  create,
  creating,
} = en.pages.auth.singup.form;

const Form = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [showReEnter, setShowReEnter] = useState({
    email: false,
    password: false,
  });

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<Signup>({
    resolver: zodResolver(signupSchema),
  });

  const onSubmitHandler: SubmitHandler<Signup> = async (data) => {
    try {
      console.log(data);
    } catch (error) {}
  };

  return (
    <form
      onSubmit={handleSubmit(onSubmitHandler)}
      className="flex flex-col gap-4"
    >
      <InputStyled
        border
        placeholder={name}
        className="rounded-sm"
        tagSize="sm"
        placeholderClassName="text-gray-500"
        {...register("name")}
        error={errors.name?.message}
        disabled={isLoading}
      />

      <InputStyled
        border
        placeholder={email}
        className="rounded-sm"
        tagSize="sm"
        placeholderClassName="text-gray-500"
        onClick={() => setShowReEnter((prev) => ({ ...prev, email: true }))}
        {...register("email")}
        error={errors.email?.message}
        disabled={isLoading}
      />
      {showReEnter.email && (
        <InputStyled
          border
          placeholder={reEmail}
          tagSize="sm"
          className="rounded-sm"
          placeholderClassName="text-gray-500"
          {...register("confirmEmail")}
          error={errors.confirmEmail?.message}
          disabled={isLoading}
        />
      )}

      <InputStyled
        border
        placeholder={password}
        tagSize="sm"
        className="rounded-sm"
        placeholderClassName="text-gray-500"
        type="password"
        onClick={() => setShowReEnter((prev) => ({ ...prev, password: true }))}
        {...register("password")}
        error={errors.password?.message}
        disabled={isLoading}
      />
      {showReEnter.password && (
        <InputStyled
          border
          placeholder={rePassword}
          tagSize="sm"
          className="rounded-sm"
          placeholderClassName="text-gray-500"
          type="password"
          {...register("confirmPassword")}
          error={errors.confirmPassword?.message}
          disabled={isLoading}
        />
      )}

      <InputStyled
        contianerClassName="flex gap-2 flex-row-reverse"
        labelClassName="p-0 m-0 text-responsive-2xs leading-normal font-normal"
        inputContainerClassName="w-fit"
        type="checkbox"
        label={sendMe}
        disabled={isLoading}
      />
      <InputStyled
        contianerClassName="flex gap-2 flex-row-reverse"
        labelClassName="p-0 m-0 text-responsive-2xs leading-normal  font-normal"
        inputContainerClassName="w-fit"
        type="checkbox"
        label={contactMe}
        disabled={isLoading}
      />

      <ButtonStyled
        type="submit"
        title={isLoading ? creating : create}
        SvgIcon={isLoading && <ClipLoader size={20} color="white" />}
        disabled={isLoading}
        className="text-white bg-primary hover:bg-green-900"
      />
    </form>
  );
};

export default Form;
