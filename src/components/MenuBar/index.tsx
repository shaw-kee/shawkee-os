import AppleIcon from '@/assets/icons/AppleIcon.svg?react';
import ControlCenterIcon from '@/assets/icons/ControlCenterIcon.svg?react';
import SpotlightIcon from '@/assets/icons/SpotlightIcon.svg?react';
import WifiIcon from '@/assets/icons/WifiIcon.svg?react';
import MenuBarItem from './MenuBarItem';
import Clock from './Clock';
import useToggleMenuList from './useToggleMenuList';
import MenuList from './MenuList';
import useOverlay from '@/hooks/useOverlay';
import Alert from '../Alert';

const DEFAULT_MENUS = ['Menu1', 'Menu2', 'Menu3', 'LongTextMenuLongTextMenuLongTextMenu'];

const MenuBar = () => {
  const { menuListRef, isOpen, menuListPosition, toggleMenuList } = useToggleMenuList();

  const overlay = useOverlay();

  const handleMenuBarItemClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    const rect = event.currentTarget.getBoundingClientRect();
    toggleMenuList(rect);
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
          <MenuBarItem>
            <ControlCenterIcon width={14} height={13} viewBox='0 0 14 13' />
          </MenuBarItem>
          <MenuBarItem onClick={handleMenuBarItemClick}>
            <Clock />
          </MenuBarItem>
        </div>
      </div>
      {isOpen && <MenuList ref={menuListRef} position={menuListPosition} menus={DEFAULT_MENUS} />}
    </>
  );
};

export default MenuBar;
