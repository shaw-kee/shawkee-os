import { AppReducerContext } from '@/store/App/AppContext';
import { PropsWithChildren, useContext, useEffect, useState } from 'react';
import useRND from './useRND';
import { Size } from '@/types/size';
import { Position } from '@/types/position';
import { DOCK_SIZE } from '@/constants/dock';
import ControlBox from './ControlBox';
import usePrevState from '@/hooks/usePrevState';
import { APP_WINDOW_TRANSITION } from '@/constants/app';
import usePrevSize from './usePrevSize';

const MENUBAR_HEIGHT = 25;
interface Props {
  title: string;
  id: string;
  initialPosition: Position;
  minSize: Size;
  zIndex: number;
  boundary: Size;
  isMinimize: boolean;
  isResizable: boolean;
}

const AppWindow = ({
  title,
  id,
  initialPosition,
  minSize,
  zIndex,
  boundary,
  isMinimize,
  isResizable,
  children,
}: Props & PropsWithChildren) => {
  const dispatch = useContext(AppReducerContext);
  if (!dispatch) throw new Error('dispatch is null');

  const {
    x,
    y,
    width,
    height,
    setResize,
    handleResizeEast,
    handleResizeNorth,
    handleResizeNorthWest,
    handleResizeNorthEast,
    handleResizeSouth,
    handleResizeSouthEast,
    handleResizeSouthWest,
    handleResizeWest,
    handleDragElement,
    ref: windowRef,
  } = useRND(initialPosition, minSize, boundary);
  const {
    isResize: isMaximize,
    setIsResize: setIsMaximize,
    setPrevSize: setTempMaximize,
    prevState: maximizePrevState,
  } = usePrevSize(setResize);
  const {
    isResize: isFullscreen,
    setIsResize: setIsFullscreen,
    setPrevSize: setTempFullscreen,
    prevState: fullscreenPrevState,
  } = usePrevSize(setResize);
  const [tempMinimize, setTempMinimize] = useState<Position & Size>({ x: 0, y: 0, width: 0, height: 0 });
  const minimizePrevState = usePrevState(isMinimize);

  useEffect(() => {
    if (!isMinimize && minimizePrevState) {
      const { x, y, width, height } = tempMinimize;
      setResize({ x, y, width, height });
    }
  }, [setResize, tempMinimize, isMinimize, isMaximize, minimizePrevState, isFullscreen]);

  useEffect(() => {
    if (!windowRef.current) return;

    const resize = isMinimize || isMaximize || isFullscreen;
    const restoreResize =
      (!isMinimize && minimizePrevState) ||
      (!isMaximize && maximizePrevState) ||
      (!isFullscreen && fullscreenPrevState);

    if (resize || restoreResize) windowRef.current.style.transition = APP_WINDOW_TRANSITION;
  });

  const handleClose = () => dispatch({ type: 'CLOSE', id });
  const handleClickWindow = () => dispatch({ type: 'OPEN', id });

  const handleMaximizeWindow = () => {
    if (!isMaximize) {
      setTempMaximize({ x, y, width, height });
      setResize({ x: 0, y: 0, width: boundary.width, height: boundary.height });
    }

    setIsMaximize((prev) => !prev);
  };

  const handleMinimizeWindow = () => {
    if (windowRef.current) {
      dispatch({ type: 'MINIMIZE', id });
      setTempMinimize({ x, y, width, height });
      setResize({
        x: boundary.width / 2 - DOCK_SIZE,
        y: boundary.height - DOCK_SIZE,
        width: DOCK_SIZE * 2,
        height: DOCK_SIZE,
      });
    }
  };

  const handleKeyDown = (event: KeyboardEvent) => {
    if (event.key === 'Escape') {
      setIsFullscreen(false);
      document.removeEventListener('keydown', handleKeyDown);
    }
  };

  const handleFullscreen = () => {
    if (!isFullscreen) {
      setTempFullscreen({ x, y, width, height });
      setResize({ x: 0, y: -MENUBAR_HEIGHT, width: boundary.width, height: boundary.height + MENUBAR_HEIGHT });
      document.addEventListener('keydown', handleKeyDown);
    }

    setIsFullscreen((prev) => !prev);
  };

  const handleTransitionEnd = () => {
    if (windowRef.current) windowRef.current.style.transition = 'none';
  };

  return (
    <div
      style={{ width, height, zIndex, transform: `translate(${x}px, ${y}px)` }}
      className={`absolute flex flex-col overflow-hidden ${isFullscreen ? '' : 'rounded-md'} ${
        isMinimize ? 'invisible opacity-0' : ''
      } `}
      onMouseDown={handleClickWindow}
      onTransitionEnd={handleTransitionEnd}
      ref={windowRef}
    >
      <div
        className={`z-50 flex items-center justify-center bg-[#e5e7eb] ${
          isFullscreen ? 'absolute inset-x-0 h-3 opacity-0 hover:static hover:h-7 hover:opacity-100' : 'min-h-[1.75rem]'
        }`}
        onMouseDown={isFullscreen ? undefined : handleDragElement}
        onDoubleClick={isFullscreen ? undefined : handleMaximizeWindow}
      >
        <ControlBox
          handleClose={handleClose}
          handleMinimize={handleMinimizeWindow}
          handleFullscreen={handleFullscreen}
          isFullscreen={isFullscreen}
        />
        <span className='select-none font-bold'>{title}</span>
      </div>
      <div className='grow overflow-hidden'>{children}</div>
      {!isFullscreen && isResizable && (
        <>
          <div className='absolute left-2 right-2 top-0 h-1 cursor-row-resize' onMouseDown={handleResizeNorth} />
          <div className='absolute bottom-0 left-2 right-2 h-1 cursor-row-resize' onMouseDown={handleResizeSouth} />
          <div className='absolute bottom-2 left-0 top-2 w-1 cursor-col-resize' onMouseDown={handleResizeWest} />
          <div className='absolute bottom-2 right-0 top-2 w-1 cursor-col-resize' onMouseDown={handleResizeEast} />
          <div
            className='absolute left-0 top-0 h-4 w-4 translate-x-[-50%] translate-y-[-50%] cursor-nw-resize'
            onMouseDown={handleResizeNorthWest}
          />
          <div
            className='absolute right-0 top-0 h-4 w-4 translate-x-[50%] translate-y-[-50%] cursor-ne-resize'
            onMouseDown={handleResizeNorthEast}
          />
          <div
            className='absolute bottom-0 left-0 h-4 w-4 translate-x-[-50%] translate-y-[50%] cursor-sw-resize'
            onMouseDown={handleResizeSouthWest}
          />
          <div
            className='absolute bottom-0 right-0 h-4 w-4 translate-x-[50%] translate-y-[50%] cursor-se-resize'
            onMouseDown={handleResizeSouthEast}
          />
        </>
      )}
    </div>
  );
};

export default AppWindow;
