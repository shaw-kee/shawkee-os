import { getPosition, mouseDrag } from '@/utils/mouseDrag';
import { HTMLAttributes, useState, RefObject, ReactElement, useRef } from 'react';

interface Props {
  initialX: number;
  initialY: number;
  boundaryRef: RefObject<HTMLDivElement>;
  render: (handleDragElement: (downEvent: React.MouseEvent<Element, MouseEvent>) => void) => ReactElement;
}

const ResizableContainer = ({
  initialX,
  initialY,
  boundaryRef,
  render,
  ...props
}: HTMLAttributes<HTMLElement> & Props) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [{ w, h }, setSize] = useState({ w: 200, h: 200 });
  const [{ x, y }, setPosition] = useState({ x: initialX, y: initialY });

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

  return (
    <div {...props} ref={containerRef} style={{ width: w, height: h, transform: `translate(${x}px, ${y}px)` }}>
      {render(handleDragElement)}
      <div className='absolute left-2 right-2 top-0 h-1 cursor-row-resize' onMouseDown={handleResizeNorth} />
      <div className='absolute bottom-0 left-2 right-2 h-1 cursor-row-resize' onMouseDown={handleResizeSouth} />
      <div className='absolute bottom-2 left-0 top-2 w-1 cursor-col-resize' onMouseDown={handleResizeWest} />
      <div className='absolute bottom-2 right-0 top-2 w-1 cursor-col-resize' onMouseDown={handleResizeEast} />
      <div
        className='absolute left-0 top-0 h-4 w-4 translate-x-[-50%] translate-y-[-50%] cursor-nw-resize'
        onMouseDown={handleResizeNorthWest}
      />
      <div
        className='absolute right-0 top-0 h-4 w-4 translate-x-[50%] translate-y-[-50%] cursor-ne-resize'
        onMouseDown={handleResizeNorthEast}
      />
      <div
        className='absolute bottom-0 left-0 h-4 w-4 translate-x-[-50%] translate-y-[50%] cursor-sw-resize'
        onMouseDown={handleResizeSouthWest}
      />
      <div
        className='absolute bottom-0 right-0 h-4 w-4 translate-x-[50%] translate-y-[50%] cursor-se-resize'
        onMouseDown={handleResizeSouthEast}
      />
    </div>
  );
};
export default ResizableContainer;
