import { Dispatch, SetStateAction } from "react";
import useOutsideClick from "../../hooks/useOutsideClick";
import { Session } from "../../types/user";
import { trim } from "../../utils/functions/general";
import ButtonStyled from "../shared/ButtonStyled";
import en from "../../locales/en.json";
import { FiPlus } from "react-icons/fi";
import { IoClose } from "react-icons/io5";
import noProjectImg from "../../assets/imgs/no-project-img.jpg";
import { useNavigate } from "react-router-dom";
import useStorage from "../../hooks/useLocalStorage";
import { revokeRefreshToken } from "../../api/routes/auth";
import { appRoutes } from "../../config";

const { account, logout, projects } = en.header.nav.profileSettings;
const {
  title: accTitle,
  recommended,
  following,
  profile,
  savedProjects,
  settings,
} = account;

const { newProject, title: proTitle, defaultCardTitle } = projects;

const ProjectCard = ({
  img = noProjectImg,
  title = defaultCardTitle,
  link = "/",
}: {
  img?: string;
  title?: string;
  link?: string;
}) => {
  const push = useNavigate();
  const onClickHandler = () => push(link);

  return (
    <div className="flex items-center sm:w-60 gap-3">
      <img
        src={img}
        alt="project-img"
        className="w-full h-full max-w-14 cursor-pointer"
        onClick={onClickHandler}
      />
      <h3
        className={trim(`
          text-responsive-2xs 
          overflow-hidden 
          overflow-ellipsis 
          hover:text-primary 
          hover:underline 
          cursor-pointer`)}
        onClick={onClickHandler}
      >
        {title}
      </h3>
    </div>
  );
};

const ProfileOptions = ({
  show,
  setShow,
  session,
  className = "",
}: {
  show: boolean;
  setShow: Dispatch<SetStateAction<boolean>>;
  session: Session | null;
  className?: string;
}) => {
  const ref = useOutsideClick(() => show && setShow(false));
  const { removeItem } = useStorage("session");
  const push = useNavigate();

  const logoutHandler = async () => {
    try {
      await revokeRefreshToken();
      removeItem();
      window.location.reload();
      push(appRoutes.home);
    } catch (err) {}
  };

  return (
    <div
      ref={ref}
      className={trim(`
        ${show ? "flex" : "hidden"}
        fixed
        sm:absolute
        flex-col
        gap-4
        bg-white
        sm:justify-between
        w-full
        h-full
        sm:min-h-96
        pt-10
        pb-8
        px-10
        top-0
        right-0
        sm:top-16
        sm:right-5
        sm:w-auto
        sm:h-auto
        border
        z-10
        border-black
        ${className}`)}
    >
      <div className="flex flex-col md:flex-row gap-16">
        <div className="flex flex-col gap-2 sm:gap-7">
          <div className="flex justify-between items-center">
            <h3
              className={trim(`
                text-responsive-2xs 
                sm:text-responsive-3xs 
                font-medium 
                uppercase 
                text-nowrap`)}
            >
              {accTitle}
            </h3>
            <ButtonStyled
              size="custom"
              SvgIcon={<IoClose size={22} />}
              onClick={() => setShow(false)}
              className="text-primary sm:hidden"
            />
          </div>
          <hr className="border-black sm:hidden" />
          <ul
            className={trim(`
              flex 
              flex-col 
              text-bodyblack 
              text-responsive-2sm 
              sm:text-responsive-2xs 
              text-nowrap 
              gap-3 
              sm:gap-0.5`)}
          >
            <li>
              <ButtonStyled
                title={savedProjects}
                className="hover:text-primary hover:underline"
                size="custom"
              />
            </li>
            <li>
              <ButtonStyled
                className="hover:text-primary hover:underline"
                title={recommended}
                size="custom"
              />
            </li>
            <li>
              <ButtonStyled
                className="hover:text-primary hover:underline"
                title={following}
                size="custom"
              />
            </li>
          </ul>

          <ul
            className={trim(`
              flex 
              flex-col 
              text-bodyblack 
              text-responsive-2sm 
              sm:text-responsive-2xs 
              text-nowrap 
              gap-3 
              sm:gap-0.5`)}
          >
            <li>
              <ButtonStyled
                className="hover:text-primary hover:underline"
                title={profile}
                size="custom"
              />
            </li>
            <li>
              <ButtonStyled
                className="hover:text-primary hover:underline"
                title={settings}
                size="custom"
              />
            </li>
          </ul>
        </div>

        <div className="flex flex-col gap-7">
          <h3
            className={trim(`
              text-responsive-2xs 
              sm:text-responsive-3xs 
              font-medium 
              uppercase 
              text-nowrap`)}
          >
            {proTitle}
          </h3>
          <ul
            className={trim(`
              flex 
              flex-col 
              text-bodyblack 
              text-responsive-2sm 
              sm:text-responsive-2xs 
              text-nowrap 
              gap-3 
              sm:gap-0.5`)}
          >
            <ProjectCard />
          </ul>

          <hr className="border-black" />

          <ButtonStyled
            title={newProject}
            size="custom"
            className={trim(`
              text-bodyblack 
              justify-start 
              hover:text-white 
              hover:bg-blue-700
              -mt-3 
              py-1 
              px-2`)}
            SvgIcon={
              <FiPlus
                className="text-blue-700 group-hover:text-white"
                size={20}
              />
            }
          />
        </div>
      </div>

      <div className="flex flex-col gap-5 mt-10 sm:mt-0">
        <hr className="border-gray-300" />
        <ButtonStyled
          title={logout}
          size="custom"
          className="self-start text-bodyblack hover:text-primary hover:underline"
          onClick={logoutHandler}
        />
      </div>
    </div>
  );
};

export default ProfileOptions;
