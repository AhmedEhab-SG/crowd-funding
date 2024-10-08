import { trim } from "../../lib/functions/general";
import { HTMLAttributes, ReactNode } from "react";

const Layout = ({
  children,
  className = "",
  ...attributes
}: Readonly<{
  children: ReactNode;
  className?: string;
}> &
  HTMLAttributes<HTMLElement>) => (
  <div
    id="layout"
    className={trim(`
      grid
      grid-cols-1
      min-h-screen
      min-w-screen
      overflow-x-hidden
      ${className}`)}
    {...attributes}
  >
    {children}
  </div>
);

export default Layout;