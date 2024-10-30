import { trim } from "../../utils/functions/general";
import userLogo from "../../assets/imgs/user.jpg";
import noImage from "../../assets/imgs/no-image.png";
import ButtonStyled from "./ButtonStyled";
import { FaRegBookmark } from "react-icons/fa";
import { CiClock2 } from "react-icons/ci";
import { ForwardedRef, forwardRef, HTMLAttributes } from "react";

const ProjectCard = forwardRef(
  (
    {
      className = "",
      img,
      noAnimation,
      ...attributes
    }: {
      className?: string;
      img?: string;
      noAnimation?: boolean;
    } & HTMLAttributes<HTMLElement>,
    ref: ForwardedRef<HTMLDivElement>
  ) => {
    return (
      <div
        ref={ref}
        className={trim(`
          relative 
          w-full 
          max-w-72 
          justify-self-center
          ${noAnimation ? "" : "group"}
        ${className}`)}
        {...attributes}
      >
        <div
          className={trim(`
          flex
          flex-col 
          p-4
          box-border
          rounded-2xl
          border-2
          border-transparent
          transition-all
          duration-300
          ease-in-out
          bg-white
          md:group-hover:absolute
          md:group-hover:shadow-2xl
          md:group-hover:border-gray-200
          md:group-hover:z-10`)}
        >
          <img src={img || noImage} alt="no-image" className="rounded-xl" />

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
                text-responsive-xs
                font-medium
                text-bodyblack
                leading-[1.2]
                overflow-hidden
                overflow-ellipsis
                line-clamp-1`)}
              >
                Oasis Kinetic Sand Tables - Relaxing Art in Motion
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
                  <span
                    className={trim(`
                    overflow-hidden
                    overflow-ellipsis
                    line-clamp-1`)}
                  >
                    8 days left / 112% funded
                  </span>
                </div>
              </div>

              <div
                className={trim(`
                h-0
                flex
                flex-col 
                gap-2
                opacity-0
                transition-all
                duration-100
                ease-in-out
                bg-white
                w-full
                md:group-hover:h-fit
                md:group-hover:opacity-100`)}
              >
                <p
                  className={trim(`
                  text-bodyblack 
                  md:group-hover:block
                  hidden              
                  overflow-hidden
                  overflow-ellipsis
                  line-clamp-[8]`)}
                >
                  Haunted homes, psychedelics, and spirit cleansing are all in a
                  days work for a couple running a family real estate business
                  in Miami in this tropical horror comic series.
                </p>

                <div className="flex flex-col gap-2">
                  <ButtonStyled
                    title="Graphix"
                    border
                    size="sm"
                    className="rounded-2xl px-2 py-1 w-fit"
                  />
                  <ButtonStyled
                    title="Miami, FL"
                    border
                    className="rounded-2xl px-2 py-1 w-fit"
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
      </div>
    );
  }
);

export default ProjectCard;
