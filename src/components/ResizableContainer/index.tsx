import { getPosition, mouseDrag } from '@/utils/mouseDrag';
import { HTMLAttributes, forwardRef, useState, RefObject, SetStateAction, Dispatch } from 'react';

interface Props {
  x: number;
  y: number;
  container: RefObject<HTMLDivElement>;
  setPosition: Dispatch<SetStateAction<{ x: number; y: number }>>;
}

const ResizableContainer = forwardRef<HTMLDivElement, HTMLAttributes<HTMLElement> & Props>(
  ({ x, y, container, setPosition, children, ...props }, ref) => {
    const [{ w, h }, setSize] = useState({ w: 200, h: 200 });

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
      if (container.current) {
        const containerRect = container.current.getBoundingClientRect();

        setSize({
          w: getPosition(w + moveX, 200, containerRect.width - x),
          h: getPosition(h - moveY, 200, y + h),
        });
        setPosition({
          x,
          y: getPosition(y + moveY, 0, y + h - 200),
        });
      }
    });

    const { handleMouseDown: handleResizeSouthWest } = mouseDrag((moveX, moveY) => {
      if (container.current) {
        const containerRect = container.current.getBoundingClientRect();

        setSize({
          w: getPosition(w - moveX, 200, x + w),
          h: getPosition(h + moveY, 200, containerRect.height - y),
        });
        setPosition({
          x: getPosition(x + moveX, 0, x + w - 200),
          y,
        });
      }
    });

    const { handleMouseDown: handleResizeSouthEast } = mouseDrag((moveX, moveY) => {
      if (container.current) {
        const containerRect = container.current.getBoundingClientRect();

        setSize({
          w: getPosition(w + moveX, 200, containerRect.width - x),
          h: getPosition(h + moveY, 200, containerRect.height - y),
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
      if (container.current) {
        const containerRect = container.current.getBoundingClientRect();

        setSize({
          w: getPosition(w + moveX, 200, containerRect.width - x),
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
      if (container.current) {
        const containerRect = container.current.getBoundingClientRect();

        setSize({
          w,
          h: getPosition(h + moveY, 200, containerRect.height - y),
        });
        setPosition({
          x,
          y,
        });
      }
    });

    return (
      <div {...props} ref={ref} style={{ width: w, height: h, ...props.style }}>
        {children}
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
  }
);

export default ResizableContainer;
