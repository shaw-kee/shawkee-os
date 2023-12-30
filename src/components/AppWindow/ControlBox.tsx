import CloseIcon from '@/assets/icons/AppWindow/Close.svg?react';
import MinimizeIcon from '@/assets/icons/AppWindow/Minimize.svg?react';
import FullScreenIcon from '@/assets/icons/AppWindow/FullScreen.svg?react';
import ExitMaximizeIcon from '@/assets/icons/AppWindow/ExitMaximize.svg?react';
import { MouseEvent } from 'react';

interface Props {
  isMaximize: boolean;
  handleClose: () => void;
  handleMinimize: (e: MouseEvent) => void;
  handleMaximize: () => void;
}

const ControlBox = ({ isMaximize, handleClose, handleMinimize, handleMaximize }: Props) => {
  return (
    <div className='hidden-wrapper absolute left-2 flex items-center gap-1'>
      <button
        className='flex h-3 w-3 cursor-pointer items-center justify-center rounded-full border-[0.5px] border-[#00000033] bg-[#FF5F57]'
        onClick={handleClose}
      >
        <CloseIcon width={6} height={6} viewBox='0 0 12 12' color='#A21B2B' className='hidden' />
      </button>
      <button
        className={`flex h-3 w-3 items-center justify-center rounded-full ${
          isMaximize ? 'bg-gray-400' : 'cursor-pointer border-[0.5px] border-[#00000033] bg-[#FEBC2E]'
        }`}
        onClick={handleMinimize}
        disabled={isMaximize}
      >
        <MinimizeIcon
          width={6}
          height={6}
          viewBox='0 0 12 12'
          color='#96550F'
          className={`hidden ${isMaximize ? 'invisible' : ''}`}
        />
      </button>
      <button className='flex h-3 w-3 cursor-pointer items-center justify-center rounded-full border-[0.5px] border-[#00000033] bg-[#28C840]'>
        {isMaximize ? (
          <ExitMaximizeIcon
            width={19}
            height={19}
            viewBox='0 0 19 19'
            color='#137006'
            className='hidden'
            onClick={handleMaximize}
          />
        ) : (
          <FullScreenIcon width={6} height={6} viewBox='0 0 12 12' color='#137006' className='hidden' />
        )}
      </button>
    </div>
  );
};

export default ControlBox;
