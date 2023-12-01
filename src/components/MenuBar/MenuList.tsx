import type { Menu } from '@/types/menu';
import type { Position } from '@/types/position';
import { forwardRef } from 'react';

interface MenuListProps {
  menus: Menu[];
  position: Position;
}

const MenuList = forwardRef<HTMLUListElement, MenuListProps>(({ menus, position }, ref) => {
  return (
    <ul
      className={`menu-list absolute flex flex-col rounded-md p-[5px] text-[13px]`}
      style={{ left: position.x, top: position.y }}
      ref={ref}
    >
      {menus.map((menu, index) => (
        <li key={index} className='rounded-[5px] px-2.5 hover:text-white'>
          <button type='button' className='cursor-default leading-4'>
            {menu}
          </button>
        </li>
      ))}
    </ul>
  );
});

export default MenuList;
