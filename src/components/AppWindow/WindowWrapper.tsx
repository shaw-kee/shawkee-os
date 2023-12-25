import { AppReducerContext, AppStateContext } from '@/store/App/AppContext';
import { useContext, useRef } from 'react';
import AppWindow from '@/components/AppWindow';
import ResizableContainer from '@/components/ResizableContainer';

const WindowWrapper = () => {
  const dispatch = useContext(AppReducerContext);
  if (!dispatch) throw new Error('dispatch is null');

  const boundaryRef = useRef<HTMLDivElement>(null);
  const apps = useContext(AppStateContext);
  const appList = apps
    .filter((app) => app.isOpen)
    .map(({ id, initialX, initialY, minWidth, minHeight, zIndex, title }) => (
      <ResizableContainer
        className='absolute w-96 flex-col overflow-hidden rounded-lg'
        key={id}
        initialX={initialX}
        initialY={initialY}
        minWidth={minWidth}
        minHeight={minHeight}
        boundaryRef={boundaryRef}
        style={{ zIndex }}
        onMouseDown={() => dispatch({ type: 'OPEN', id })}
        render={(handleDragElement) => <AppWindow title={title} key={id} id={id} onMouseDown={handleDragElement} />}
      />
    ));

  return (
    <div className='absolute bottom-0 left-0 right-0 top-[25px]' ref={boundaryRef}>
      {appList}
    </div>
  );
};

export default WindowWrapper;
