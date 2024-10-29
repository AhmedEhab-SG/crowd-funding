import { trim } from "../../utils/functions/general";
import { HTMLAttributes, ReactNode, RefObject } from "react";

const SectionContainer = ({
  children,
  className = "",
  targetRef,
  ...attributes
}: Readonly<{
  children: ReactNode;
  targetRef?: RefObject<HTMLElement>;
  className?: string;
}> &
  HTMLAttributes<HTMLElement>) => (
  <section
    ref={targetRef}
    className={trim(` 
      flex
      w-full
      flex-col
      box-border
      2xl:w-[70%]
      xl:w-[90%]
      lg:container
      containerPadding
      mb-16
      ${className}`)}
    {...attributes}
  >
    {children}
  </section>
);

export default SectionContainer;
