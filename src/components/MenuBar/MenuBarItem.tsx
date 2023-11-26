import type { ReactNode } from 'react';
import { Menu } from '@/types/menu';
import MenuList from './MenuList';
import useToggleMenuList from './useToggleMenuList';

interface MenuBarItemProps {
  isAppName?: boolean;
  children: ReactNode;
  menus?: Menu[];
}

const MenuBarItem = ({ isAppName = false, children, menus }: MenuBarItemProps) => {
  const fontWeightClass = isAppName ? 'font-bold' : 'font-base';

  const { menuListRef, isOpen, menuListPosition, toggleMenuList } = useToggleMenuList();

  const handleMenuBarItemClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    const rect = event.currentTarget.getBoundingClientRect();
    toggleMenuList(rect);
  };

  return (
    <>
      <button
        type='button'
        className={`text cursor-default rounded-[4px] px-[11px] py-[4px] text-[13px] leading-[16px] active:bg-[#090909]/10 ${fontWeightClass}`}
        onClick={handleMenuBarItemClick}
      >
        {children}
      </button>
      {menus && isOpen && <MenuList ref={menuListRef} position={menuListPosition} menus={menus} />}
    </>
  );
};

export default MenuBarItem;
