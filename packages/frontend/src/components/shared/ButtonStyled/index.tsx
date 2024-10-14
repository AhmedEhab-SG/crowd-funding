import {
  AnchorHTMLAttributes,
  ButtonHTMLAttributes,
  CSSProperties,
  ForwardedRef,
  MouseEvent,
  MouseEventHandler,
  ReactNode,
  forwardRef,
  useImperativeHandle,
} from "react";
import { Link } from "react-router-dom";
import styles from "./button-styles.module.css";
import useRippleEffect from "./useRippleEffect";
import varablesTwClasses, { formatClasses } from "./variables";

interface ButtonStyledProps
  extends ButtonHTMLAttributes<HTMLElement>,
    AnchorHTMLAttributes<HTMLElement> {
  className?: string;
  style?: CSSProperties;
  elemType?: "button" | "link";
  type?: "button" | "submit" | "reset";
  size?: "xs" | "sm" | "md" | "lg" | "custom";
  target?: string;
  disabled?: boolean;
  border?: boolean;
  animatedBorder?: boolean;
  animatedBorderClassName?: string;
  animatedUnderline?: boolean;
  href?: string;
  SvgIcon?: ReactNode;
  bg?: boolean;
  ripple?: boolean;
  title?: string;
  IconRight?: boolean;
  success?: boolean;
  warning?: boolean;
  danger?: boolean;
  children?: ReactNode;
  onClick?: MouseEventHandler<HTMLButtonElement | HTMLAnchorElement>;
}

interface ImperativeHandle {
  focus: () => void;
}

const ButtonStyled = forwardRef(
  (
    {
      className = "",
      animatedBorderClassName = "",
      style,
      SvgIcon,
      elemType = "button",
      type = "button",
      target,
      size = "md",
      border,
      animatedBorder,
      animatedUnderline,
      ripple,
      disabled,
      href,
      title,
      IconRight,
      children,
      bg,
      success,
      warning,
      danger,
      onClick,
      ...attributes
    }: ButtonStyledProps,
    ref: ForwardedRef<HTMLButtonElement | HTMLAnchorElement>
  ) => {
    const [targetRef, setFire] = useRippleEffect(ripple, {
      bgColor: varablesTwClasses.rippleBg,
      duration: varablesTwClasses.rippleDuration,
    });

    const classes = formatClasses(`
      ${styles.mainStyles}
      ${varablesTwClasses.font}
      ${varablesTwClasses.text}
      ${varablesTwClasses.hover}
      ${disabled ? styles.cursorNotAllowed : styles.cursorPointer}
      ${size === "xs" ? styles.xsStyles : ""}
      ${size === "sm" ? styles.smStyles : ""}
      ${size === "md" ? styles.mdStyles : ""}
      ${size === "lg" ? styles.lgStyles : ""}
      ${bg ? varablesTwClasses.bg : ""}
      ${
        border && !success && !warning && !danger
          ? varablesTwClasses.border
          : ""
      }
      ${animatedBorder ? `${styles.animatedBorder}` : ""}
      ${animatedUnderline ? styles.animatedUnderline : ""}
      ${success ? styles.success : ""}
      ${success && border ? styles.successBorder : ""}
      ${warning ? styles.warning : ""}
      ${warning && border ? styles.warningBorder : ""}
      ${danger ? styles.danger : ""}
      ${danger && border ? styles.dangerBorder : ""}
      ${className}
      group`);

    const animatedElement = (
      <span
        className={formatClasses(`
          ${styles.background}
          ${varablesTwClasses.bg}
          ${varablesTwClasses.hover}
          ${animatedBorderClassName}`)}
      ></span>
    );

    useImperativeHandle<unknown, ImperativeHandle>(ref, () => ({
      focus: () => {
        if (targetRef.current) {
          targetRef.current.focus();
        }
      },
    }));

    const onClickHandler = (
      e: MouseEvent<HTMLButtonElement | HTMLAnchorElement>
    ) => {
      setFire(e);
      if (onClick) onClick(e);
    };

    const refHandler = (e: HTMLButtonElement | HTMLAnchorElement) => {
      if (typeof ref === "function") return ref(e);
      targetRef.current = e;
    };

    return elemType === "button" && !href ? (
      <button
        ref={refHandler as ForwardedRef<HTMLButtonElement>}
        onClick={onClickHandler}
        type={type}
        disabled={disabled}
        className={classes}
        style={style}
        {...attributes}
      >
        {animatedBorder && animatedElement}
        {!IconRight && SvgIcon}
        {title}
        {children}
        {IconRight && SvgIcon}
      </button>
    ) : (
      <Link
        ref={refHandler as ForwardedRef<HTMLAnchorElement>}
        to={href || "/"}
        onClick={onClickHandler}
        target={target}
        className={classes}
        style={style}
        {...attributes}
      >
        {animatedBorder && animatedElement}
        {!IconRight && SvgIcon}
        {title}
        {children}
        {IconRight && SvgIcon}
      </Link>
    );
  }
);

export default ButtonStyled;
