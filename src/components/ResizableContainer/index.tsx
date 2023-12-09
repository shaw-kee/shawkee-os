import useDraggable from '@/components/ResizableContainer/useDraggable';
import { HTMLAttributes, RefObject, ReactElement } from 'react';

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
  const {
    x,
    y,
    w,
    h,
    handleResizeEast,
    handleResizeNorth,
    handleResizeNorthWest,
    handleResizeNorthEast,
    handleResizeSouth,
    handleResizeSouthEast,
    handleResizeSouthWest,
    handleResizeWest,
    containerRef,
    handleDragElement,
  } = useDraggable(initialX, initialY, boundaryRef);

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
