import { useEffect, useLayoutEffect, useRef, useState } from 'react';

const MENUBAR_PADDING_X = 8;

const useToggleMenu = () => {
  const overlayRef = useRef<HTMLDivElement>(null);
  const [isOpen, setIsOpen] = useState(false);
  const [overlayPosition, setOverlayPosition] = useState({ x: 0, y: 0 });

  const openMenu = (rect: DOMRect) => {
    setIsOpen(true);

    const x = rect.x;
    const y = rect.y + rect.height;

    setOverlayPosition({ x, y });
  };

  useEffect(() => {
    const handleClickAway = (event: Event) => {
      const menuElement = overlayRef.current;
      const isClickMenuBarItemAway = event.target instanceof HTMLElement && !menuElement?.contains(event.target);
      if (isClickMenuBarItemAway) {
        setIsOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickAway);

    return () => {
      document.removeEventListener('mousedown', handleClickAway);
    };
  }, [overlayRef]);

  useLayoutEffect(() => {
    if (!overlayRef.current) return;
    const menuElement = overlayRef.current;

    const menuElementRight = overlayPosition.x + menuElement.clientWidth;
    const isOverflowedWindow = menuElementRight > window.innerWidth - MENUBAR_PADDING_X;

    if (isOverflowedWindow) {
      const x = overlayPosition.x - (menuElementRight - window.innerWidth + MENUBAR_PADDING_X);
      setOverlayPosition((prevPositionState) => ({ ...prevPositionState, x }));
    }
  }, [overlayPosition]);

  return { isOpen, overlayRef, overlayPosition, openMenu };
};

export default useToggleMenu;
