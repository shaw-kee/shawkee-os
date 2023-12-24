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
import { ReactNode, useState } from 'react';
import ControlCenter from './ControlCenter';

const DEFAULT_MENUS = ['Menu1', 'Menu2', 'Menu3', 'LongTextMenuLongTextMenuLongTextMenu'];

const MenuBar = () => {
  const { isOpen, overlayRef, overlayPosition, openMenu } = useToggleMenu();

  const [menuContent, setMenuContent] = useState<ReactNode>(null);

  const overlay = useOverlay();

  const handleMenuBarItemClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    event.stopPropagation();
    const rect = event.currentTarget.getBoundingClientRect();
    openMenu(rect);
    setMenuContent(<MenuList menus={DEFAULT_MENUS} />);
  };

  const handleControlCenterClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    event.stopPropagation();
    const rect = event.currentTarget.getBoundingClientRect();
    openMenu(rect);
    setMenuContent(<ControlCenter />);
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
          <MenuBarItem onClick={handleMenuBarItemClick}>
            <AppleIcon width={14} height={17} viewBox='0 0 14 17' />
          </MenuBarItem>
          <MenuBarItem isAppName onClick={openOverlay}>
            Finder
          </MenuBarItem>
          <MenuBarItem>Menu1</MenuBarItem>
          <MenuBarItem onClick={handleMenuBarItemClick}>Menu2</MenuBarItem>
        </div>
        <div className='flex'>
          <MenuBarItem>
            <WifiIcon width={16} height={11} viewBox='0 0 16 11' />
          </MenuBarItem>
          <MenuBarItem>
            <SpotlightIcon width={14} height={13} viewBox='0 0 14 13' />
          </MenuBarItem>
          <MenuBarItem onClick={handleControlCenterClick}>
            <ControlCenterIcon width={14} height={13} viewBox='0 0 14 13' />
          </MenuBarItem>
          <MenuBarItem onClick={handleMenuBarItemClick}>
            <Clock />
          </MenuBarItem>
        </div>
      </div>
      {isOpen && (
        <MenuOverlay ref={overlayRef} position={overlayPosition}>
          {menuContent}
        </MenuOverlay>
      )}
    </>
  );
};

export default MenuBar;
