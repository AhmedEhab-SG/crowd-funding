import { trim } from "../../utils/functions/general";

const SectionHeader = ({
  title,
  className = "",
  ...attributes
}: {
  title: string;
  className?: string;
}) => {
  return (
    <h4
      className={trim(`
        mb-5
        font-medium
        text-gray-500
        text-responsive-2xs
        ${className}`)}
      {...attributes}
    >
      {title.toUpperCase()}
    </h4>
  );
};

export default SectionHeader;
