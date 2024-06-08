import MenuBar from './components/MenuBar';
import Dock from '@/components/Dock';
import AppProvider from '@/store/App/AppProvider';
import WindowWrapper from '@/components/AppWindow/WindowWrapper';
import OverlayProvider from './store/Overlay/OverlayProvider';
import SystemProvider from './store/System/SystemProvider';
import React, { useContext } from 'react';
import { SystemStateContext } from './store/System/SystemContext';
import useWindowResize from './hooks/useWindowResize';
import LockScreen from './components/LockScreen';
import { motion, AnimatePresence } from 'framer-motion';

function App() {
  return (
    <SystemProvider>
      <AppProvider>
        <ResponsiveScreen />
      </AppProvider>
    </SystemProvider>
  );
}

const ResponsiveScreen = () => {
  const isAvailableWindowSize = useWindowResize();
  return isAvailableWindowSize ? <Desktop /> : <Mobile />;
};

const Desktop = () => {
  const { brightness, isLockScreen } = useContext(SystemStateContext);
  return (
    <div
      className='h-screen w-full'
      style={{
        filter: `brightness(${brightness}%)`,
      }}
    >
      <OverlayProvider>
        <AnimatePresence>
          <img src='/assets/wallpaper.jpg' className='absolute h-full w-full object-cover' />
          {isLockScreen ? (
            <motion.div
              key='lockScreen'
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className='h-full w-full'
            >
              <LockScreen />
            </motion.div>
          ) : (
            <React.Fragment key='lockScreen'>
              <MenuBar />
              <WindowWrapper />
              <Dock />
            </React.Fragment>
          )}
        </AnimatePresence>
      </OverlayProvider>
    </div>
  );
};

const Mobile = () => {
  return (
    <div className='flex h-screen w-full flex-col items-center justify-center gap-2 break-keep bg-slate-700 px-2 text-center text-slate-100'>
      <h1 className='text-[2rem] font-semibold'>앱이 지원하지 않는 스크린 사이즈입니다.</h1>
      <p className='text-[1rem]'>최소 넓이: 1024px, 최소 높이: 768px</p>
    </div>
  );
};

export default App;
