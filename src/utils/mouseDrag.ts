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
