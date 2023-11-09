import MenuBar from './components/MenuBar';
import WallpaperUrl from './assets/wallpaper.jpg';
import Docs from '@/components/Docs';

function App() {
  return (
    <div className='w-full h-screen'>
      <img src={WallpaperUrl} className='absolute w-full h-full object-cover' />
      <MenuBar />
      <Docs />
    </div>
  );
}

export default App;
