import { HTMLAttributes, ReactNode, RefObject } from "react";

const ContainerSpliter = ({
  children,
  className = "",
  targetRef,
  ...attributes
}: Readonly<{
  children: ReactNode;
  targetRef?: RefObject<HTMLElement>;
  className?: string;
}> &
  HTMLAttributes<HTMLElement>) => {
  return (
    <div className="pt-20 border-t-2" {...attributes}>
      {children}
    </div>
  );
};

export default ContainerSpliter;
