import type { Position } from '@/types/position';
import { forwardRef, type ReactNode } from 'react';

type MenuListProps = {
  children?: ReactNode;
  position: Position;
};

const MenuOverlay = forwardRef<HTMLDivElement, MenuListProps>(({ children, position }, ref) => {
  return (
    <div
      className={`popup-container absolute z-50 flex flex-col rounded-md p-[5px] text-[13px]`}
      style={{ left: position.x, top: position.y }}
      ref={ref}
    >
      {children}
    </div>
  );
});

export default MenuOverlay;
