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
  const positionRef = useRef({ x: initialX, y: initialY });
  const sizeRef = useRef({ width: minWidth, height: minHeight });

  const handleMouseUp = () => {
    setResize({ ...positionRef.current, ...sizeRef.current });
  };

  const { handleMouseDown: handleDragElement } = mouseDrag((moveX, moveY) => {
    if (!ref.current) return;

    const calculatedX = clampValue(x + moveX, BOUNDARY_MIN - width + BOUNDARY_MARGIN, boundary.width - BOUNDARY_MARGIN);
    const calculatedY = clampValue(y + moveY, BOUNDARY_MIN, boundary.height - BOUNDARY_MARGIN);

    positionRef.current = { x: calculatedX, y: calculatedY };

    ref.current.style.transform = `translate(${calculatedX}px,${calculatedY}px)`;
  }, handleMouseUp);

  const { handleMouseDown: handleResizeNorthWest } = mouseDrag((moveX, moveY) => {
    if (!ref.current) return;
    const calculatedWidth = clampValue(width - moveX, minWidth, x + width);
    const calculatedHeight = clampValue(height - moveY, minHeight, y + height);

    const calculatedX = clampValue(x + moveX, BOUNDARY_MIN, x + width - minWidth);
    const calculatedY = clampValue(y + moveY, BOUNDARY_MIN, y + height - minHeight);

    sizeRef.current = { width: calculatedWidth, height: calculatedHeight };
    positionRef.current = { x: calculatedX, y: calculatedY };

    ref.current.style.transform = `translate(${calculatedX}px,${calculatedY}px)`;
    ref.current.style.width = `${calculatedWidth}px`;
    ref.current.style.height = `${calculatedHeight}px`;
  }, handleMouseUp);

  const { handleMouseDown: handleResizeNorthEast } = mouseDrag((moveX, moveY) => {
    if (!ref.current) return;

    const calculatedWidth = clampValue(width + moveX, minWidth, boundaryWidth - x);
    const calculatedHeight = clampValue(height - moveY, minHeight, y + height);

    const calculatedX = x;
    const calculatedY = clampValue(y + moveY, BOUNDARY_MIN, y + height - minHeight);

    sizeRef.current = { width: calculatedWidth, height: calculatedHeight };
    positionRef.current = { x: calculatedX, y: calculatedY };

    ref.current.style.transform = `translate(${calculatedX}px,${calculatedY}px)`;
    ref.current.style.width = `${calculatedWidth}px`;
    ref.current.style.height = `${calculatedHeight}px`;
  }, handleMouseUp);

  const { handleMouseDown: handleResizeSouthWest } = mouseDrag((moveX, moveY) => {
    if (!ref.current) return;

    const calculatedWidth = clampValue(width - moveX, minWidth, x + width);
    const calculatedHeight = clampValue(height + moveY, minHeight, boundaryHeight - y);

    const calculatedX = clampValue(x + moveX, BOUNDARY_MIN, x + width - minWidth);
    const calculatedY = y;

    sizeRef.current = { width: calculatedWidth, height: calculatedHeight };
    positionRef.current = { x: calculatedX, y: calculatedY };

    ref.current.style.transform = `translate(${calculatedX}px,${calculatedY}px)`;
    ref.current.style.width = `${calculatedWidth}px`;
    ref.current.style.height = `${calculatedHeight}px`;
  }, handleMouseUp);

  const { handleMouseDown: handleResizeSouthEast } = mouseDrag((moveX, moveY) => {
    if (!ref.current) return;

    const calculatedWidth = clampValue(width + moveX, minWidth, boundaryWidth - x);
    const calculatedHeight = clampValue(height + moveY, minHeight, boundaryHeight - y);

    const calculatedX = x;
    const calculatedY = y;

    sizeRef.current = { width: calculatedWidth, height: calculatedHeight };
    positionRef.current = { x: calculatedX, y: calculatedY };

    ref.current.style.transform = `translate(${calculatedX}px,${calculatedY}px)`;
    ref.current.style.width = `${calculatedWidth}px`;
    ref.current.style.height = `${calculatedHeight}px`;
  }, handleMouseUp);

  const { handleMouseDown: handleResizeWest } = mouseDrag((moveX) => {
    if (!ref.current) return;

    const calculatedWidth = clampValue(width - moveX, minWidth, x + width);
    const calculatedHeight = height;

    const calculatedX = clampValue(x + moveX, BOUNDARY_MIN, x + width - minWidth);
    const calculatedY = y;

    sizeRef.current = { width: calculatedWidth, height: calculatedHeight };
    positionRef.current = { x: calculatedX, y: calculatedY };

    ref.current.style.transform = `translate(${calculatedX}px,${calculatedY}px)`;
    ref.current.style.width = `${calculatedWidth}px`;
    ref.current.style.height = `${calculatedHeight}px`;
  }, handleMouseUp);

  const { handleMouseDown: handleResizeEast } = mouseDrag((moveX) => {
    if (!ref.current) return;

    const calculatedWidth = clampValue(width + moveX, minWidth, boundaryWidth - x);
    const calculatedHeight = height;

    const calculatedX = x;
    const calculatedY = y;

    sizeRef.current = { width: calculatedWidth, height: calculatedHeight };
    positionRef.current = { x: calculatedX, y: calculatedY };

    ref.current.style.transform = `translate(${calculatedX}px,${calculatedY}px)`;
    ref.current.style.width = `${calculatedWidth}px`;
    ref.current.style.height = `${calculatedHeight}px`;
  }, handleMouseUp);

  const { handleMouseDown: handleResizeNorth } = mouseDrag((_, moveY) => {
    if (!ref.current) return;
    const calculatedWidth = width;
    const calculatedHeight = clampValue(height - moveY, minHeight, y + height);

    const calculatedX = x;
    const calculatedY = clampValue(y + moveY, BOUNDARY_MIN, y + height - minHeight);

    sizeRef.current = { width: calculatedWidth, height: calculatedHeight };
    positionRef.current = { x: calculatedX, y: calculatedY };

    ref.current.style.transform = `translate(${calculatedX}px,${calculatedY}px)`;
    ref.current.style.width = `${calculatedWidth}px`;
    ref.current.style.height = `${calculatedHeight}px`;
  }, handleMouseUp);

  const { handleMouseDown: handleResizeSouth } = mouseDrag((_, moveY) => {
    if (!ref.current) return;

    const calculatedWidth = width;
    const calculatedHeight = clampValue(height + moveY, minHeight, boundaryHeight - y);

    const calculatedX = x;
    const calculatedY = y;

    sizeRef.current = { width: calculatedWidth, height: calculatedHeight };
    positionRef.current = { x: calculatedX, y: calculatedY };

    ref.current.style.transform = `translate(${calculatedX}px,${calculatedY}px)`;
    ref.current.style.width = `${calculatedWidth}px`;
    ref.current.style.height = `${calculatedHeight}px`;
  }, handleMouseUp);

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
    ref,
  };
};

export default useRND;
