import { BOUNDARY_MARGIN, BOUNDARY_MIN } from '@/constants/resize';
import { Size } from '@/types/size';
import { Position } from '@/types/position';
import { clampValue, mouseDrag } from '@/utils/mouseDrag';
import { useRef, useState } from 'react';

const useRND = (initialPosition: Position, minSize: Size, boundary: Size) => {
  const ref = useRef<HTMLDivElement>(null);

  const { width: minWidth, height: minHeight } = minSize;
  const { x: initialX, y: initialY } = initialPosition;
  const { width: boundaryWidth, height: boundaryHeight } = boundary;

  const [{ width, height }, setSize] = useState<Size>({ width: minWidth, height: minHeight });
  const [{ x, y }, setPosition] = useState<Position>({ x: initialX, y: initialY });

  let mouseUpPosition = { x, y };
  let mouseUpSize = { width, height };

  const handleMouseUp = () => {
    setResize({ ...mouseUpPosition, ...mouseUpSize });
  };

  const { handleMouseDown: handleDragElement } = mouseDrag((moveX, moveY) => {
    if (!ref.current) return;

    const calculatedX = clampValue(x + moveX, BOUNDARY_MIN - width + BOUNDARY_MARGIN, boundary.width - BOUNDARY_MARGIN);
    const calculatedY = clampValue(y + moveY, BOUNDARY_MIN, boundary.height - BOUNDARY_MARGIN);

    repositionElement({ x: calculatedX, y: calculatedY });
  }, handleMouseUp);

  const { handleMouseDown: handleResizeNorthWest } = mouseDrag((moveX, moveY) => {
    if (!ref.current) return;
    const calculatedWidth = clampValue(width - moveX, minWidth, x + width);
    const calculatedHeight = clampValue(height - moveY, minHeight, y + height);

    const calculatedX = clampValue(x + moveX, BOUNDARY_MIN, x + width - minWidth);
    const calculatedY = clampValue(y + moveY, BOUNDARY_MIN, y + height - minHeight);

    resizeElement({ width: calculatedWidth, height: calculatedHeight });
    repositionElement({ x: calculatedX, y: calculatedY });
  }, handleMouseUp);

  const { handleMouseDown: handleResizeNorthEast } = mouseDrag((moveX, moveY) => {
    if (!ref.current) return;

    const calculatedWidth = clampValue(width + moveX, minWidth, boundaryWidth - x);
    const calculatedHeight = clampValue(height - moveY, minHeight, y + height);

    const calculatedY = clampValue(y + moveY, BOUNDARY_MIN, y + height - minHeight);

    resizeElement({ width: calculatedWidth, height: calculatedHeight });
    repositionElement({ x, y: calculatedY });
  }, handleMouseUp);

  const { handleMouseDown: handleResizeSouthWest } = mouseDrag((moveX, moveY) => {
    if (!ref.current) return;

    const calculatedWidth = clampValue(width - moveX, minWidth, x + width);
    const calculatedHeight = clampValue(height + moveY, minHeight, boundaryHeight - y);

    const calculatedX = clampValue(x + moveX, BOUNDARY_MIN, x + width - minWidth);

    resizeElement({ width: calculatedWidth, height: calculatedHeight });
    repositionElement({ x: calculatedX, y });
  }, handleMouseUp);

  const { handleMouseDown: handleResizeSouthEast } = mouseDrag((moveX, moveY) => {
    if (!ref.current) return;

    const calculatedWidth = clampValue(width + moveX, minWidth, boundaryWidth - x);
    const calculatedHeight = clampValue(height + moveY, minHeight, boundaryHeight - y);

    resizeElement({ width: calculatedWidth, height: calculatedHeight });
    repositionElement({ x, y });
  }, handleMouseUp);

  const { handleMouseDown: handleResizeWest } = mouseDrag((moveX) => {
    if (!ref.current) return;

    const calculatedWidth = clampValue(width - moveX, minWidth, x + width);

    const calculatedX = clampValue(x + moveX, BOUNDARY_MIN, x + width - minWidth);

    resizeElement({ width: calculatedWidth, height: height });
    repositionElement({ x: calculatedX, y });
  }, handleMouseUp);

  const { handleMouseDown: handleResizeEast } = mouseDrag((moveX) => {
    if (!ref.current) return;

    const calculatedWidth = clampValue(width + moveX, minWidth, boundaryWidth - x);

    resizeElement({ width: calculatedWidth, height });
    repositionElement({ x, y });
  }, handleMouseUp);

  const { handleMouseDown: handleResizeNorth } = mouseDrag((_, moveY) => {
    if (!ref.current) return;

    const calculatedHeight = clampValue(height - moveY, minHeight, y + height);

    const calculatedY = clampValue(y + moveY, BOUNDARY_MIN, y + height - minHeight);

    resizeElement({ width, height: calculatedHeight });
    repositionElement({ x, y: calculatedY });
  }, handleMouseUp);

  const { handleMouseDown: handleResizeSouth } = mouseDrag((_, moveY) => {
    if (!ref.current) return;

    const calculatedHeight = clampValue(height + moveY, minHeight, boundaryHeight - y);

    resizeElement({ width, height: calculatedHeight });
    repositionElement({ x, y });
  }, handleMouseUp);

  const setResize = ({ x, y, width, height }: Position & Size) => {
    setPosition({ x, y });
    setSize({ width, height });
  };

  const repositionElement = ({ x, y }: Position) => {
    if (!ref.current) return;

    mouseUpPosition = { x, y };

    ref.current.style.transform = `translate(${x}px,${y}px)`;
  };

  const resizeElement = ({ width, height }: Size) => {
    if (!ref.current) return;

    mouseUpSize = { width, height };

    ref.current.style.width = `${width}px`;
    ref.current.style.height = `${height}px`;
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
    ref,
  };
};

export default useRND;
