import type { Menu } from '@/types/menu';

interface MenuListProps {
  menus: Menu[];
}

const MenuList = ({ menus }: MenuListProps) => {
  return (
    <ul className='flex flex-col'>
      {menus.map((menu, index) => (
        <li key={index} className='menu-item rounded-[5px] px-2.5 py-0.5 hover:text-white'>
          <button type='button' className='cursor-default leading-4'>
            {menu}
          </button>
        </li>
      ))}
    </ul>
  );
};

export default MenuList;
