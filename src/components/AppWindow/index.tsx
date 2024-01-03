import { AppReducerContext } from '@/store/App/AppContext';
import { MouseEvent, useContext, useEffect, useRef, useState } from 'react';
import useRND from './useRND';
import { Size } from '@/types/size';
import { Position } from '@/types/position';
import { DOCK_SIZE } from '@/constants/dock';
import ControlBox from './ControlBox';
import usePrevState from '@/hooks/usePrevState';

interface Props {
  title: string;
  id: string;
  initialPosition: Position;
  minSize: Size;
  zIndex: number;
  boundary: Size;
  isMinimize: boolean;
}

const AppWindow = ({ title, id, initialPosition, minSize, zIndex, boundary, isMinimize }: Props) => {
  const dispatch = useContext(AppReducerContext);
  if (!dispatch) throw new Error('dispatch is null');

  const {
    x,
    y,
    width,
    height,
    setSize,
    setPosition,
    handleResizeEast,
    handleResizeNorth,
    handleResizeNorthWest,
    handleResizeNorthEast,
    handleResizeSouth,
    handleResizeSouthEast,
    handleResizeSouthWest,
    handleResizeWest,
    handleDragElement,
  } = useRND(initialPosition, minSize, boundary);
  const [isMaximize, setIsMaximize] = useState<boolean>(false);
  const [tempMinimize, setTempMinimize] = useState<Position & Size>({ x: 0, y: 0, width: 0, height: 0 });
  const [tempMaximize, setTempMaximize] = useState<Position & Size>({ x: 0, y: 0, width: 0, height: 0 });
  const windowRef = useRef<HTMLDivElement>(null);
  const prevState = usePrevState({ isMinimize, isMaximize });

  useEffect(() => {
    if (!windowRef.current) return;
    if (!isMinimize && prevState.isMinimize) {
      windowRef.current.style.transition = 'all 0.5s cubic-bezier(0.4, 0, 0.2, 1)';
      const { x, y, width, height } = tempMinimize;
      setPosition({ x, y });
      setSize({ width, height });
    }
  }, [setPosition, setSize, tempMinimize, isMinimize, prevState]);

  useEffect(() => {
    if (!windowRef.current) return;
    if (!isMaximize && prevState.isMaximize) {
      windowRef.current.style.transition = 'all 0.5s cubic-bezier(0.4, 0, 0.2, 1)';
      const { x, y, width, height } = tempMaximize;
      setPosition({ x, y });
      setSize({ width, height });
    }
  }, [setPosition, setSize, tempMaximize, isMaximize, prevState]);

  const handleClose = () => dispatch({ type: 'CLOSE', id });
  const handleClickWindow = () => dispatch({ type: 'OPEN', id });

  const handleMaximizeWindow = () => {
    if (windowRef.current && !isMaximize) {
      windowRef.current.style.transition = 'all 0.5s cubic-bezier(0.4, 0, 0.2, 1)';
      setTempMaximize({ x, y, width, height });
      setPosition({ x: 0, y: 0 });
      setSize({ width: boundary.width, height: boundary.height });
    }

    setIsMaximize((prev) => !prev);
  };

  const handleMinimizeWindow = (e: MouseEvent) => {
    e.stopPropagation();

    if (windowRef.current) {
      windowRef.current.style.transition = 'all 0.5s cubic-bezier(0.4, 0, 0.2, 1)';
      dispatch({ type: 'MINIMIZE', id });
      setTempMinimize({ x, y, width, height });
      setPosition({ x: boundary.width / 2 - DOCK_SIZE, y: boundary.height - DOCK_SIZE });
      setSize({ width: DOCK_SIZE * 2, height: DOCK_SIZE });
    }
  };

  const handleTransitionEnd = () => {
    if (windowRef.current) windowRef.current.style.transition = 'none';
  };

  return (
    <div
      style={{ width, height, transform: `translate(${x}px, ${y}px)`, zIndex }}
      className={`absolute w-96 flex-col overflow-hidden rounded-md ${isMinimize ? 'invisible opacity-0' : ''} `}
      onMouseDown={handleClickWindow}
      onTransitionEnd={handleTransitionEnd}
      ref={windowRef}
    >
      <div
        className='flex h-7 items-center justify-center bg-[#e4e4e4]'
        onMouseDown={handleDragElement}
        onDoubleClick={handleMaximizeWindow}
      >
        <ControlBox handleClose={handleClose} handleMinimize={handleMinimizeWindow} />
        <span className='select-none font-bold'>{title}</span>
      </div>
      <div className='h-full bg-white'>content</div>
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
    </div>
  );
};

export default AppWindow;
