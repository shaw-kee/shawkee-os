import type { ReactNode } from 'react';

const MenuItem = ({ isAppName = false, children }: { isAppName?: boolean; children: ReactNode }) => {
  const fontWeightClass = isAppName ? 'font-bold' : 'font-base';
  return (
    <button
      type='button'
      className={`text-[13px] leading-[16px] text rounded-[4px] px-[11px] py-[4px] active:bg-[#090909]/10 cursor-default ${fontWeightClass}`}
    >
      {children}
    </button>
  );
};

export default MenuItem;
