import noIamge from "../../../assets/imgs/no-image.png";
import ButtonStyled from "../../shared/ButtonStyled";

const Card = () => {
  return (
    <div className="flex gap-5 border-2 p-5">
      <img
        src={noIamge}
        alt="no-image"
        className="block w-full h-full max-w-36 object-cover"
      />
      <div className="flex flex-col gap-5 text-bodyblack group">
        <h3 className="text-responsive-md group-hover:underline">
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
