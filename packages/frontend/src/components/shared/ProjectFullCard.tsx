import { trim } from "../../utils/functions/general";
import { FaRegBookmark, FaBookmark } from "react-icons/fa";
import userLogo from "../../assets/imgs/user.jpg";
import noImage from "../../assets/imgs/no-image.png";
import { CiClock2 } from "react-icons/ci";
import ButtonStyled from "./ButtonStyled";

const ProjectFullCard = ({ img }: { img?: string }) => {
  return (
    <div className="flex flex-col gap-2">
      <img
        className={trim(`
          block 
          w-full
          rounded-b-2xl
          border-2`)}
        src={img || noImage}
        alt="no-image"
      />

      <div className="flex gap-2 mt-2 p-1">
        <img
          className={trim(`
            rounded-full 
            w-10 
            h-10`)}
          src={img || userLogo}
          alt="user"
        />

        <div>
          <h3
            className={trim(`
              text-responsive-2md 
              font-medium
              text-bodyblack
              leading-[1.2]`)}
          >
            RED LIGHT PROPERTIES returns with UNFINSIHED BUSNIESS
          </h3>

          <div
            className={trim(`
              flex flex-col
              text-gray-600 
              text-responsive-2xs
              mb-4`)}
          >
            <span>Dan Goldman</span>

            <div
              className={trim(`
                flex 
                items-center 
                gap-2 
                font-medium`)}
            >
              <CiClock2 className="text-responsive-sm stroke-1" />
              <span> 8 days left / 112% funded </span>
            </div>
          </div>

          <div className="flex flex-col gap-2">
            <p
              className={trim(`
                text-bodyblack                 
                overflow-hidden
                overflow-ellipsis
                line-clamp-4`)}
            >
              Haunted homes, psychedelics, and spirit cleansing are all in a
              days work for a couple running a family real estate business in
              Miami in this tropical horror comic series.
            </p>

            <div className="flex items-center gap-2">
              <ButtonStyled
                title="Graphix"
                border
                size="sm"
                className="rounded-2xl px-2 py-1"
              />
              <ButtonStyled
                title="Miami, FL"
                border
                className="rounded-2xl px-2 py-1"
                size="sm"
              />
            </div>
          </div>
        </div>

        <ButtonStyled
          className="mt-1 w-fit h-fit"
          size="custom"
          SvgIcon={<FaRegBookmark className="text-gray-500" />}
        />
      </div>
    </div>
  );
};

export default ProjectFullCard;
