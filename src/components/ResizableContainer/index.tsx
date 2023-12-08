import { HTMLAttributes, forwardRef } from 'react';

const ResizableContainer = forwardRef<HTMLDivElement, HTMLAttributes<HTMLElement>>(({ children, ...props }, ref) => {
  return (
    <div {...props} ref={ref}>
      {children}
      <div className='absolute left-2 right-2 top-0 h-1 cursor-row-resize' />
      <div className='absolute bottom-0 left-2 right-2 h-1 cursor-row-resize' />
      <div className='absolute bottom-2 left-0 top-2 w-1 cursor-col-resize' />
      <div className='absolute bottom-2 right-0 top-2 w-1 cursor-col-resize' />
      <div className='absolute left-0 top-0 h-4 w-4 translate-x-[-50%] translate-y-[-50%] cursor-nw-resize' />
      <div className='absolute right-0 top-0 h-4 w-4 translate-x-[50%] translate-y-[-50%] cursor-ne-resize' />
      <div className='absolute bottom-0 left-0 h-4 w-4 translate-x-[-50%] translate-y-[50%] cursor-sw-resize' />
      <div className='absolute bottom-0 right-0 h-4 w-4 translate-x-[50%] translate-y-[50%] cursor-se-resize' />
    </div>
  );
});

export default ResizableContainer;
