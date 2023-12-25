import MenuBar from './components/MenuBar';
import WallpaperUrl from './assets/wallpaper.jpg';
import Dock from '@/components/Dock';
import AppProvider from '@/store/App/AppProvider';
import WindowWrapper from '@/components/AppWindow/WindowWrapper';
import OverlayProvider from './store/Overlay/OverlayProvider';
import SystemProvider from './store/System/SystemProvider';
import { useContext } from 'react';
import { SystemStateContext } from './store/System/SystemContext';

function App() {
  return (
    <SystemProvider>
      <AppProvider>
        <OverlayProvider>
          <Desktop />
        </OverlayProvider>
      </AppProvider>
    </SystemProvider>
  );
}

const Desktop = () => {
  const { brightness } = useContext(SystemStateContext);
  return (
    <div
      className='h-screen w-full'
      style={{
        filter: `brightness(${brightness}%)`,
      }}
    >
      <img src={WallpaperUrl} className='absolute h-full w-full object-cover' />
      <MenuBar />
      <WindowWrapper />
      <Dock />
    </div>
  );
};

export default App;
