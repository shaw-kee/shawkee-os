import AppleIcon from '@/assets/icons/AppleIcon.svg?react';
import SpotlightIcon from '@/assets/icons/SpotlightIcon.svg?react';
import WifiIcon from '@/assets/icons/WifiIcon.svg?react';
import ControlCenterIcon from '@/assets/icons/ControlCenterIcon.svg?react';
import MenuBarItem from './MenuBarItem';
import Clock from './Clock';
import MenuList from './MenuList';
import MenuOverlay from './MenuOverlay';
import ControlCenter from './ControlCenter';
import type { MouseEvent } from 'react';
import useOverlay from '@/hooks/useOverlay';

const DEFAULT_MENUS = ['Menu1', 'Menu2', 'Menu3', 'LongTextMenuLongTextMenuLongTextMenu'];

const MenuBar = () => {
  const overlay = useOverlay();

  const openMenu = (event: MouseEvent<HTMLButtonElement>) => {
    event.stopPropagation();
    const rect = event.currentTarget.getBoundingClientRect();
    overlay.open(() => (
      <MenuOverlay initialPosition={{ x: rect.x, y: rect.y + rect.height }} close={overlay.close}>
        <MenuList menus={DEFAULT_MENUS} />
      </MenuOverlay>
    ));
  };

  const openControlCenter = (event: MouseEvent<HTMLButtonElement>) => {
    event.stopPropagation();
    const rect = event.currentTarget.getBoundingClientRect();
    overlay.open(() => (
      <MenuOverlay initialPosition={{ x: rect.x, y: rect.y + rect.height }} close={overlay.close}>
        <ControlCenter />
      </MenuOverlay>
    ));
  };

  return (
    <>
      <div className='flex w-full justify-between bg-white/50 px-[8px] backdrop-blur-[25px]'>
        <div className='flex'>
          <MenuBarItem onClick={openMenu}>
            <AppleIcon width={14} height={17} viewBox='0 0 14 17' />
          </MenuBarItem>
          <MenuBarItem>Finder</MenuBarItem>
          <MenuBarItem>Menu1</MenuBarItem>
          <MenuBarItem onClick={openMenu}>Menu2</MenuBarItem>
        </div>
        <div className='flex'>
          <MenuBarItem>
            <WifiIcon width={16} height={11} viewBox='0 0 16 11' />
          </MenuBarItem>
          <MenuBarItem>
            <SpotlightIcon width={14} height={13} viewBox='0 0 14 13' />
          </MenuBarItem>
          <MenuBarItem onClick={openControlCenter}>
            <ControlCenterIcon width={14} height={13} viewBox='0 0 14 13' />
          </MenuBarItem>
          <MenuBarItem onClick={openMenu}>
            <Clock />
          </MenuBarItem>
        </div>
      </div>
    </>
  );
};

export default MenuBar;
