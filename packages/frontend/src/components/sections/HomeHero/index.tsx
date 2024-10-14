import SectionContainer from "../../shared/SectionContainer";
import TotalBanner from "./TotalBanner";
import en from "../../../locales/en.json";

const { title } = en.pages.home.hero;

const HomeHero = ({ className = "" }: { className?: string }) => {
  return (
    <SectionContainer className={className}>
      <h1 className="mb-7 text-responsive-xl md:text-center">{title}</h1>
      <TotalBanner />
    </SectionContainer>
  );
};

export default HomeHero;
