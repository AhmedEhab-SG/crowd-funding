import { trim } from "../../../utils/functions/general";
import en from "../../../locales/en.json";
import SectionHeader from "../../shared/SectionHeader";

const { project, pledges, creative, title } = en.pages.home.hero.totlalBanner;

const elementsArr = [
  {
    number: "267,031",
    text: project,
  },
  {
    number: "$8,332,763,284",
    text: creative,
  },
  {
    number: "98,294,003",
    text: pledges,
  },
];

const TotalBanner = ({ className = "" }: { className?: string }) => {
  return (
    <div
      className={trim(`
        flex
        w-full
        flex-col
        ${className}`)}
    >
      <SectionHeader className="md:text-center" title={title} />
      <ul
        className={trim(`
          flex
          w-full
          items-center
          justify-between
          border-2
          text-center
          shadow-lg
          overflow-x-auto`)}
      >
        {elementsArr.map(({ text, number }, i) => (
          <li
            key={i}
            className={trim(`
              flex-1
              p-4
              ${
                i && i < elementsArr.length - 1
                  ? "border-l border-r"
                  : !i
                  ? "border-r"
                  : "border-l"
              }`)}
          >
            <h3
              className={trim(`
                text-responsive-xl
                text-primary
                font-medium`)}
            >
              {number}
            </h3>
            <h6
              className={trim(`
                text-responsive-2xs 
                text-gray-500`)}
            >
              {text}
            </h6>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default TotalBanner;
