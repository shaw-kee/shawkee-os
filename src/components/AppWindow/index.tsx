import { AppReducerContext } from '@/store/App/AppContext';
import { useContext } from 'react';

interface Props {
  title: string;
  id: string;
}

const AppWindow = ({ title, id }: Props) => {
  const dispatch = useContext(AppReducerContext);

  if (!dispatch) throw new Error('dispatch is null');

  return (
    <div className='absolute left-[50%] top-[50%] w-96 translate-x-[-50%] translate-y-[-50%] flex-col overflow-hidden rounded-lg'>
      <div className='flex h-7 w-full items-center justify-center bg-[#e4e4e4]'>
        <div className='absolute left-2 flex items-center gap-1'>
          <div
            className='h-3 w-3 cursor-pointer rounded-full border-[0.5px] bg-[#FF5F57]'
            onClick={() => dispatch({ type: 'CLOSE', id })}
          />
          <div className='h-3 w-3 cursor-pointer rounded-full border-[0.5px] bg-[#FEBC2E]' />
          <div className='h-3 w-3 cursor-pointer rounded-full border-[0.5px] bg-[#28C840]' />
        </div>
        <span className='font-bold'>{title}</span>
      </div>
      <div className='h-28 bg-white'>content</div>
    </div>
  );
};

export default AppWindow;
