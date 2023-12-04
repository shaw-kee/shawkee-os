import type { ReactNode } from 'react';
import { Menu } from '@/types/menu';

interface MenuBarItemProps {
  isAppName?: boolean;
  children: ReactNode;
  menus?: Menu[];
  onClick?: (event: React.MouseEvent<HTMLButtonElement>) => void;
}

const MenuBarItem = ({ isAppName = false, children, onClick }: MenuBarItemProps) => {
  const fontWeightClass = isAppName ? 'font-bold' : 'font-base';

  return (
    <>
      <button
        type='button'
        className={`text cursor-default rounded-[4px] px-[11px] py-[4px] text-[13px] leading-[16px] active:bg-[#090909]/10 ${fontWeightClass}`}
        onClick={onClick}
      >
        {children}
      </button>
    </>
  );
};

export default MenuBarItem;
