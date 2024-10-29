import BannerSection from "../components/sections/BannerSection";
import ScrollableSection from "../components/sections/ScrollableSection";
import Featured from "../components/sections/FeaturedRecommend";
import HomeHero from "../components/sections/HomeHero";
import PageContainer from "../components/shared/PageContainer";
import ArticleSection from "../components/sections/ArticleSection";
import CornoerSection from "../components/sections/CornerSection";

export default function Home() {
  return (
    <PageContainer>
      <HomeHero />
      <Featured />
      <BannerSection />
      <ScrollableSection />
      <ArticleSection />
      <CornoerSection />
    </PageContainer>
  );
}
