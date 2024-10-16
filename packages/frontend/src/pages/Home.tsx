import Featured from "../components/sections/FeaturedRecommend";
import HomeHero from "../components/sections/HomeHero";
import PageContainer from "../components/shared/PageContainer";

export default function Home() {
  return (
    <PageContainer>
      <HomeHero />
      <Featured />
    </PageContainer>
  );
}
