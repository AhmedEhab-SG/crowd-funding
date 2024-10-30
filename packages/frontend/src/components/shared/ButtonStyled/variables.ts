const varablesTwClasses = {
  font: "",
  text: "",
  hover: "",
  bg: "bg-primary",
  underlineColor: "text-red-500",
  border: "border border-[#C9C9C9]",
  rippleBg: "bg-primary",
  rippleDuration: undefined,
};

const formatClasses = (className?: string): string =>
  className ? className.replace(/\s+/g, " ").trim() : "";

export { formatClasses };
export default varablesTwClasses;

// file to customize the button component

// the obj should look like this

// const varablesTwClasses = {
//   font: "font-monospace",
//   text: "text-body-lightest",
//   hover: "hover:text-primary hover:bg-box group-hover:bg-box",
//   bg: "bg-paper",
//   border: "border border-primary",
//   rippleBg: "bg-primary",
//   rippleDuration: undefined,
// };
