import { BOUNDARY_MIN } from '@/constants/resize';
import { Boundary } from '@/types/boundary';
import { clampValue, mouseDrag } from '@/utils/mouseDrag';
import { useState } from 'react';

const useRND = (initialX: number, initialY: number, minWidth: number, minHeight: number, boundary: Boundary) => {
  const [{ w, h }, setSize] = useState({ w: minWidth, h: minHeight });
  const [{ x, y }, setPosition] = useState({ x: initialX, y: initialY });
  const { width: boundaryWidth, height: boundaryHeight } = boundary;

  const { handleMouseDown: handleDragElement } = mouseDrag((moveX, moveY) => {
    const calculatedX = clampValue(x + moveX, BOUNDARY_MIN, boundary.width - w);
    const calculatedY = clampValue(y + moveY, BOUNDARY_MIN, boundary.height - h);
    setPosition({ x: calculatedX, y: calculatedY });
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
    setSize({
      w: clampValue(w + moveX, minWidth, boundaryWidth - x),
      h: clampValue(h - moveY, minHeight, y + h),
    });
    setPosition({
      x,
      y: clampValue(y + moveY, BOUNDARY_MIN, y + h - minHeight),
    });
  });

  const { handleMouseDown: handleResizeSouthWest } = mouseDrag((moveX, moveY) => {
    setSize({
      w: clampValue(w - moveX, minWidth, x + w),
      h: clampValue(h + moveY, minHeight, boundaryHeight - y),
    });
    setPosition({
      x: clampValue(x + moveX, BOUNDARY_MIN, x + w - minWidth),
      y,
    });
  });

  const { handleMouseDown: handleResizeSouthEast } = mouseDrag((moveX, moveY) => {
    setSize({
      w: clampValue(w + moveX, minWidth, boundaryWidth - x),
      h: clampValue(h + moveY, minHeight, boundaryHeight - y),
    });
    setPosition({
      x,
      y,
    });
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
    setSize({
      w: clampValue(w + moveX, minWidth, boundaryWidth - x),
      h,
    });
    setPosition({
      x,
      y,
    });
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
    setSize({
      w,
      h: clampValue(h + moveY, minHeight, boundaryHeight - y),
    });
    setPosition({
      x,
      y,
    });
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

export default useRND;
