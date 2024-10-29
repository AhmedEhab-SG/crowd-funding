import { cloneElement } from "react";
import variables from "../variables";
import styles from "../input-styles.module.css";

const formatClasses = (className: string): string =>
  className.replace(/\s+/g, " ").trim();

const addAttributesToReactNode = (
  element: JSX.Element,
  attributes?: React.HTMLAttributes<HTMLOrSVGElement>
) => cloneElement(element, attributes);

const getClasses = (
  target:
    | "label"
    | "tag"
    | "input"
    | "textarea"
    | "placeholder"
    | "error"
    | "svgIcon",
  {
    elemType,
    tagSize,
    border,
    error,
    transparent,
    iconLeft,
    svgIcon,
    placeholderStyle,
  }: {
    elemType?: string;
    tagSize?: "xs" | "sm" | "md" | "lg" | "xl" | "custom";
    border?: boolean;
    error?: string;
    transparent?: boolean;
    iconLeft?: boolean;
    placeholderStyle?: "inside" | "over";
    svgIcon?: JSX.Element;
  } = {}
) => {
  const classes = {
    label: `${styles.label}
            ${tagSize === "xs" ? styles["text-sm"] : ""}
            ${tagSize === "sm" ? styles["text-md"] : ""}
            ${tagSize === "md" ? styles["text-lg"] : ""}
            ${tagSize === "lg" ? styles["text-xl"] : ""}
            ${tagSize === "xl" ? styles["text-2xl"] : ""}
            ${error ? styles["color-rose"] : variables.labelTextColor}`,

    tag: `${styles.tag}
          ${variables.textColor}
          ${transparent ? styles["bg-transparent"] : variables.bgColor}
          ${
            tagSize === "xs"
              ? `
              ${styles["p-1.5"]} 
              ${styles["pt-2"]} 
              ${styles["text-xs"]}`
              : ""
          }
          ${
            tagSize === "sm"
              ? `
              ${styles["p-2"]} 
              ${styles["pt-3"]} 
              ${styles["text-sm"]}`
              : ""
          }
          ${
            tagSize === "md"
              ? `
              ${styles["p-3"]} 
              ${styles["pt-4"]} 
              ${styles["text-md"]}`
              : ""
          }
          ${
            tagSize === "lg"
              ? `
              ${styles["p-4"]} 
              ${styles["pt-5"]} 
              ${styles["text-lg"]}`
              : ""
          }
          ${
            tagSize === "xl"
              ? `
              ${styles["p-5"]} 
              ${styles["pt-6"]} 
              ${styles["text-xl"]}`
              : ""
          }
          ${
            svgIcon && tagSize === "xs"
              ? iconLeft
                ? styles["pl-10"]
                : styles["pr-10"]
              : ""
          }
          ${
            svgIcon && tagSize === "sm"
              ? iconLeft
                ? styles["pl-10"]
                : styles["pr-10"]
              : ""
          }
          ${
            svgIcon && tagSize === "md"
              ? iconLeft
                ? styles["pl-12"]
                : styles["pr-12"]
              : ""
          }
          ${
            svgIcon && tagSize === "lg"
              ? iconLeft
                ? styles["pl-14"]
                : styles["pr-14"]
              : ""
          }
          ${
            svgIcon && tagSize === "xl"
              ? iconLeft
                ? styles["pl-14"]
                : styles["pr-14"]
              : ""
          }
          ${
            error ? styles.errorTag : `${border ? variables.borderColors : ""}`
          }`,

    input: `
          ${
            tagSize === "xs"
              ? `
              ${styles["p-1.5"]} 
              ${styles["pt-2"]} 
              ${styles["text-xs"]}`
              : ""
          }
          ${
            tagSize === "sm"
              ? `
              ${styles["p-2"]} 
              ${styles["pt-3"]} 
              ${styles["text-sm"]}`
              : ""
          }
          ${
            tagSize === "md"
              ? `
              ${styles["p-3"]} 
              ${styles["pt-4"]} 
              ${styles["text-md"]}`
              : ""
          }
          ${
            tagSize === "lg"
              ? `
              ${styles["p-4"]} 
              ${styles["pt-5"]} 
              ${styles["text-lg"]}`
              : ""
          }
          ${
            tagSize === "xl"
              ? `
              ${styles["p-5"]} 
              ${styles["pt-6"]} 
              ${styles["text-xl"]}`
              : ""
          }`,

    textarea: `
              ${
                tagSize === "xs"
                  ? `
              ${styles["p-1.5"]} 
              ${styles["pt-2"]} 
              ${styles["text-xs"]} 
              ${styles["h-20"]}`
                  : ""
              }
              ${
                tagSize === "sm"
                  ? `
              ${styles["p-2"]} 
              ${styles["pt-4"]} 
              ${styles["text-sm"]} 
              ${styles["h-28"]}`
                  : ""
              }
              ${
                tagSize === "md"
                  ? `
              ${styles["p-3"]} 
              ${styles["pt-5"]} 
              ${styles["text-md"]} 
              ${styles["h-36"]}`
                  : ""
              }
              ${
                tagSize === "lg"
                  ? `
              ${styles["p-4"]} 
              ${styles["pt-6"]} 
              ${styles["text-lg"]} 
              ${styles["h-44"]}`
                  : ""
              }
              ${
                tagSize === "xl"
                  ? `
              ${styles["p-5"]} 
              ${styles["pt-7"]} 
              ${styles["text-xl"]} 
              ${styles["h-52"]}`
                  : ""
              }`,

    svgIcon: `${styles.svgIcon}
              ${iconLeft ? styles["left-3"] : styles["right-3"]}
              ${tagSize === "xs" ? styles["text-lg"] : ""}
              ${tagSize === "sm" ? styles["text-xl"] : ""}
              ${tagSize === "md" ? styles["text-2xl"] : ""}
              ${tagSize === "lg" ? styles["text-3xl"] : ""}
              ${tagSize === "xl" ? styles["text-4xl"] : ""}
              ${error ? styles["color-rose"] : ""}`,

    placeholder: `${styles.placeholder}
                  ${placeholderStyle === "over" ? styles["overStyle"] : ""}
                  ${placeholderStyle === "inside" ? styles["insideStyle"] : ""}
                  ${!placeholderStyle ? styles["hideholder"] : ""}
                  ${
                    elemType === "input"
                      ? styles.placeholderInput
                      : styles.placeholderTextarea
                  }
                  ${tagSize === "xs" ? styles["text-xs"] : ""}
                  ${tagSize === "sm" ? styles["text-sm"] : ""}
                  ${tagSize === "md" ? styles["text-md"] : ""}
                  ${tagSize === "lg" ? styles["text-lg"] : ""}
                  ${tagSize === "xl" ? styles["text-xl"] : ""}
                  ${
                    tagSize === "xs" && svgIcon
                      ? iconLeft
                        ? styles["pl-8"]
                        : styles["pr-8"]
                      : styles["left-3"]
                  }
                  ${
                    tagSize === "sm" && svgIcon
                      ? iconLeft
                        ? styles["pl-8"]
                        : styles["pr-8"]
                      : styles["left-3"]
                  }
                  ${
                    tagSize === "md" && svgIcon
                      ? iconLeft
                        ? styles["pl-10"]
                        : styles["pr-10"]
                      : styles["left-3"]
                  }
                  ${
                    tagSize === "lg" && svgIcon
                      ? iconLeft
                        ? styles["pl-12"]
                        : styles["pr-12"]
                      : styles["left-3"]
                  }
                  ${
                    tagSize === "xl" && svgIcon
                      ? iconLeft
                        ? styles["pl-12"]
                        : styles["pr-12"]
                      : styles["left-3"]
                  }
                  ${error ? styles["color-rose"] : variables.placeholderColor}`,

    error: `${styles.error}
            ${tagSize === "xs" ? styles["text-xs"] : ""}
            ${tagSize === "sm" ? styles["text-sm"] : ""}
            ${tagSize === "md" ? styles["text-md"] : ""}
            ${tagSize === "lg" ? styles["text-lg"] : ""}
            ${tagSize === "xl" ? styles["text-xl"] : ""}`,
  };

  return classes[target];
};
export { formatClasses, addAttributesToReactNode };
export default getClasses;
