import { trim } from "../../../utils/functions/general";
import ButtonStyled from "../../shared/ButtonStyled";
import ContainerSpliter from "../../shared/ContainerSpliter";
import SectionContainer from "../../shared/SectionContainer";
import SectionHeader from "../../shared/SectionHeader";
import { FaAngleLeft, FaAngleRight } from "react-icons/fa6";
import SliderContainer from "../../shared/SliderStyled/SliderContainer";
import Slide from "../../shared/SliderStyled/Slide";
import ProjectCard from "../../shared/ProjectCard";
import { useRef } from "react";

const projects = [{}, {}, {}, {}, {}, {}];

const ScrollableSection = () => {
  const sliderRef = useRef<HTMLDivElement | null>(null);

  const moveSliderLeft = () => {
    if (sliderRef.current) {
      sliderRef.current.scrollBy({
        left: -500,
        behavior: "smooth",
      });
    }
  };

  const moveSliderRight = () => {
    if (sliderRef.current) {
      sliderRef.current.scrollBy({
        left: 500,
        behavior: "smooth",
      });
    }
  };

  return (
    <ContainerSpliter>
      <SectionContainer className="relative">
        <div className="flex justify-between mb-5">
          <div className="flex gap-4 items-center">
            <SectionHeader title="Fresh Favorites" className="!mb-0" />
            <ButtonStyled
              title="Discover more"
              size="sm"
              className={trim(`
              p-0
              text-blue-700
              hover:underline`)}
              SvgIcon={<FaAngleRight />}
              IconRight
            />
          </div>

          <div className="flex gap-4 items-center">
            <ButtonStyled
              size="sm"
              className={trim(`
                p-0.5
                text-blue-700
                rounded-full 
                border-2 
                border-transparent
                hover:border-blue-700`)}
              SvgIcon={<FaAngleLeft />}
              onClick={moveSliderLeft}
            />
            <ButtonStyled
              size="sm"
              className={trim(`
                p-0.5
                text-blue-700
                rounded-full
                border-2
                border-transparent
                hover:border-blue-700`)}
              SvgIcon={<FaAngleRight />}
              onClick={moveSliderRight}
            />
          </div>
        </div>

        <SliderContainer ref={sliderRef}>
          {projects.map((_project, i) => (
            <Slide key={i}>
              <ProjectCard noAnimation />
            </Slide>
          ))}
        </SliderContainer>
      </SectionContainer>
    </ContainerSpliter>
  );
};

export default ScrollableSection;
