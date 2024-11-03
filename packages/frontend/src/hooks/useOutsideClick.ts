"use client";

import { useEffect, useRef } from "react";

const useOutsideClick = (callback: () => void) => {
  const ref = useRef<HTMLElement | any>(null);

  useEffect(() => {
    let timeOutId: NodeJS.Timeout;
    const handleClickOutside = (event: MouseEvent | TouchEvent) => {
      if (ref.current && !ref.current.contains(event.target as Node))
        timeOutId = setTimeout(
          () => callback instanceof Function && callback(),
          10
        );
    };

    document.addEventListener("mouseup", handleClickOutside);
    document.addEventListener("touchend", handleClickOutside);

    return () => {
      clearTimeout(timeOutId);
      document.removeEventListener("mouseup", handleClickOutside);
      document.removeEventListener("touchend", handleClickOutside);
    };
  }, [callback]);

  return ref;
};

export default useOutsideClick;
