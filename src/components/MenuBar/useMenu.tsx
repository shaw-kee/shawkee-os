import useOverlay from '@/hooks/useOverlay';
import { AppReducerContext, AppStateContext } from '@/store/App/AppContext';
import { WindowApp } from '@/types/app';
import { useCallback, useContext, useMemo } from 'react';
import MenuOverlay from './MenuOverlay';
import MenuList from './MenuList';
import { Position } from '@/types/position';
import { Menu } from '@/types/menu';

const useAppMenu = () => {
  const overlay = useOverlay();
  const apps = useContext(AppStateContext);
  const dispatch = useContext(AppReducerContext);

  if (!dispatch) throw new Error('dispatch is null');

  const focusedApp: WindowApp | null = apps.reduce((previousApp: WindowApp | null, currentApp) => {
    if (currentApp.type === 'window' && currentApp.isOpen) {
      if (previousApp === null) return currentApp;
      if (previousApp.zIndex < currentApp.zIndex) return currentApp;
    }
    return previousApp;
  }, null);

  const handleClickQuitMenu = useCallback(() => {
    if (focusedApp) {
      dispatch({ type: 'CLOSE', id: focusedApp.id });
    }
  }, [dispatch, focusedApp]);

  const appMenus = useMemo(() => {
    if (focusedApp === null) return [];
    return [{ label: `Quit ${focusedApp.title}`, onClick: handleClickQuitMenu }];
  }, [focusedApp, handleClickQuitMenu]);

  const openAppMenu = ({ x, y }: Position) => {
    if (appTitle === 'Finder') return;
    overlay.open(() => (
      <MenuOverlay initialPosition={{ x, y }} close={overlay.close}>
        <MenuList menus={appMenus} close={overlay.close} />
      </MenuOverlay>
    ));
  };

  const systemMenus: Menu[] = [
    { label: 'About This Mac', onClick: () => {} },
    { label: 'Log Out shawkee', onClick: () => {} },
  ];

  const openSystemMenu = ({ x, y }: Position) => {
    overlay.open(() => (
      <MenuOverlay initialPosition={{ x, y }} close={overlay.close}>
        <MenuList menus={systemMenus} close={overlay.close} />
      </MenuOverlay>
    ));
  };

  const appTitle: 'Finder' | WindowApp['title'] = focusedApp === null ? 'Finder' : focusedApp.title;

  return { appTitle, appMenus, openAppMenu, systemMenus, openSystemMenu };
};

export default useAppMenu;
