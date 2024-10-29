import SectionContainer from "../../shared/SectionContainer";
import ContainerSpliter from "../../shared/ContainerSpliter";
import SectionHeader from "../../shared/SectionHeader";
import noImage from "../../../assets/imgs/no-image.png";
import ButtonStyled from "../../shared/ButtonStyled";

const articles = [{}, {}, {}, {}];

const ArticleSection = () => {
  return (
    <ContainerSpliter>
      <SectionContainer>
        <SectionHeader title="Creator Tips" />
        <article className="flex flex-wrap justify-center xl:justify-between items-center gap-4 lg:gap-7">
          {articles.map((article, index) => (
            <div
              key={index}
              className="flex flex-col justify-start group  gap-5 max-w-64"
            >
              <img
                className="block w-full object-cover min-h-48 h-full"
                src={noImage}
                about="creator-img"
              />

              <h3 className="text-responsive-2md group-hover:text-primary group-hover:underline">
                Introducing the Pre-Launch Editor
              </h3>

              <ButtonStyled
                title="Read More"
                className="p-0 w-fit text-gray-500 hover:underline"
                size="xs"
              />
            </div>
          ))}
        </article>
      </SectionContainer>
    </ContainerSpliter>
  );
};

export default ArticleSection;
