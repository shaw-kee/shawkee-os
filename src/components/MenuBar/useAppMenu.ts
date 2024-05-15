import { AppStateContext } from '@/store/App/AppContext';
import { WindowApp } from '@/types/app';
import { useContext, useMemo } from 'react';

const useAppMenu = () => {
  const apps = useContext(AppStateContext);

  const focusedApp: WindowApp | null = apps.reduce((previousApp: WindowApp | null, currentApp) => {
    if (currentApp.type === 'window' && currentApp.isOpen) {
      if (previousApp === null) return currentApp;
      if (previousApp.zIndex < currentApp.zIndex) return currentApp;
    }
    return previousApp;
  }, null);

  const appMenus = useMemo(() => {
    if (focusedApp === null) return [];
    return [`Hide ${focusedApp.title}`, `Quit ${focusedApp.title}`];
  }, [focusedApp]);

  const appTitle: 'Finder' | WindowApp['title'] = focusedApp === null ? 'Finder' : focusedApp.title;

  return { appTitle, appMenus };
};

export default useAppMenu;
