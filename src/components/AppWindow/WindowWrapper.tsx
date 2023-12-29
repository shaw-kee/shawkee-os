import { AppReducerContext, AppStateContext } from '@/store/App/AppContext';
import { useContext, useEffect, useRef, useState } from 'react';
import AppWindow from '@/components/AppWindow';
import { Size } from '@/types/size';

const WindowWrapper = () => {
  const dispatch = useContext(AppReducerContext);
  if (!dispatch) throw new Error('dispatch is null');

  const [{ width, height }, setBoundary] = useState<Size>({ width: 0, height: 0 });
  const boundaryRef = useRef<HTMLDivElement>(null);
  const apps = useContext(AppStateContext);

  useEffect(() => {
    if (boundaryRef.current) {
      const boundaryRect = boundaryRef.current.getBoundingClientRect();
      setBoundary({ width: boundaryRect.width, height: boundaryRect.height });
    }
  }, []);

  const appList = apps
    .filter((app) => app.isOpen)
    .map(({ id, initialX, initialY, minWidth, minHeight, title, zIndex }) => (
      <AppWindow
        title={title}
        key={id}
        id={id}
        initialPosition={{ x: initialX, y: initialY }}
        minSize={{ width: minWidth, height: minHeight }}
        zIndex={zIndex}
        boundary={{ width, height }}
      />
    ));

  return (
    <div className='absolute bottom-0 left-0 right-0 top-[25px]' ref={boundaryRef}>
      {appList}
    </div>
  );
};

export default WindowWrapper;
