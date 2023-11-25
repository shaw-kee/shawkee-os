import MenuBar from './components/MenuBar';
import WallpaperUrl from './assets/wallpaper.jpg';
import Dock from '@/components/Dock';
import AppProvider from '@/store/App/AppProvider';
import WindowWrapper from '@/components/WindowWrapper';

function App() {
  return (
    <AppProvider>
      <div className='h-screen w-full'>
        <img src={WallpaperUrl} className='absolute h-full w-full object-cover' />
        <MenuBar />
        <WindowWrapper />
        <Dock />
      </div>
    </AppProvider>
  );
}

export default App;
