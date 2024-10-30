import noIamge from "../../../assets/imgs/no-image.png";
import { trim } from "../../../utils/functions/general";
import ButtonStyled from "../../shared/ButtonStyled";

const Card = ({ className = "" }: { className?: string }) => {
  return (
    <div
      className={trim(`
        flex
        gap-3
        md:gap-5
        md:border-2
        p-5
        ${className}`)}
    >
      <img
        src={noIamge}
        alt="no-image"
        className="block w-full h-full max-w-24 md:max-w-36 object-cover"
      />
      <div className="flex flex-col gap-2 md:gap-5 text-bodyblack group">
        <h3 className="text-responsive-2md group-hover:underline">
          Kickstarter Creator Resources
        </h3>

        <p className="text-responsive-xs">
          Our definitive roundup of everything from planning shipping to
          communicating with backers.
        </p>

        <ButtonStyled
          title="Read More"
          size="xs"
          className="p-0 w-fit text-blue-700"
        />
      </div>
    </div>
  );
};

export default Card;
