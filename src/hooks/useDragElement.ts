import { RefObject, useRef, useState } from 'react';

const useDragElement = <T extends HTMLElement>(
  containerRef: RefObject<HTMLElement>,
  initialX: number,
  initialY: number
) => {
  const [{ x, y }, setPosition] = useState({ x: initialX, y: initialY });
  const targetRef = useRef<T>(null);

  const getPosition = (range: number, min: number, max: number) => {
    if (range < min) return min;
    if (range > max) return max;
    return range;
  };

  const handleMouseDown = (downEvent: React.MouseEvent) => {
    const handleMouseMove = (moveEvent: MouseEvent) => {
      moveEvent.preventDefault();
      const [moveX, moveY] = [moveEvent.clientX - downEvent.clientX, moveEvent.clientY - downEvent.clientY];

      if (containerRef.current && targetRef.current) {
        const containerRect = containerRef.current.getBoundingClientRect();
        const targetElementRect = targetRef.current.getBoundingClientRect();
        const calculatedX = getPosition(x + moveX, 0, containerRect.width - targetElementRect.width);
        const calculatedY = getPosition(y + moveY, 0, containerRect.height - targetElementRect.height);
        setPosition({ x: calculatedX, y: calculatedY });
      }
    };

    const handleMouseUp = () => {
      document.removeEventListener('mousemove', handleMouseMove);
    };

    document.addEventListener('mousemove', handleMouseMove);
    document.addEventListener('mouseup', handleMouseUp, { once: true });
  };

  return { x, y, targetRef, handleDragElement: handleMouseDown };
};

export default useDragElement;
