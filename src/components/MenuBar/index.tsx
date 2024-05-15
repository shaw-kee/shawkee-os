import AppleIcon from '@/assets/icons/AppleIcon.svg?react';
import SpotlightIcon from '@/assets/icons/SpotlightIcon.svg?react';
import WifiIcon from '@/assets/icons/WifiIcon.svg?react';
import ControlCenterIcon from '@/assets/icons/ControlCenterIcon.svg?react';
import MenuBarItem from './MenuBarItem';
import Clock from './Clock';
import MenuOverlay from './MenuOverlay';
import ControlCenter from './ControlCenter';
import { type MouseEvent } from 'react';
import useOverlay from '@/hooks/useOverlay';
import useAudio from '@/hooks/useAudio';
import MusicSrc from '@/assets/music/sample.mp3';
import Spotlight from '../Spotlight';
import useAppMenu from './useMenu';

const MenuBar = () => {
  const overlay = useOverlay();
  const { togglePlay } = useAudio({ src: MusicSrc });
  const { appTitle, openAppMenu, openSystemMenu } = useAppMenu();

  const handleClickSystemMenu = (event: MouseEvent<HTMLButtonElement>) => {
    event.stopPropagation();
    const rect = event.currentTarget.getBoundingClientRect();
    openSystemMenu({ x: rect.x, y: rect.y + rect.height });
  };

  const handleClickAppMenu = (event: MouseEvent<HTMLButtonElement>) => {
    event.stopPropagation();
    const rect = event.currentTarget.getBoundingClientRect();
    openAppMenu({ x: rect.x, y: rect.y + rect.height });
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
          <MenuBarItem onClick={handleClickSystemMenu}>
            <AppleIcon width={14} height={17} viewBox='0 0 14 17' />
          </MenuBarItem>
          <MenuBarItem onClick={handleClickAppMenu}>
            <span className='font-semibold'>{appTitle}</span>
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
