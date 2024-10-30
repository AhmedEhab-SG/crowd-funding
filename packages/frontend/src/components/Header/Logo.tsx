import { useNavigate } from "react-router-dom";
import logoFull from "../../assets/svgs/logo-full.svg";
import logo from "../../assets/svgs/logo.svg";
import useBreakpoints from "../../hooks/useBreakPoints";
import { trim } from "../../utils/functions/general";
import { routes } from "../../config";

const Logo = ({ className = "" }: { className?: string }) => {
  const breakpoints = useBreakpoints();
  const push = useNavigate();

  return (
    <img
      className={trim(`
        w-full
        cursor-pointer
        ${breakpoints.size.md ? "max-w-60" : "max-w-12"}
        ${className}`)}
      loading="lazy"
      onClick={() => push(routes.home)}
      src={breakpoints.size.md ? logoFull : logo}
      alt="logo"
    />
  );
};

export default Logo;
