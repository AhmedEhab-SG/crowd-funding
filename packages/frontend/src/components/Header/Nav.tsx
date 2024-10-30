import useBreakpoints from "../../hooks/useBreakPoints";
import { trim } from "../../utils/functions/general";
import ButtonStyled from "../shared/ButtonStyled";
import en from "../../locales/en.json";
import { routes } from "../../config";

const { login, start } = en.header.nav;

const Nav = ({ className = "" }: { className?: string }) => {
  const breakpoint = useBreakpoints();

  return (
    <nav
      className={trim(`
        flex
        items-center
        gap-6
        ${className}`)}
    >
      <ButtonStyled
        title={`${breakpoint.size.md ? start : start.substring(0, 5)}`}
        ripple
        className="hover:border-black font-medium text-nowrap"
        border
      />
      <ButtonStyled
        title={login}
        href={`${routes.auth}?ref=login`}
        size="custom"
        className="hover:text-primary"
      />
    </nav>
  );
};

export default Nav;
