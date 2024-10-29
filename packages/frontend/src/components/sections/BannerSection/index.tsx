import SectionContainer from "../../shared/SectionContainer";
import yellowFollwers from "../../../assets/imgs/yellow-flowers.jpg";
import ButtonStyled from "../../shared/ButtonStyled";
import { trim } from "../../../utils/functions/general";
import en from "../../../locales/en.json";
import ContainerSpliter from "../../shared/ContainerSpliter";

const { title, description, more } = en.pages.home.blog;

const BannerSection = () => {
  return (
    <ContainerSpliter>
      <SectionContainer className="md:!flex-row gap-4 group cursor-pointer">
        <img className="block h-60 object-cover flex-1" src={yellowFollwers} />

        <div className="flex-1 flex flex-col gap-4">
          <div className="flex gap-4">
            <hr className="w-4 bg-primary h-full" />

            <div className="flex flex-col gap-4">
              <h1
                className={trim(`
                  text-responsive-lg
                  group-hover:text-primary
                  group-hover:underline`)}
              >
                {title}
              </h1>
              <p
                className={trim(`
                  text-responsive-2sm 
                  text-bodyblack 
                  leading-6`)}
              >
                {description}
              </p>
            </div>
          </div>

          <ButtonStyled
            className="w-fit p-0 text-blue-700 hover:underline"
            size="sm"
            title={more}
          />
        </div>
      </SectionContainer>
    </ContainerSpliter>
  );
};

export default BannerSection;
