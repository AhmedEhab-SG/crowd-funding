"use client";

import {
  ForwardedRef,
  forwardRef,
  InputHTMLAttributes,
  ReactNode,
} from "react";
import Label from "./components/Label";
import Input from "./components/Input";
import Placeholder from "./components/Placeholder";
import Error from "./components/Error";
import SvgIcon from "./components/SvgIcon";
import { formatClasses } from "./components/classes";
import styles from "./input-styles.module.css";

const InputStyled = forwardRef(
  (
    {
      className = "",
      labelClassName = "",
      id,
      label,
      placeholder,
      svgIcon,
      iconLeft,
      border,
      error,
      tagSize = "md",
      elemType = "input",
      transparent,
      errorClassName = "",
      placeholderStyle,
      placeholderClassName = "",
      inputContainerClassName = "",
      svgIconClassName = "",
      contianerClassName = "",
      customInputElement,
      ...attributes
    }: {
      className?: string;
      id?: string;
      label?: string;
      placeholder?: string;
      svgIcon?: JSX.Element;
      iconLeft?: boolean;
      border?: boolean;
      transparent?: boolean;
      labelClassName?: string;
      svgIconClassName?: string;
      error?: string;
      tagSize?: "xs" | "sm" | "md" | "lg" | "xl" | "custom";
      elemType?: "input" | "textarea";
      placeholderStyle?: "inside" | "over";
      errorClassName?: string;
      placeholderClassName?: string;
      inputContainerClassName?: string;
      contianerClassName?: string;
      customInputElement?: (classes: {
        tagClasses: string;
        inputClasses: string;
        textareaClasses: string;
      }) => ReactNode;
    } & InputHTMLAttributes<HTMLInputElement | HTMLTextAreaElement>,
    ref: ForwardedRef<HTMLInputElement | HTMLTextAreaElement>
  ) => (
    <div
      className={formatClasses(`
        ${styles.contianerClassName}
        ${contianerClassName}`)}
    >
      {label && (
        <Label
          id={id}
          label={label}
          labelClassName={labelClassName}
          tagSize={tagSize}
          error={error}
        />
      )}

      <div
        className={formatClasses(`
          ${styles.inputContainerClassName}
          ${inputContainerClassName}`)}
      >
        <Input
          ref={ref}
          border={border}
          className={className}
          elemType={elemType}
          error={error}
          id={id}
          tagSize={tagSize}
          transparent={transparent}
          svgIcon={svgIcon}
          iconLeft={iconLeft}
          customInputElement={customInputElement}
          {...attributes}
        />

        {placeholder && (
          <Placeholder
            elemType={elemType}
            tagSize={tagSize}
            error={error}
            placeholder={placeholder}
            placeholderStyle={placeholderStyle}
            placeholderClassName={placeholderClassName}
            iconLeft={iconLeft}
            svgIcon={svgIcon}
          />
        )}

        {svgIcon && (
          <SvgIcon
            svgIcon={svgIcon}
            svgIconClassName={svgIconClassName}
            iconLeft={iconLeft}
            tagSize={tagSize}
            error={error}
          />
        )}
      </div>

      {error && (
        <Error
          error={error}
          errorClassName={errorClassName}
          tagSize={tagSize}
        />
      )}
    </div>
  )
);

InputStyled.displayName = "InputStyled";

export default InputStyled;
