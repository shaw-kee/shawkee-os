import { Size } from '@/types/size';

export const mouseDrag = (onDragMouse: (deltaX: number, deltaY: number) => void, onMouseUp?: () => void) => {
  return {
    handleMouseDown: (downEvent: React.MouseEvent) => {
      const handleMouseMove = (moveEvent: MouseEvent) => {
        moveEvent.preventDefault();
        const [moveX, moveY] = [moveEvent.clientX - downEvent.clientX, moveEvent.clientY - downEvent.clientY];
        onDragMouse(moveX, moveY);
      };

      const handleMouseUp = () => {
        document.removeEventListener('mousemove', handleMouseMove);
        onMouseUp && onMouseUp();
      };

      document.addEventListener('mousemove', handleMouseMove);
      document.addEventListener('mouseup', handleMouseUp, { once: true });
    },
  };
};

export const clampValue = (range: number, min: number, max: number) => {
  if (range < min) return min;
  if (range > max) return max;
  return range;
};

export const initPosition = (size: Size, boundary: Size) => {
  return boundary.width <= 0 || boundary.height <= 0
    ? { x: 0, y: 0 }
    : { x: Math.round(boundary.width / 2 - size.width / 2), y: Math.round(boundary.height / 2 - size.height / 2) };
};
