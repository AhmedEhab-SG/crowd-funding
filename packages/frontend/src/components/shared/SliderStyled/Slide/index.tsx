import { ForwardedRef, forwardRef, HTMLAttributes, ReactNode } from "react";
import styles from "./slide-styles.module.css";
import { formatClasses } from "../utils";

const Slide = forwardRef(
  (
    {
      children,
      className = "",
      ...attributes
    }: {
      children: ReactNode;
      className?: string;
    } & HTMLAttributes<HTMLLIElement>,
    ref: ForwardedRef<HTMLLIElement>
  ) => {
    return (
      <li
        ref={ref}
        className={formatClasses(`
        ${styles.slide}
        ${className}`)}
        {...attributes}
      >
        {children}
      </li>
    );
  }
);

export default Slide;
