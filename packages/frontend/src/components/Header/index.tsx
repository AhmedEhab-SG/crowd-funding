import { Fragment } from "react/jsx-runtime";
import { trim } from "../../utils/functions/general";
import Categories from "./Categories";
import Logo from "./Logo";
import Nav from "./Nav";
import Search from "./Search";

const Header = ({ removeNav }: { removeNav?: boolean }) => {
  return (
    <header
      className={trim(`
        flex
        flex-col  
        items-center
        px-4`)}
    >
      <div
        className={trim(`
          flex
          items-center
          py-6
          w-full
          justify-between
          px-6
          md:px-10
          gap-6
          xl:gap-0
          lg:justify-evenly`)}
      >
        <Logo />
        {!removeNav && (
          <Fragment>
            <Search className="lg:flex hidden" />
            <Nav />
          </Fragment>
        )}
      </div>
      {!removeNav && (
        <Fragment>
          <Search className="lg:hidden flex mb-4" />
          <Categories className="mb-4" />
        </Fragment>
      )}
      <hr className="w-full border-b border-[##E0E0E0]" />
    </header>
  );
};

export default Header;
