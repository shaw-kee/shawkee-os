import useCurrentDate from '@/hooks/useCurrentDate';
import { SystemReducerContext } from '@/store/System/SystemContext';
import { AnimatePresence, motion } from 'framer-motion';
import { FormEvent, useContext } from 'react';

const LockScreen = () => {
  const dispatch = useContext(SystemReducerContext);
  if (!dispatch) throw new Error('dispatch is null');
  const { date, time } = useCurrentDate();

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    dispatch({ type: 'SET_IS_LOCK_SCREEN', value: false });
  };

  return (
    <AnimatePresence>
      <motion.div
        key='lockScreen'
        initial={{ opacity: 0.01 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0.01 }}
        className='h-full w-full'
      >
        <form onSubmit={handleSubmit} className='relative flex h-full w-full flex-col items-center justify-between'>
          <div className='mt-24 select-none text-center leading-[1] text-white'>
            <div className='text-[24px] font-semibold'>{date}</div>
            <div className='text-[80px] font-bold'>{time}</div>
          </div>
          <div className='mb-16 flex flex-col items-center gap-6'>
            <div className='w-16 rounded-full bg-white'>
              <img src='/assets/image/Dock/Finder_Icon.png' />
            </div>
            <input
              type='password'
              className='rounded-lg bg-slate-600/90 px-2 py-1 text-sm tracking-wide  text-slate-400 outline-none'
              placeholder='Enter Password'
              autoFocus
            />
          </div>
        </form>
      </motion.div>
    </AnimatePresence>
  );
};

export default LockScreen;
