import SectionContainer from "../../shared/SectionContainer";
import SectionHeader from "../../shared/SectionHeader";
import en from "../../../locales/en.json";
import { trim } from "../../../utils/functions/general";
import ProjectFullCard from "../../shared/ProjectFullCard";
import ProjectCard from "../../shared/ProjectCard";
import imgOne from "../../../assets/imgs/testProjectOne.jpg";
import imgTwo from "../../../assets/imgs/testProjectTwo.jpg";
import imgThree from "../../../assets/imgs/testProjectThree.jpg";
import imgFour from "../../../assets/imgs/testProjectFour.jpg";
import imgFive from "../../../assets/imgs/testProjectFive.jpg";

const { featured, recommended } = en.pages.home.featuredRecommend;

const Featured = ({ className = "" }: { className?: string }) => {
  return (
    <SectionContainer
      className={trim(`
        md:flex-row
        gap-4
        ${className}`)}
    >
      <div className="flex-1">
        <SectionHeader title={featured} />
        <ProjectFullCard img={imgOne} />
      </div>
      <div className="flex-1">
        <SectionHeader title={recommended} />
        <ul
          className={trim(`
            grid
            grid-cols-1
            gap-4
            lg:grid-cols-2`)}
        >
          <li>
            <ProjectCard img={imgTwo} />
          </li>
          <li>
            <ProjectCard img={imgThree} />
          </li>
          <li>
            <ProjectCard img={imgFour} />
          </li>
          <li>
            <ProjectCard img={imgFive} />
          </li>
        </ul>

        <div className="float-right">hi</div>
      </div>
    </SectionContainer>
  );
};

export default Featured;
