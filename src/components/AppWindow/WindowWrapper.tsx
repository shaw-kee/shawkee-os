import { AppReducerContext, AppStateContext } from '@/store/App/AppContext';
import { useContext, useEffect, useRef, useState } from 'react';
import AppWindow from '@/components/AppWindow';
import { Size } from '@/types/size';
import { WindowApp } from '@/types/app';

const WindowWrapper = () => {
  const dispatch = useContext(AppReducerContext);
  if (!dispatch) throw new Error('dispatch is null');

  const [{ width, height }, setBoundary] = useState<Size>({ width: 0, height: 0 });
  const boundaryRef = useRef<HTMLDivElement>(null);
  const apps = useContext(AppStateContext);

  useEffect(() => {
    const resizeBoundary = () => {
      if (boundaryRef.current) {
        const boundaryRect = boundaryRef.current.getBoundingClientRect();
        setBoundary({ width: boundaryRect.width, height: boundaryRect.height });
      }
    };

    resizeBoundary();
    window.addEventListener('resize', resizeBoundary);

    return () => {
      window.removeEventListener('resize', resizeBoundary);
    };
  }, []);

  return (
    <div className='absolute bottom-0 left-0 right-0 top-[25px]' ref={boundaryRef}>
      {apps
        .filter((app): app is WindowApp => app.type === 'window' && app.isOpen)
        .map(({ id, minWidth, minHeight, title, zIndex, isMinimize, isResizable, content }) => (
          <AppWindow
            title={title}
            key={id}
            id={id}
            minSize={{ width: minWidth, height: minHeight }}
            zIndex={zIndex}
            boundary={{ width, height }}
            isMinimize={isMinimize}
            isResizable={isResizable}
          >
            {content}
          </AppWindow>
        ))}
    </div>
  );
};

export default WindowWrapper;
