import useOverlay from '@/hooks/useOverlay';
import { AppReducerContext, AppStateContext } from '@/store/App/AppContext';
import { WindowApp } from '@/types/app';
import { useCallback, useContext, useMemo } from 'react';
import MenuOverlay from './MenuOverlay';
import MenuList from './MenuList';
import { Position } from '@/types/position';
import { Menu } from '@/types/menu';
import Alert from '../Alert';
import { SystemReducerContext } from '@/store/System/SystemContext';

const ABOUT_MAC_INFORMATION = [
  { key: 'Chip', value: 'Apple M2 Max' },
  { key: 'Memory', value: '64GB' },
  { key: 'Serial number', value: 'S0H5A1W8K2E4E' },
  { key: 'shawkeeOS', value: '0.0.1' },
];

const useAppMenu = () => {
  const overlay = useOverlay();
  const apps = useContext(AppStateContext);
  const appDispatch = useContext(AppReducerContext);
  const systemDispatch = useContext(SystemReducerContext);

  if (!appDispatch || !systemDispatch) throw new Error('dispatch is null');

  const focusedApp: WindowApp | null = apps.reduce((previousApp: WindowApp | null, currentApp) => {
    if (currentApp.type === 'window' && currentApp.isOpen) {
      if (previousApp === null) return currentApp;
      if (previousApp.zIndex < currentApp.zIndex) return currentApp;
    }
    return previousApp;
  }, null);

  const handleClickQuitMenu = useCallback(() => {
    if (focusedApp) {
      appDispatch({ type: 'CLOSE', id: focusedApp.id });
    }
  }, [appDispatch, focusedApp]);

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
    {
      label: 'About This Mac',
      onClick: () => {
        overlay.open(() => (
          <Alert
            title='MacBook Pro'
            description='Inspired by the macOS'
            appIconUrl='src/assets/icons/Dock/Finder_Icon.png'
          >
            <ul className='mb-4 flex w-56 flex-col items-center gap-0.5'>
              {ABOUT_MAC_INFORMATION.map(({ key, value }) => (
                <li className='flex w-full items-center gap-3' key={key}>
                  <div className='grow basis-0 text-right'>{key}</div>
                  <div className='grow basis-0 text-left'>{value}</div>
                </li>
              ))}
            </ul>
            <Alert.Button fill onClick={overlay.close}>
              Close
            </Alert.Button>
          </Alert>
        ));
      },
    },
    {
      label: 'Log Out shawkee...',
      onClick: () => {
        systemDispatch({ type: 'SET_IS_LOCK_SCREEN', value: true });
      },
    },
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
