import useBreakpoints from "../../hooks/useBreakPoints";
import { trim } from "../../utils/functions/general";
import ButtonStyled from "../shared/ButtonStyled";
import en from "../../locales/en.json";
import { appRoutes } from "../../config";
import useSession from "../../hooks/useSession";
import noImgUser from "../../assets/imgs/user.jpg";
import ProfileOptions from "./ProfileOptions";
import { useState } from "react";

const { login, start } = en.header.nav;

const Nav = ({ className = "" }: { className?: string }) => {
  const breakpoint = useBreakpoints();
  const session = useSession();
  const [showProfileOptions, setShowProfileOptions] = useState(false);

  return (
    <nav
      className={trim(`
        flex
        items-center
        gap-6
        relative
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
        href={`${appRoutes.auth}?ref=login`}
        size="custom"
        className={`hover:text-primary ${session ? "hidden" : ""}`}
      />

      <ButtonStyled
        className={`${session ? "" : "hidden"} w-11  rounded-full p-0`}
        onClick={() => setShowProfileOptions((prev) => !prev)}
      >
        <img src={session?.avatar || noImgUser} alt="user-img" />
      </ButtonStyled>

      <ProfileOptions
        session={session}
        show={showProfileOptions}
        setShow={setShowProfileOptions}
      />
    </nav>
  );
};

export default Nav;
