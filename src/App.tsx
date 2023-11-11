import MenuBar from './components/MenuBar';
import WallpaperUrl from './assets/wallpaper.jpg';
import Dock from '@/components/Dock';

function App() {
  return (
    <div className='w-full h-screen'>
      <img src={WallpaperUrl} className='absolute w-full h-full object-cover' />
      <MenuBar />
      <Dock />
    </div>
  );
}

export default App;
