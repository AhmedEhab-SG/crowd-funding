import { trim } from "../../utils/functions/general";
import { HTMLAttributes, ReactNode, useEffect, useState } from "react";

const PageContainer = ({
  children,
  className = "",
  ...attributes
}: Readonly<{
  children: ReactNode;
  className?: string;
}> &
  HTMLAttributes<HTMLElement>) => {
  const [heights, setHeights] = useState({ headerHeight: 0, footerHeight: 0 });

  useEffect(() => {
    const header = document.querySelector("header");
    const footer = document.querySelector("footer");
    setHeights(() => ({
      headerHeight: header?.clientHeight || 0,
      footerHeight: footer?.clientHeight || 0,
    }));
  }, []);

  return (
    <main
      className={trim(`
        flex
        flex-col
        w-full
        ${className}`)}
      style={{
        minHeight: `calc(100vh - ${
          heights.headerHeight + heights.footerHeight
        }px)`,
      }}
      {...attributes}
    >
      {children}
    </main>
  );
};

export default PageContainer;
