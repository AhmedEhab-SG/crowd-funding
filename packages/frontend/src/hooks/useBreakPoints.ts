import { useEffect, useState } from "react";

interface IBreakpoints {
  xs?: number;
  sm?: number;
  md?: number;
  lg?: number;
  xl?: number;
}

const useBreakpoints = (config?: IBreakpoints) => {
  const [breakpoints, setBreakpoints] = useState<{
    actual: "xs" | "sm" | "md" | "lg" | "xl" | null;
    size: { xs: boolean; sm: boolean; md: boolean; lg: boolean; xl: boolean };
  }>(() => ({
    actual: null,
    size: { xs: false, sm: false, md: false, lg: false, xl: false },
  }));

  const { xs = 320, sm = 640, md = 768, lg = 1024, xl = 1280 } = config || {};

  const updateBreakpoint = () => {
    const width = window.innerWidth;

    setBreakpoints(() => ({
      actual:
        width >= xl
          ? "xl"
          : width >= lg
          ? "lg"
          : width >= md
          ? "md"
          : width >= sm
          ? "sm"
          : "xs",
      size: {
        xs: width >= xs,
        sm: width >= sm,
        md: width >= md,
        lg: width >= lg,
        xl: width >= xl,
      },
    }));
  };

  useEffect(() => {
    updateBreakpoint();
    window.addEventListener("resize", updateBreakpoint);

    return () => {
      window.removeEventListener("resize", updateBreakpoint);
    };
  }, [xs, sm, md, lg, xl]);

  return breakpoints;
};

export default useBreakpoints;
