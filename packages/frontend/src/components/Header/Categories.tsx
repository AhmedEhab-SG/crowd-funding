import { CategoriesEnum } from "../../utils/constants";
import { trim } from "../../utils/functions/general";
import ButtonStyled from "../shared/ButtonStyled";

const Categories = ({ className = "" }: { className?: string }) => {
  return (
    <div
      className={trim(`
        flex
        overflow-x-auto
        w-full
        items-center
        gap-2
        max-w-screen-lg
        justify-evenly
        ${className}`)}
    >
      {Object.values(CategoriesEnum).map((category) => (
        <ButtonStyled
          key={category}
          title={category}
          size="custom"
          className="font-semibold"
          animatedUnderline
        />
      ))}
    </div>
  );
};

export default Categories;
