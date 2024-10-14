import InputStyled from "../shared/InputStyled";
import { GrSearch } from "react-icons/gr";
import en from "../../locales/en.json";
import useBreakpoints from "../../hooks/useBreakPoints";

const { search } = en.header;

const Search = ({ className = "" }: { className?: string }) => {
  const breakPoints = useBreakpoints();
  return (
    <InputStyled
      border
      contianerClassName={`max-w-2xl shadow-lg ${className}`}
      inputContainerClassName="bg-white"
      svgIcon={<GrSearch />}
      placeholder={breakPoints.size.sm ? search : search.substring(0, 7)}
      placeholderClassName="text-gray-400 text-nowrap"
      placeholderStyle="over"
      iconLeft
      tagSize="md"
    />
  );
};

export default Search;
