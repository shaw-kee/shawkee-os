import { BOUNDARY_MIN } from '@/constants/resize';
import { Size } from '@/types/size';
import { Position } from '@/types/position';
import { clampValue, mouseDrag } from '@/utils/mouseDrag';
import { useState } from 'react';

const useRND = (initialPosition: Position, minSize: Size, boundary: Size) => {
  const { width: minWidth, height: minHeight } = minSize;
  const { x: initialX, y: initialY } = initialPosition;
  const { width: boundaryWidth, height: boundaryHeight } = boundary;
  const [{ width, height }, setSize] = useState<Size>({ width: minWidth, height: minHeight });
  const [{ x, y }, setPosition] = useState<Position>({ x: initialX, y: initialY });

  const { handleMouseDown: handleDragElement } = mouseDrag((moveX, moveY) => {
    const calculatedX = clampValue(x + moveX, BOUNDARY_MIN, boundary.width - width);
    const calculatedY = clampValue(y + moveY, BOUNDARY_MIN, boundary.height - height);
    setPosition({ x: calculatedX, y: calculatedY });
  });

  const { handleMouseDown: handleResizeNorthWest } = mouseDrag((moveX, moveY) => {
    setSize({
      width: clampValue(width - moveX, minWidth, x + width),
      height: clampValue(height - moveY, minHeight, y + height),
    });
    setPosition({
      x: clampValue(x + moveX, BOUNDARY_MIN, x + width - minWidth),
      y: clampValue(y + moveY, BOUNDARY_MIN, y + height - minHeight),
    });
  });

  const { handleMouseDown: handleResizeNorthEast } = mouseDrag((moveX, moveY) => {
    setSize({
      width: clampValue(width + moveX, minWidth, boundaryWidth - x),
      height: clampValue(height - moveY, minHeight, y + height),
    });
    setPosition({
      x,
      y: clampValue(y + moveY, BOUNDARY_MIN, y + height - minHeight),
    });
  });

  const { handleMouseDown: handleResizeSouthWest } = mouseDrag((moveX, moveY) => {
    setSize({
      width: clampValue(width - moveX, minWidth, x + width),
      height: clampValue(height + moveY, minHeight, boundaryHeight - y),
    });
    setPosition({
      x: clampValue(x + moveX, BOUNDARY_MIN, x + width - minWidth),
      y,
    });
  });

  const { handleMouseDown: handleResizeSouthEast } = mouseDrag((moveX, moveY) => {
    setSize({
      width: clampValue(width + moveX, minWidth, boundaryWidth - x),
      height: clampValue(height + moveY, minHeight, boundaryHeight - y),
    });
    setPosition({
      x,
      y,
    });
  });

  const { handleMouseDown: handleResizeWest } = mouseDrag((moveX) => {
    setSize({
      width: clampValue(width - moveX, minWidth, x + width),
      height,
    });
    setPosition({
      x: clampValue(x + moveX, BOUNDARY_MIN, x + width - minWidth),
      y,
    });
  });

  const { handleMouseDown: handleResizeEast } = mouseDrag((moveX) => {
    setSize({
      width: clampValue(width + moveX, minWidth, boundaryWidth - x),
      height,
    });
    setPosition({
      x,
      y,
    });
  });

  const { handleMouseDown: handleResizeNorth } = mouseDrag((_, moveY) => {
    setSize({
      width,
      height: clampValue(height - moveY, minHeight, y + height),
    });
    setPosition({
      x,
      y: clampValue(y + moveY, BOUNDARY_MIN, y + height - minHeight),
    });
  });

  const { handleMouseDown: handleResizeSouth } = mouseDrag((_, moveY) => {
    setSize({
      width,
      height: clampValue(height + moveY, minHeight, boundaryHeight - y),
    });
    setPosition({
      x,
      y,
    });
  });

  const setResize = ({ x, y, width, height }: Position & Size) => {
    setPosition({ x, y });
    setSize({ width, height });
  };

  return {
    x,
    y,
    width,
    height,
    setResize,
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
