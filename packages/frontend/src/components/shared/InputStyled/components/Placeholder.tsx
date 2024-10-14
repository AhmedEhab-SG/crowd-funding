"use client";

import getClasses, { formatClasses } from "./classes";

const Placeholder = ({
  placeholder,
  placeholderClassName = "",
  elemType,
  placeholderStyle,
  tagSize,
  error,
  iconLeft,
  svgIcon,
}: {
  placeholder?: string;
  placeholderClassName?: string;
  placeholderStyle?: "inside" | "over";
  elemType?: "input" | "textarea";
  tagSize?: "xs" | "sm" | "md" | "lg" | "xl" | "custom";
  error?: string;
  svgIcon?: JSX.Element;
  iconLeft?: boolean;
}) => {
  const classes = getClasses("placeholder", {
    elemType,
    tagSize,
    error,
    iconLeft,
    svgIcon,
    placeholderStyle,
  });
  return (
    <span
      className={formatClasses(`
        ${classes}
        ${placeholderClassName}`)}
    >
      {placeholder}
    </span>
  );
};

export default Placeholder;
