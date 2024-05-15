import AppleIcon from '@/assets/icons/AppleIcon.svg?react';
import SpotlightIcon from '@/assets/icons/SpotlightIcon.svg?react';
import WifiIcon from '@/assets/icons/WifiIcon.svg?react';
import ControlCenterIcon from '@/assets/icons/ControlCenterIcon.svg?react';
import MenuBarItem from './MenuBarItem';
import Clock from './Clock';
import MenuList from './MenuList';
import MenuOverlay from './MenuOverlay';
import ControlCenter from './ControlCenter';
import { useContext, useMemo, type MouseEvent } from 'react';
import useOverlay from '@/hooks/useOverlay';
import useAudio from '@/hooks/useAudio';
import MusicSrc from '@/assets/music/sample.mp3';
import Spotlight from '../Spotlight';
import { AppStateContext } from '@/store/App/AppContext';
import { WindowApp } from '@/types/app';

const SYSTEM_MENUS = ['About This Mac', 'Log Out shawkee'];

const MenuBar = () => {
  const overlay = useOverlay();
  const { togglePlay } = useAudio({ src: MusicSrc });
  const apps = useContext(AppStateContext);

  const focusedApp: WindowApp | null = apps.reduce((previousApp: WindowApp | null, currentApp) => {
    if (currentApp.type === 'window' && currentApp.isOpen) {
      if (previousApp === null) return currentApp;
      if (previousApp.zIndex < currentApp.zIndex) return currentApp;
    }
    return previousApp;
  }, null);

  const appMenus = useMemo(() => {
    if (!focusedApp) return null;
    return [`Hide ${focusedApp.title}`, `Quit ${focusedApp.title}`];
  }, [focusedApp]);

  const openSystemMenu = (event: MouseEvent<HTMLButtonElement>) => {
    event.stopPropagation();
    const rect = event.currentTarget.getBoundingClientRect();
    overlay.open(() => (
      <MenuOverlay initialPosition={{ x: rect.x, y: rect.y + rect.height }} close={overlay.close}>
        <MenuList menus={SYSTEM_MENUS} />
      </MenuOverlay>
    ));
  };

  const openAppMenu = (event: MouseEvent<HTMLButtonElement>) => {
    event.stopPropagation();
    const rect = event.currentTarget.getBoundingClientRect();
    if (appMenus === null) return;
    overlay.open(() => (
      <MenuOverlay initialPosition={{ x: rect.x, y: rect.y + rect.height }} close={overlay.close}>
        <MenuList menus={appMenus} />
      </MenuOverlay>
    ));
  };

  const openControlCenter = (event: MouseEvent<HTMLButtonElement>) => {
    event.stopPropagation();
    const rect = event.currentTarget.getBoundingClientRect();
    overlay.open(() => (
      <MenuOverlay initialPosition={{ x: rect.x, y: rect.y + rect.height }} close={overlay.close}>
        <ControlCenter togglePlay={togglePlay} />
      </MenuOverlay>
    ));
  };

  const openSpotlight = (event: MouseEvent<HTMLButtonElement>) => {
    event.stopPropagation();
    overlay.open(() => <Spotlight close={overlay.close} />);
  };

  return (
    <>
      <div className='flex w-full justify-between bg-white/50 px-[8px] backdrop-blur-[25px]'>
        <div className='flex space-x-[-2px]'>
          <MenuBarItem onClick={openSystemMenu}>
            <AppleIcon width={14} height={17} viewBox='0 0 14 17' />
          </MenuBarItem>
          <MenuBarItem onClick={openAppMenu}>
            <span className='font-semibold'>{focusedApp === null ? 'Finder' : focusedApp.title}</span>
          </MenuBarItem>
        </div>
        <div className='flex'>
          <MenuBarItem>
            <WifiIcon width={16} height={11} viewBox='0 0 16 11' />
          </MenuBarItem>
          <MenuBarItem onClick={openSpotlight}>
            <SpotlightIcon width={14} height={13} viewBox='0 0 14 13' />
          </MenuBarItem>
          <MenuBarItem onClick={openControlCenter}>
            <ControlCenterIcon width={14} height={13} viewBox='0 0 14 13' />
          </MenuBarItem>
          <MenuBarItem>
            <Clock />
          </MenuBarItem>
        </div>
      </div>
    </>
  );
};

export default MenuBar;
