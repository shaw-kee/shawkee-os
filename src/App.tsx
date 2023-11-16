import MenuBar from './components/MenuBar';
import WallpaperUrl from './assets/wallpaper.jpg';
import Dock from '@/components/Dock';
import AppProvider from '@/store/App/AppProvider';

function App() {
  return (
    <AppProvider>
      <div className='h-screen w-full'>
        <img src={WallpaperUrl} className='absolute h-full w-full object-cover' />
        <MenuBar />
        <Dock />
      </div>
    </AppProvider>
  );
}

export default App;
