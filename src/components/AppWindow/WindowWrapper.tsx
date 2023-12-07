import { AppStateContext } from '@/store/App/AppContext';
import { useContext, useRef } from 'react';
import AppWindow from '@/components/AppWindow';

const WindowWrapper = () => {
  const elementRef = useRef<HTMLDivElement>(null);
  const apps = useContext(AppStateContext);
  const appList = apps
    .filter((app) => app.isOpen)
    .map((app) => (
      <AppWindow
        title={app.title}
        key={app.id}
        id={app.id}
        container={elementRef}
        initialX={app.initialX}
        initialY={app.initialY}
      />
    ));

  return (
    <div className='absolute bottom-0 left-0 right-0 top-[25px] z-30' ref={elementRef}>
      {appList}
    </div>
  );
};

export default WindowWrapper;
