import AppleIcon from '@/assets/icons/AppleIcon.svg?react';
import SpotlightIcon from '@/assets/icons/SpotlightIcon.svg?react';
import WifiIcon from '@/assets/icons/WifiIcon.svg?react';
import ControlCenterIcon from '@/assets/icons/ControlCenterIcon.svg?react';
import MenuBarItem from './MenuBarItem';
import Clock from './Clock';
import useToggleMenu from './useToggleMenu';
import MenuList from './MenuList';
import useOverlay from '@/hooks/useOverlay';
import Alert from '../Alert';
import MenuOverlay from './MenuOverlay';
import { useState } from 'react';
import ControlCenter from './ControlCenter';
import useAudio from '@/hooks/useAudio';
import MusicSrc from '@/assets/music/sample.mp3';

type MenuType = 'menu' | 'controlCenter';

const DEFAULT_MENUS = ['Menu1', 'Menu2', 'Menu3', 'LongTextMenuLongTextMenuLongTextMenu'];

const MenuBar = () => {
  const { isOpen, overlayRef, overlayPosition, openMenu } = useToggleMenu();

  const { isPlaying, togglePlay } = useAudio({ src: MusicSrc });

  const [showMenuType, setShowMenuType] = useState<'menu' | 'controlCenter'>('menu');

  const overlay = useOverlay();

  const handleMenuBarItemClick = (event: React.MouseEvent<HTMLButtonElement>, menuType: MenuType) => {
    event.stopPropagation();
    const rect = event.currentTarget.getBoundingClientRect();
    openMenu(rect);
    setShowMenuType(menuType);
  };

  const openOverlay = () => {
    overlay.open(
      <Alert
        appIconUrl='src/assets/icons/Dock/Safari_Icon.png'
        title='Title'
        description='Description text about this alert is shown 
          here, explaining to users what the options 
          underneath are about and what to do.'
      >
        <Alert.Button fill onClick={overlay.close}>
          Close Button
        </Alert.Button>
        <Alert.Button>Dummy Button</Alert.Button>
      </Alert>
    );
  };

  return (
    <>
      <div className='flex w-full justify-between bg-white/50 px-[8px] backdrop-blur-[25px]'>
        <div className='flex'>
          <MenuBarItem onClick={(event) => handleMenuBarItemClick(event, 'menu')}>
            <AppleIcon width={14} height={17} viewBox='0 0 14 17' />
          </MenuBarItem>
          <MenuBarItem isAppName onClick={openOverlay}>
            Finder
          </MenuBarItem>
          <MenuBarItem>Menu1</MenuBarItem>
          <MenuBarItem onClick={(event) => handleMenuBarItemClick(event, 'menu')}>Menu2</MenuBarItem>
        </div>
        <div className='flex'>
          <MenuBarItem>
            <WifiIcon width={16} height={11} viewBox='0 0 16 11' />
          </MenuBarItem>
          <MenuBarItem>
            <SpotlightIcon width={14} height={13} viewBox='0 0 14 13' />
          </MenuBarItem>
          <MenuBarItem onClick={(event) => handleMenuBarItemClick(event, 'controlCenter')}>
            <ControlCenterIcon width={14} height={13} viewBox='0 0 14 13' />
          </MenuBarItem>
          <MenuBarItem onClick={(event) => handleMenuBarItemClick(event, 'menu')}>
            <Clock />
          </MenuBarItem>
        </div>
      </div>
      {isOpen && (
        <MenuOverlay ref={overlayRef} position={overlayPosition}>
          {showMenuType === 'controlCenter' && <ControlCenter isPlayingMusic={isPlaying} togglePlay={togglePlay} />}
          {showMenuType === 'menu' && <MenuList menus={DEFAULT_MENUS} />}
        </MenuOverlay>
      )}
    </>
  );
};

export default MenuBar;
