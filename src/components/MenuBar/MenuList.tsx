import type { Menu } from '@/types/menu';

interface MenuListProps {
  menus: Menu[];
  close: () => void;
}

const MenuList = ({ menus, close }: MenuListProps) => {
  return (
    <ul className='flex flex-col'>
      {menus.map((menu, index) => (
        <li key={index} className='menu-item rounded-[5px] px-2.5 py-0.5 hover:text-white'>
          <button
            type='button'
            className='w-full cursor-default text-left leading-4'
            onClick={(event) => {
              event.preventDefault();
              close();
              menu.onClick();
            }}
          >
            {menu.label}
          </button>
        </li>
      ))}
    </ul>
  );
};

export default MenuList;
