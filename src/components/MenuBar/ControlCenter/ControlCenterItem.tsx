import { type ReactNode } from 'react';

const ControlCenterItem = ({ children }: { children: ReactNode }) => {
  return (
    <div className='flex h-full w-full select-none flex-col justify-center rounded-md bg-[rgba(0,0,0,0.08)] p-1 shadow-lg'>
      {children}
    </div>
  );
};

export default ControlCenterItem;
