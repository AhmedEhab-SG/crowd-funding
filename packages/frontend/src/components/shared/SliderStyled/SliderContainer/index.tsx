import {
  ForwardedRef,
  forwardRef,
  HTMLAttributes,
  MouseEvent,
  ReactNode,
  useEffect,
  useState,
} from "react";
import styles from "./slider-container.module.css";
import { formatClasses } from "../utils";
import useRefForward from "../hooks/useRefForward";

interface SliderContainerProps extends HTMLAttributes<HTMLDivElement> {
  children: ReactNode;
  className?: string;
  onScroll?: (e: React.UIEvent<HTMLDivElement, UIEvent>) => void;
  onMouseDown?: (e: MouseEvent<HTMLDivElement, globalThis.MouseEvent>) => void;
  onMouseMove?: (e: MouseEvent<HTMLDivElement, globalThis.MouseEvent>) => void;
  onMouseUp?: (e: MouseEvent<HTMLDivElement, globalThis.MouseEvent>) => void;
  onMouseLeave?: (e: MouseEvent<HTMLDivElement, globalThis.MouseEvent>) => void;
}

const SliderContainer = forwardRef<HTMLDivElement, SliderContainerProps>(
  (
    {
      children,
      className = "",
      onScroll,
      onMouseDown,
      onMouseMove,
      onMouseUp,
      onMouseLeave,

      ...attributes
    }: SliderContainerProps,
    ref: ForwardedRef<HTMLDivElement>
  ) => {
    const [sliderRef, refHandler] = useRefForward(ref);

    const [startX, setStartX] = useState(0);
    const [scrollLeft, setScrollLeft] = useState(0);
    const [isMouseDown, setIsMouseDown] = useState(false);

    const onMouseDownHandler = (
      e: MouseEvent<HTMLDivElement, globalThis.MouseEvent>
    ) => {
      setIsMouseDown(true);
      setStartX(e.clientX);
      if (onMouseDown) onMouseDown(e);
    };

    const onMouseMoveHandler = (
      e: MouseEvent<HTMLDivElement, globalThis.MouseEvent>
    ) => {
      if (!isMouseDown || !sliderRef.current) return;
      e.preventDefault();
      const deltaX = (e.clientX - startX) * 0.07;
      sliderRef.current.scrollLeft = scrollLeft - deltaX;
      if (onMouseMove) onMouseMove(e);
    };

    const onMouseUpHandler = (
      e: MouseEvent<HTMLDivElement, globalThis.MouseEvent>
    ) => {
      setIsMouseDown(false);
      if (onMouseUp) onMouseUp(e);
    };

    const onMouseLeaveHandler = (
      e: MouseEvent<HTMLDivElement, globalThis.MouseEvent>
    ) => {
      setIsMouseDown(false);
      if (onMouseLeave) onMouseLeave(e);
    };

    const onScrollHandler = (e: React.UIEvent<HTMLDivElement, UIEvent>) => {
      if (!sliderRef.current) return;

      if (sliderRef.current.scrollLeft >= sliderRef.current.scrollWidth / 2) {
        sliderRef.current.scrollLeft = 1;
      }

      if (sliderRef.current.scrollLeft <= 0) {
        sliderRef.current.scrollLeft = sliderRef.current.scrollWidth / 2 - 1;
      }

      setScrollLeft(sliderRef.current.scrollLeft);

      if (onScroll) onScroll(e);
    };

    useEffect(() => {
      const id = setInterval(() => {
        if (!sliderRef.current) return;
        sliderRef.current.scrollBy({
          left: 200,
          behavior: "smooth",
        });
      }, 1.5 * 1000);

      return () => clearInterval(id);
    }, []);

    return (
      <div
        onMouseMove={onMouseMoveHandler}
        onMouseLeave={onMouseLeaveHandler}
        onMouseDown={onMouseDownHandler}
        onMouseUp={onMouseUpHandler}
        onScroll={onScrollHandler}
        ref={refHandler}
        className={formatClasses(`
          ${styles.rootSliderContainer}
          ${className}`)}
        {...attributes}
      >
        <ul
          className={formatClasses(`
            ${styles.sliderContainer}
            ${className}`)}
        >
          {children}
          {children}
        </ul>
      </div>
    );
  }
);

export default SliderContainer;
