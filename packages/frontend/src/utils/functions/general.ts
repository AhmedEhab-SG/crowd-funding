const pascalCase = (fullString: string): string =>
  fullString
    .toLowerCase()
    .split(" ")
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(" ");

const trim = (className: string): string =>
  className.replace(/\s+/g, " ").trim();

const isRouteFound = (
  pathname: string,
  {
    routes = [],
    dynamicRoutes = [],
    regExp = {
      pattern: `(?:/[^/?]+(?:\\?[^/]+)?)?$`,
    },
  }: {
    routes?: string[];
    dynamicRoutes?: string[];
    regExp?: { pattern?: RegExp | string; flags?: string };
  } = {}
) =>
  routes.some((route) => route === pathname) ||
  dynamicRoutes.some((route) =>
    new RegExp(`^${route}${regExp.pattern}`, regExp.flags).test(pathname)
  );

export { pascalCase, trim, isRouteFound };
