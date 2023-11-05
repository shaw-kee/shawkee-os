import MenuBar from './components/MenuBar';
import WallpaperUrl from './assets/wallpaper.jpg';

function App() {
  return (
    <div className='w-full h-screen'>
      <img src={WallpaperUrl} className='absolute w-full h-full object-cover' />
      <MenuBar />
      {/* Desktop */}
      {/* Dock */}
    </div>
  );
}

export default App;
