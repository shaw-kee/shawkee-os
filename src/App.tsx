import MenuBar from './components/MenuBar';
import WallpaperUrl from './assets/wallpaper.jpg';
import Dock from '@/components/Dock';
import AppProvider from '@/store/App/AppProvider';
import WindowWrapper from '@/components/AppWindow/WindowWrapper';
import OverlayProvider from './store/Overlay/OverlayProvider';

function App() {
  return (
    <AppProvider>
      <div className='h-screen w-full'>
        <OverlayProvider>
          <img src={WallpaperUrl} className='absolute h-full w-full object-cover' />
          <MenuBar />
          <WindowWrapper />
          <Dock />
        </OverlayProvider>
      </div>
    </AppProvider>
  );
}

export default App;
