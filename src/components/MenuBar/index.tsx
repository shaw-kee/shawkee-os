import AppleIcon from '@/assets/icons/AppleIcon.svg?react';
import ControlCenterIcon from '@/assets/icons/ControlCenterIcon.svg?react';
import SpotlightIcon from '@/assets/icons/SpotlightIcon.svg?react';
import WifiIcon from '@/assets/icons/WifiIcon.svg?react';
import MenuBarItem from './MenuBarItem';
import Clock from './Clock';

const DEFAULT_MENUS = ['Menu1', 'Menu2', 'Menu3', 'LongTextMenuLongTextMenuLongTextMenu'];

const MenuBar = () => {
  return (
    <div className='flex w-full justify-between bg-white/50 px-[8px] backdrop-blur-[25px]'>
      <div className='flex'>
        <MenuBarItem menus={DEFAULT_MENUS}>
          <AppleIcon width={14} height={17} viewBox='0 0 14 17' />
        </MenuBarItem>
        <MenuBarItem isAppName>Finder</MenuBarItem>
        <MenuBarItem>Menu1</MenuBarItem>
        <MenuBarItem menus={DEFAULT_MENUS}>Menu2</MenuBarItem>
      </div>
      <div className='flex'>
        <MenuBarItem>
          <WifiIcon width={16} height={11} viewBox='0 0 16 11' />
        </MenuBarItem>
        <MenuBarItem>
          <SpotlightIcon width={14} height={13} viewBox='0 0 14 13' />
        </MenuBarItem>
        <MenuBarItem>
          <ControlCenterIcon width={14} height={13} viewBox='0 0 14 13' />
        </MenuBarItem>
        <MenuBarItem menus={DEFAULT_MENUS}>
          <Clock />
        </MenuBarItem>
      </div>
    </div>
  );
};

export default MenuBar;
