import { AppReducerContext } from '@/store/App/AppContext';
import { useContext } from 'react';

interface Props {
  title: string;
  id: string;
}

const AppWindow = ({ title, id }: Props) => {
  const dispatch = useContext(AppReducerContext);

  if (!dispatch) throw new Error('dispatch is null');

  const handleClose = () => dispatch({ type: 'CLOSE', id });

  return (
    <div className='absolute left-[50%] top-[50%] w-96 translate-x-[-50%] translate-y-[-50%] flex-col overflow-hidden rounded-lg'>
      <div className='flex h-7 w-full items-center justify-center bg-[#e4e4e4]'>
        <div className='absolute left-2 flex items-center gap-1'>
          <div
            className='h-3 w-3 cursor-pointer rounded-full border-[0.5px] border-[#00000033] bg-[#FF5F57]'
            onClick={handleClose}
          />
          <div className='h-3 w-3 cursor-pointer rounded-full border-[0.5px] border-[#00000033] bg-[#FEBC2E]' />
          <div className='h-3 w-3 cursor-pointer rounded-full border-[0.5px] border-[#00000033] bg-[#28C840]' />
        </div>
        <span className='font-bold'>{title}</span>
      </div>
      <div className='h-28 bg-white'>content</div>
    </div>
  );
};

export default AppWindow;
