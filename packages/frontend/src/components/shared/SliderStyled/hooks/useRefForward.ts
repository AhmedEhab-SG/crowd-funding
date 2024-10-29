import { ForwardedRef, useRef } from "react";

const useRefForward = <T>(ref: ForwardedRef<T>) => {
  const targetRef = useRef<T | null>(null);

  const refHandler = (e: T | null) => {
    if (typeof ref === "function") ref(e);
    if (ref && typeof ref === "object") ref.current = e;
    targetRef.current = e;
  };

  return [targetRef, refHandler] as const;
};

export default useRefForward;
