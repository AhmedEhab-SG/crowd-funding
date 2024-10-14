import logoFull from "../../assets/svgs/logo-full.svg";
import logo from "../../assets/svgs/logo.svg";
import useBreakpoints from "../../hooks/useBreakPoints";
import { trim } from "../../utils/functions/general";

const Logo = ({ className = "" }: { className?: string }) => {
  const breakpoints = useBreakpoints();
  return (
    <img
      className={trim(`
        w-full
        ${breakpoints.size.md ? "max-w-60" : "max-w-12"}
        ${className}`)}
      loading="lazy"
      src={breakpoints.size.md ? logoFull : logo}
      alt="logo"
    />
  );
};

export default Logo;
