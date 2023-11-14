import MenuBar from './components/MenuBar';
import WallpaperUrl from './assets/wallpaper.jpg';
import Dock from '@/components/Dock';

function App() {
  return (
    <div className='h-screen w-full'>
      <img src={WallpaperUrl} className='absolute h-full w-full object-cover' />
      <MenuBar />
      <Dock />
    </div>
  );
}

export default App;
