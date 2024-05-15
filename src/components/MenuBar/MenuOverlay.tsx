import type { Position } from '@/types/position';
import { useRef, type ReactNode, useEffect, useLayoutEffect, useState } from 'react';

const MENUBAR_PADDING_X = 8;

type MenuListProps = {
  children?: ReactNode;
  initialPosition: Position;
  close: () => void;
};

const MenuOverlay = ({ children, initialPosition, close }: MenuListProps) => {
  const [position, setPosition] = useState<Position>(initialPosition);

  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickAway = (event: Event) => {
      const menuElement = ref.current;
      const isClickMenuBarItemAway = event.target instanceof HTMLElement && !menuElement?.contains(event.target);

      if (isClickMenuBarItemAway) {
        close();
      }
    };

    document.addEventListener('mousedown', handleClickAway);

    return () => {
      document.removeEventListener('mousedown', handleClickAway);
    };
  });

  useLayoutEffect(() => {
    if (!ref.current) return;
    const menuElement = ref.current;

    const menuElementRight = initialPosition.x + menuElement.clientWidth;
    const isOverflowedWindow = menuElementRight > window.innerWidth - MENUBAR_PADDING_X;

    if (isOverflowedWindow) {
      const x = initialPosition.x - (menuElementRight - window.innerWidth + MENUBAR_PADDING_X);
      setPosition((prevPositionState) => ({ ...prevPositionState, x }));
    }
  }, [initialPosition]);

  return (
    <div
      className={`popup-container absolute z-50 flex min-w-[220px] flex-col rounded-md p-[5px] text-[13px]`}
      style={{ left: position.x, top: position.y }}
      ref={ref}
    >
      {children}
    </div>
  );
};

export default MenuOverlay;
