import { ReactNode } from 'react';
import AppleIcon from './icons/AppleIcon';
import ControlCenterIcon from './icons/ControlCenterIcon';
import SpotlightIcon from './icons/SpotlightIcon';
import WifiIcon from './icons/WifiIcon';
import useCurrentDate from './useCurrentDate';

const MenuBar = () => {
  return (
    <div className='w-full bg-white/50 backdrop-blur-[25px] flex justify-between pl-[4px] pr-[8px]'>
      <div className='flex gap-[-4px]'>
        <MenuItem>
          <AppleIcon width={14} height={17} viewBox='0 0 14 17' />
        </MenuItem>
        <MenuItem isAppName>Finder</MenuItem>
        <MenuItem>Menu1</MenuItem>
        <MenuItem>Menu2</MenuItem>
      </div>
      <div className='flex gap-[-4px]'>
        <MenuItem>
          <WifiIcon width={16} height={11} viewBox='0 0 16 11' />
        </MenuItem>
        <MenuItem>
          <SpotlightIcon width={14} height={13} viewBox='0 0 14 13' />
        </MenuItem>
        <MenuItem>
          <ControlCenterIcon width={14} height={13} viewBox='0 0 14 13' />
        </MenuItem>
        <MenuItem>
          <Clock />
        </MenuItem>
      </div>
    </div>
  );
};

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

const Clock = () => {
  const { date } = useCurrentDate();
  return <div className='whitespace-pre'>{date}</div>;
};

export default MenuBar;
