import { AppReducerContext } from '@/store/App/AppContext';
import { useContext } from 'react';
import CloseIcon from '@/assets/icons/AppWindow/Close.svg?react';
import MinimizeIcon from '@/assets/icons/AppWindow/Minimize.svg?react';
import FullScreenIcon from '@/assets/icons/AppWindow/FullScreen.svg?react';

interface Props {
  title: string;
  id: string;
  onMouseDown: (downEvent: React.MouseEvent<Element, MouseEvent>) => void;
}

const AppWindow = ({ title, id, onMouseDown }: Props) => {
  const dispatch = useContext(AppReducerContext);
  if (!dispatch) throw new Error('dispatch is null');

  const handleClose = () => dispatch({ type: 'CLOSE', id });

  return (
    <>
      <div className='flex h-7 w-full items-center justify-center bg-[#e4e4e4]' onMouseDown={onMouseDown}>
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
      <div className='h-full bg-white'>content</div>
    </>
  );
};

export default AppWindow;
