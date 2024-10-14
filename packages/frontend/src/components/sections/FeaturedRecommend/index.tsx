import SectionContainer from "../../shared/SectionContainer";
import SectionHeader from "../../shared/SectionHeader";
import en from "../../../locales/en.json";
import { trim } from "../../../utils/functions/general";

const { featured, recommended } = en.pages.home.featuredRecommend;

const Featured = ({ className = "" }: { className?: string }) => {
  return (
    <SectionContainer
      className={trim(`
        md:flex-row
        ${className}`)}
    >
      <div className="flex-1">
        <SectionHeader title={featured} />
        
      </div>
      <div className="flex-1">
        <SectionHeader title={recommended} />
      </div>
    </SectionContainer>
  );
};

export default Featured;
