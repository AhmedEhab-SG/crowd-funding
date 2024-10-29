import ContainerSpliter from "../../shared/ContainerSpliter";
import SectionContainer from "../../shared/SectionContainer";
import SectionHeader from "../../shared/SectionHeader";
import Card from "./Card";

const CornoerSection = () => {
  return (
    <ContainerSpliter>
      <SectionContainer>
        <SectionHeader title="Creator's Corner" />
        <div className="grid gap-10 lg:grid-cols-2">
          <Card />
          <Card />
          <Card />
          <Card />
        </div>
      </SectionContainer>
    </ContainerSpliter>
  );
};

export default CornoerSection;
