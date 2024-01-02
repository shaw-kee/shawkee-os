import CloseIcon from '@/assets/icons/AppWindow/Close.svg?react';
import MinimizeIcon from '@/assets/icons/AppWindow/Minimize.svg?react';
import FullScreenIcon from '@/assets/icons/AppWindow/FullScreen.svg?react';
import { MouseEvent } from 'react';

interface Props {
  handleClose: () => void;
  handleMinimize: (e: MouseEvent) => void;
}

const ControlBox = ({ handleClose, handleMinimize }: Props) => {
  return (
    <div className='hidden-wrapper absolute left-2 flex items-center gap-1'>
      <button
        className='flex h-3 w-3 cursor-pointer items-center justify-center rounded-full border-[0.5px] border-[#00000033] bg-[#FF5F57]'
        onClick={handleClose}
      >
        <CloseIcon width={6} height={6} viewBox='0 0 12 12' color='#A21B2B' className='hidden' />
      </button>
      <button
        className='flex h-3 w-3 cursor-pointer items-center justify-center 
          rounded-full border-[0.5px] border-[#00000033] bg-[#FEBC2E]'
        onClick={handleMinimize}
      >
        <MinimizeIcon width={6} height={6} viewBox='0 0 12 12' color='#96550F' className='hidden' />
      </button>
      <button className='flex h-3 w-3 cursor-pointer items-center justify-center rounded-full border-[0.5px] border-[#00000033] bg-[#28C840]'>
        <FullScreenIcon width={6} height={6} viewBox='0 0 12 12' color='#137006' className='hidden' />
      </button>
    </div>
  );
};

export default ControlBox;
