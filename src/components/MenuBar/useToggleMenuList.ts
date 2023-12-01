import { useEffect, useLayoutEffect, useRef, useState } from 'react';

const MENUBAR_PADDING_X = 8;

const useToggleMenuList = () => {
  const menuListRef = useRef<HTMLUListElement>(null);
  const [isOpen, setIsOpen] = useState(false);
  const [menuListPosition, setMenuListPosition] = useState({ x: 0, y: 0 });

  const toggleMenuList = (rect: DOMRect) => {
    setIsOpen((prevOpenState) => !prevOpenState);

    const x = rect.x;
    const y = rect.y + rect.height;

    setMenuListPosition({ x, y });
  };

  useEffect(() => {
    const handleClickAway = (event: Event) => {
      const menuListElement = menuListRef.current;
      const isClickMenuBarItemAway = event.target instanceof HTMLElement && !menuListElement?.contains(event.target);
      if (isClickMenuBarItemAway) {
        setIsOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickAway);

    return () => {
      document.removeEventListener('mousedown', handleClickAway);
    };
  }, [menuListRef]);

  useLayoutEffect(() => {
    if (!menuListRef.current) return;
    const menuListElement = menuListRef.current;

    const menuListElementRight = menuListPosition.x + menuListElement.clientWidth;
    const isOverflowedWindow = menuListElementRight > window.innerWidth - MENUBAR_PADDING_X;

    if (isOverflowedWindow) {
      const x = menuListPosition.x - (menuListElementRight - window.innerWidth + MENUBAR_PADDING_X);
      setMenuListPosition((prevPositionState) => ({ ...prevPositionState, x }));
    }
  }, [menuListPosition]);

  return { menuListRef, isOpen, menuListPosition, toggleMenuList };
};

export default useToggleMenuList;
