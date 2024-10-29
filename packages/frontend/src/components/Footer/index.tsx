import { trim } from "../../utils/functions/general";
import ButtonStyled from "../shared/ButtonStyled";
import logo from "../../assets/svgs/logo.svg";
import { FaGithub } from "react-icons/fa";
import en from "../../locales/en.json";

const { nav, webInfo, tos, copyRight, intrested } = en.footer;

const navArr = Array.from(Object.values(nav), (name) => ({ name, link: "/" }));

const webInfoArr = Array.from(Object.values(webInfo), ({ title, info }) => ({
  title,
  links: Array.from(Object.values(info), (name) => ({ name, link: "/" })),
}));

const tosArr = Array.from(Object.values(tos), (name) => ({ name, link: "/" }));

const footerStaticClasses = `flex gap-5 py-7 2xl:px-[18%] xl:px-[8%] lg:container containerPadding`;

const Footer = () => {
  return (
    <footer
      className={trim(`
        flex
        w-full
        flex-col
        box-border`)}
    >
      <ul
        className={trim(`
          ${footerStaticClasses}
          border-t-[1px]
          flex-wrap
          !gap-3
          md:gap-5
          border-gray-800`)}
      >
        {navArr.map(({ name }, i) => (
          <li key={i}>
            <ButtonStyled
              size="sm"
              className="p-0 hover:text-primary hover:underline"
              title={name}
            />
          </li>
        ))}
      </ul>

      <div
        className={trim(`
          ${footerStaticClasses}
          border-t-2
          border-gray-300
          justify-around
          text-responsive-3xs`)}
      >
        {webInfoArr.map(({ title, links }, i) => (
          <div key={i} className="flex flex-col gap-3">
            <h6 className="font-medium mb-0.5">{title.toUpperCase()}</h6>
            <ul className="flex flex-col gap-1">
              {links.map(({ name }, i) => (
                <li key={i}>
                  <ButtonStyled
                    size="sm"
                    className="p-0 !text-start hover:text-primary hover:underline"
                    title={name}
                  />
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>

      <div
        className={trim(`
          ${footerStaticClasses}
          justify-between
          text-responsive-2xs`)}
      >
        <div
          className={trim(`
            flex 
            gap-3 
            items-center 
            text-bodyblack`)}
        >
          <img src={logo} alt="logo" className="w-5" />
          <span>
            {copyRight} {new Date().getFullYear()}
          </span>
        </div>

        <ButtonStyled
          title={intrested}
          size="lg"
          className="p-0 text-responsive-2xs hover:text-primary hover:underline"
          SvgIcon={<FaGithub />}
          IconRight
        />
      </div>

      <ul
        className={trim(`
          ${footerStaticClasses}
          border-t-[1px]
          flex-wrap
          !gap-2
          md:gap-5
          border-gray-300
          mt-5`)}
      >
        {tosArr.map(({ name }, i) => (
          <li key={i}>
            <ButtonStyled
              size="sm"
              className="p-0 hover:text-primary hover:underline"
              title={name}
            />
          </li>
        ))}
      </ul>
    </footer>
  );
};

export default Footer;
