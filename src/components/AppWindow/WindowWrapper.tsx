import { AppReducerContext, AppStateContext } from '@/store/App/AppContext';
import { useContext, useEffect, useRef, useState } from 'react';
import AppWindow from '@/components/AppWindow';

const WindowWrapper = () => {
  const dispatch = useContext(AppReducerContext);
  if (!dispatch) throw new Error('dispatch is null');

  const [{ boundaryWidth, boundaryHeight }, setBoundary] = useState({ boundaryWidth: 0, boundaryHeight: 0 });
  const boundaryRef = useRef<HTMLDivElement>(null);
  const apps = useContext(AppStateContext);

  useEffect(() => {
    if (boundaryRef.current) {
      const boundaryRect = boundaryRef.current.getBoundingClientRect();
      setBoundary({ boundaryWidth: boundaryRect.width, boundaryHeight: boundaryRect.height });
    }
  }, []);

  const appList = apps
    .filter((app) => app.isOpen)
    .map(({ id, initialX, initialY, minWidth, minHeight, title, zIndex }) => (
      <AppWindow
        title={title}
        key={id}
        id={id}
        initialX={initialX}
        initialY={initialY}
        minWidth={minWidth}
        minHeight={minHeight}
        zIndex={zIndex}
        boundary={{ width: boundaryWidth, height: boundaryHeight }}
      />
    ));

  return (
    <div className='absolute bottom-0 left-0 right-0 top-[25px]' ref={boundaryRef}>
      {appList}
    </div>
  );
};

export default WindowWrapper;
