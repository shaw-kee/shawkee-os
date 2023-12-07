import { AppReducerContext } from '@/store/App/AppContext';
import { RefObject, useContext, useRef, useState } from 'react';
import CloseIcon from '@/assets/icons/AppWindow/Close.svg?react';
import MinimizeIcon from '@/assets/icons/AppWindow/Minimize.svg?react';
import FullScreenIcon from '@/assets/icons/AppWindow/FullScreen.svg?react';

interface Props {
  title: string;
  id: string;
  container: RefObject<HTMLDivElement>;
}

const AppWindow = ({ title, id, container }: Props) => {
  const dispatch = useContext(AppReducerContext);
  if (!dispatch) throw new Error('dispatch is null');

  const [{ x, y }, setPosition] = useState({ x: 0, y: 0 });
  const appWindowRef = useRef<HTMLDivElement>(null);

  const handleClose = () => dispatch({ type: 'CLOSE', id });

  const getPosition = (range: number, min: number, max: number) => {
    if (range < min) return min;
    if (range > max) return max;
    return range;
  };

  const handleMouseDown = (downEvent: React.MouseEvent) => {
    const handleMouseMove = (moveEvent: MouseEvent) => {
      moveEvent.preventDefault();
      const [moveX, moveY] = [moveEvent.clientX - downEvent.clientX, moveEvent.clientY - downEvent.clientY];

      if (container.current && appWindowRef.current) {
        const containerRect = container.current.getBoundingClientRect();
        const appWindowRect = appWindowRef.current.getBoundingClientRect();
        const calculatedX = getPosition(x + moveX, 0, containerRect.width - appWindowRect.width);
        const calculatedY = getPosition(y + moveY, 0, containerRect.height - appWindowRect.height);
        setPosition({ x: calculatedX, y: calculatedY });
      }
    };

    const handleMouseUp = () => {
      document.removeEventListener('mousemove', handleMouseMove);
    };

    document.addEventListener('mousemove', handleMouseMove);
    document.addEventListener('mouseup', handleMouseUp, { once: true });
  };

  return (
    <div
      className='absolute w-96 flex-col overflow-hidden rounded-lg'
      style={{ transform: `translate(${x}px, ${y}px)` }}
      ref={appWindowRef}
    >
      <div className='flex h-7 w-full items-center justify-center bg-[#e4e4e4]' onMouseDown={handleMouseDown}>
        <div className='hidden-wrapper absolute left-2 flex items-center gap-1'>
          <button
            className='flex h-3 w-3 cursor-pointer items-center justify-center rounded-full border-[0.5px] border-[#00000033] bg-[#FF5F57]'
            onClick={handleClose}
          >
            <CloseIcon width={6} height={6} viewBox='0 0 12 12' color='#A21B2B' className='hidden' />
          </button>
          <button className='flex h-3 w-3 cursor-pointer items-center justify-center rounded-full border-[0.5px] border-[#00000033] bg-[#FEBC2E]'>
            <MinimizeIcon width={6} height={6} viewBox='0 0 12 12' color='#96550F' className='hidden' />
          </button>
          <button className='flex h-3 w-3 cursor-pointer items-center justify-center rounded-full border-[0.5px] border-[#00000033] bg-[#28C840]'>
            <FullScreenIcon width={6} height={6} viewBox='0 0 12 12' color='#137006' className='hidden' />
          </button>
        </div>
        <span className='font-bold'>{title}</span>
      </div>
      <div className='h-28 bg-white'>content</div>
    </div>
  );
};

export default AppWindow;
