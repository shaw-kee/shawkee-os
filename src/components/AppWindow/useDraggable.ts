import { BOUNDARY_MIN } from '@/constants/resize';
import { clampValue, mouseDrag } from '@/utils/mouseDrag';
import { RefObject, useState } from 'react';

const useDraggable = (
  initialX: number,
  initialY: number,
  minWidth: number,
  minHeight: number,
  boundaryRef: RefObject<HTMLElement>
) => {
  const [{ w, h }, setSize] = useState({ w: minWidth, h: minHeight });
  const [{ x, y }, setPosition] = useState({ x: initialX, y: initialY });

  const { handleMouseDown: handleDragElement } = mouseDrag((moveX, moveY) => {
    if (boundaryRef.current) {
      const containerRect = boundaryRef.current.getBoundingClientRect();
      const calculatedX = clampValue(x + moveX, BOUNDARY_MIN, containerRect.width - w);
      const calculatedY = clampValue(y + moveY, BOUNDARY_MIN, containerRect.height - h);
      setPosition({ x: calculatedX, y: calculatedY });
    }
  });

  const { handleMouseDown: handleResizeNorthWest } = mouseDrag((moveX, moveY) => {
    setSize({
      w: clampValue(w - moveX, minWidth, x + w),
      h: clampValue(h - moveY, minHeight, y + h),
    });
    setPosition({
      x: clampValue(x + moveX, BOUNDARY_MIN, x + w - minWidth),
      y: clampValue(y + moveY, BOUNDARY_MIN, y + h - minHeight),
    });
  });

  const { handleMouseDown: handleResizeNorthEast } = mouseDrag((moveX, moveY) => {
    if (boundaryRef.current) {
      const boundaryRect = boundaryRef.current.getBoundingClientRect();

      setSize({
        w: clampValue(w + moveX, minWidth, boundaryRect.width - x),
        h: clampValue(h - moveY, minHeight, y + h),
      });
      setPosition({
        x,
        y: clampValue(y + moveY, BOUNDARY_MIN, y + h - minHeight),
      });
    }
  });

  const { handleMouseDown: handleResizeSouthWest } = mouseDrag((moveX, moveY) => {
    if (boundaryRef.current) {
      const boundaryRect = boundaryRef.current.getBoundingClientRect();

      setSize({
        w: clampValue(w - moveX, minWidth, x + w),
        h: clampValue(h + moveY, minHeight, boundaryRect.height - y),
      });
      setPosition({
        x: clampValue(x + moveX, BOUNDARY_MIN, x + w - minWidth),
        y,
      });
    }
  });

  const { handleMouseDown: handleResizeSouthEast } = mouseDrag((moveX, moveY) => {
    if (boundaryRef.current) {
      const boundaryRect = boundaryRef.current.getBoundingClientRect();

      setSize({
        w: clampValue(w + moveX, minWidth, boundaryRect.width - x),
        h: clampValue(h + moveY, minHeight, boundaryRect.height - y),
      });
      setPosition({
        x,
        y,
      });
    }
  });

  const { handleMouseDown: handleResizeWest } = mouseDrag((moveX) => {
    setSize({
      w: clampValue(w - moveX, minWidth, x + w),
      h,
    });
    setPosition({
      x: clampValue(x + moveX, BOUNDARY_MIN, x + w - minWidth),
      y,
    });
  });

  const { handleMouseDown: handleResizeEast } = mouseDrag((moveX) => {
    if (boundaryRef.current) {
      const boundaryRect = boundaryRef.current.getBoundingClientRect();

      setSize({
        w: clampValue(w + moveX, minWidth, boundaryRect.width - x),
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
      h: clampValue(h - moveY, minHeight, y + h),
    });
    setPosition({
      x,
      y: clampValue(y + moveY, BOUNDARY_MIN, y + h - minHeight),
    });
  });

  const { handleMouseDown: handleResizeSouth } = mouseDrag((_, moveY) => {
    if (boundaryRef.current) {
      const boundaryRect = boundaryRef.current.getBoundingClientRect();

      setSize({
        w,
        h: clampValue(h + moveY, minHeight, boundaryRect.height - y),
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
