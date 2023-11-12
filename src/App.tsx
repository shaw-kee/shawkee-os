import MenuBar from './components/MenuBar';
import WallpaperUrl from './assets/wallpaper.jpg';

function App() {
  return (
    <div className='h-screen w-full'>
      <img src={WallpaperUrl} className='absolute h-full w-full object-cover' />
      <MenuBar />
      {/* Desktop */}
      {/* Dock */}
    </div>
  );
}

export default App;
