import { AppReducerContext } from '@/store/App/AppContext';
import { MouseEvent, useContext, useEffect, useRef, useState } from 'react';
import CloseIcon from '@/assets/icons/AppWindow/Close.svg?react';
import MinimizeIcon from '@/assets/icons/AppWindow/Minimize.svg?react';
import FullScreenIcon from '@/assets/icons/AppWindow/FullScreen.svg?react';
import useRND from './useRND';
import { Size } from '@/types/size';
import { Position } from '@/types/position';
import { DOCK_SIZE } from '@/constants/dock';

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
  const [isMaximum, setIsMaximum] = useState<boolean>(false);
  const [temp, setTemp] = useState<Position & Size>({ x: 0, y: 0, width: 0, height: 0 });
  const windowRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const { x, y, width, height } = temp;
    const isInit = width === 0 && height === 0;

    if (!isMinimize && !isMaximum && !isInit) {
      setPosition({ x, y });
      setSize({ width, height });
    }
  }, [isMinimize, temp, setPosition, setSize, isMaximum]);

  const handleClose = () => dispatch({ type: 'CLOSE', id });
  const handleClickWindow = () => {
    if (windowRef.current) {
      windowRef.current.style.transition = 'none';
      dispatch({ type: 'OPEN', id });
    }
  };

  const handleMaximizeWindow = () => {
    if (!isMaximum) {
      setTemp({ x, y, width, height });
      setPosition({ x: 0, y: 0 });
      setSize({ width: boundary.width, height: boundary.height });
    } else {
      const { x, y, width, height } = temp;
      setPosition({ x, y });
      setSize({ width, height });
    }

    setIsMaximum((prev) => !prev);
  };

  const handleMinimizeWindow = (e: MouseEvent) => {
    e.stopPropagation();

    if (windowRef.current) {
      windowRef.current.style.transition = 'all 0.5s cubic-bezier(0.4, 0, 0.2, 1)';
      dispatch({ type: 'MINIMIZE', id });
      setTemp({ x, y, width, height });
      setPosition({ x: boundary.width / 2 - DOCK_SIZE, y: boundary.height - DOCK_SIZE });
      setSize({ width: DOCK_SIZE * 2, height: DOCK_SIZE });
    }
  };

  return (
    <div
      style={{ width, height, transform: `translate(${x}px, ${y}px)`, zIndex }}
      className={`absolute w-96 flex-col overflow-hidden rounded-lg ${isMinimize ? 'invisible opacity-0' : ''} `}
      onMouseDown={handleClickWindow}
      ref={windowRef}
    >
      <div
        className='flex h-7 items-center justify-center bg-[#e4e4e4]'
        onMouseDown={handleDragElement}
        onDoubleClick={handleMaximizeWindow}
      >
        <div className='hidden-wrapper absolute left-2 flex items-center gap-1'>
          <button
            className='flex h-3 w-3 cursor-pointer items-center justify-center rounded-full border-[0.5px] border-[#00000033] bg-[#FF5F57]'
            onClick={handleClose}
          >
            <CloseIcon width={6} height={6} viewBox='0 0 12 12' color='#A21B2B' className='hidden' />
          </button>
          <button
            className='flex h-3 w-3 cursor-pointer items-center justify-center rounded-full border-[0.5px] border-[#00000033] bg-[#FEBC2E]'
            onClick={handleMinimizeWindow}
          >
            <MinimizeIcon width={6} height={6} viewBox='0 0 12 12' color='#96550F' className='hidden' />
          </button>
          <button className='flex h-3 w-3 cursor-pointer items-center justify-center rounded-full border-[0.5px] border-[#00000033] bg-[#28C840]'>
            <FullScreenIcon width={6} height={6} viewBox='0 0 12 12' color='#137006' className='hidden' />
          </button>
        </div>
        <span className='font-bold'>{title}</span>
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
