import { type ReactNode } from 'react';

const ControlCenterItem = ({ alignCenter = false, children }: { alignCenter?: boolean; children: ReactNode }) => {
  return (
    <div
      className={`h-full w-full select-none rounded-md bg-[rgba(0,0,0,0.08)] p-1 shadow-lg ${
        alignCenter && 'flex items-center'
      }`}
    >
      {children}
    </div>
  );
};

export default ControlCenterItem;
