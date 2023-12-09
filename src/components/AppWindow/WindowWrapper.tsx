import { AppStateContext } from '@/store/App/AppContext';
import { useContext, useRef } from 'react';
import AppWindow from '@/components/AppWindow';
import ResizableContainer from '@/components/ResizableContainer';

const WindowWrapper = () => {
  const boundaryRef = useRef<HTMLDivElement>(null);
  const apps = useContext(AppStateContext);
  const appList = apps
    .filter((app) => app.isOpen)
    .map((app) => (
      <ResizableContainer
        className='absolute w-96 flex-col overflow-hidden rounded-lg'
        key={app.id}
        initialX={app.initialX}
        initialY={app.initialY}
        boundaryRef={boundaryRef}
        render={(handleDragElement) => (
          <AppWindow title={app.title} key={app.id} id={app.id} onMouseDown={handleDragElement} />
        )}
      />
    ));

  return (
    <div className='absolute bottom-0 left-0 right-0 top-[25px] z-30' ref={boundaryRef}>
      {appList}
    </div>
  );
};

export default WindowWrapper;
