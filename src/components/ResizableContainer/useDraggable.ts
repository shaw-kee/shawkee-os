import { getPosition, mouseDrag } from '@/utils/mouseDrag';
import { RefObject, useRef, useState } from 'react';

const useDraggable = (initialX: number, initialY: number, boundaryRef: RefObject<HTMLElement>) => {
  const [{ w, h }, setSize] = useState({ w: 200, h: 200 });
  const [{ x, y }, setPosition] = useState({ x: initialX, y: initialY });
  const containerRef = useRef<HTMLDivElement>(null);

  const { handleMouseDown: handleDragElement } = mouseDrag((moveX, moveY) => {
    if (boundaryRef.current && containerRef.current) {
      const containerRect = boundaryRef.current.getBoundingClientRect();
      const targetElementRect = containerRef.current.getBoundingClientRect();
      const calculatedX = getPosition(x + moveX, 0, containerRect.width - targetElementRect.width);
      const calculatedY = getPosition(y + moveY, 0, containerRect.height - targetElementRect.height);
      setPosition({ x: calculatedX, y: calculatedY });
    }
  });

  const { handleMouseDown: handleResizeNorthWest } = mouseDrag((moveX, moveY) => {
    setSize({
      w: getPosition(w - moveX, 200, x + w),
      h: getPosition(h - moveY, 200, y + h),
    });
    setPosition({
      x: getPosition(x + moveX, 0, x + w - 200),
      y: getPosition(y + moveY, 0, y + h - 200),
    });
  });

  const { handleMouseDown: handleResizeNorthEast } = mouseDrag((moveX, moveY) => {
    if (boundaryRef.current) {
      const boundaryRect = boundaryRef.current.getBoundingClientRect();

      setSize({
        w: getPosition(w + moveX, 200, boundaryRect.width - x),
        h: getPosition(h - moveY, 200, y + h),
      });
      setPosition({
        x,
        y: getPosition(y + moveY, 0, y + h - 200),
      });
    }
  });

  const { handleMouseDown: handleResizeSouthWest } = mouseDrag((moveX, moveY) => {
    if (boundaryRef.current) {
      const boundaryRect = boundaryRef.current.getBoundingClientRect();

      setSize({
        w: getPosition(w - moveX, 200, x + w),
        h: getPosition(h + moveY, 200, boundaryRect.height - y),
      });
      setPosition({
        x: getPosition(x + moveX, 0, x + w - 200),
        y,
      });
    }
  });

  const { handleMouseDown: handleResizeSouthEast } = mouseDrag((moveX, moveY) => {
    if (boundaryRef.current) {
      const boundaryRect = boundaryRef.current.getBoundingClientRect();

      setSize({
        w: getPosition(w + moveX, 200, boundaryRect.width - x),
        h: getPosition(h + moveY, 200, boundaryRect.height - y),
      });
      setPosition({
        x,
        y,
      });
    }
  });

  const { handleMouseDown: handleResizeWest } = mouseDrag((moveX) => {
    setSize({
      w: getPosition(w - moveX, 200, x + w),
      h,
    });
    setPosition({
      x: getPosition(x + moveX, 0, x + w - 200),
      y,
    });
  });

  const { handleMouseDown: handleResizeEast } = mouseDrag((moveX) => {
    if (boundaryRef.current) {
      const boundaryRect = boundaryRef.current.getBoundingClientRect();

      setSize({
        w: getPosition(w + moveX, 200, boundaryRect.width - x),
        h,
      });
      setPosition({
        x,
        y,
      });
    }
  });

  const { handleMouseDown: handleResizeNorth } = mouseDrag((_, moveY) => {
    setSize({
      w,
      h: getPosition(h - moveY, 200, y + h),
    });
    setPosition({
      x,
      y: getPosition(y + moveY, 0, y + h - 200),
    });
  });

  const { handleMouseDown: handleResizeSouth } = mouseDrag((_, moveY) => {
    if (boundaryRef.current) {
      const boundaryRect = boundaryRef.current.getBoundingClientRect();

      setSize({
        w,
        h: getPosition(h + moveY, 200, boundaryRect.height - y),
      });
      setPosition({
        x,
        y,
      });
    }
  });

  return {
    x,
    y,
    w,
    h,
    containerRef,
    handleResizeEast,
    handleResizeNorth,
    handleResizeNorthEast,
    handleResizeNorthWest,
    handleResizeSouth,
    handleResizeSouthEast,
    handleResizeSouthWest,
    handleResizeWest,
    handleDragElement,
  };
};

export default useDraggable;
