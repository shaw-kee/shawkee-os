import SidebarIcon from '@/assets/icons/Notes/Sidebar.svg?react';
import DirectoryIcon from '@/assets/icons/Notes/Directory.svg?react';

const Sidebar = () => {
  return (
    <div className='flex w-40 select-none flex-col bg-[#e6e2e6]/95 backdrop-blur-md'>
      <div className='relative h-12'>
        <div className='absolute right-4 top-[50%] flex translate-y-[-50%] items-center'>
          <button className='rounded-lg hover:bg-[#d9d7da]'>
            <div className='px-1'>
              <SidebarIcon width='28' height='28' viewBox='-4 -6 28 28' color='#000000' fillOpacity='0.5' />
            </div>
          </button>
        </div>
      </div>
      <div className='grow px-2'>
        <span className='pl-1 text-[11px] font-bold text-black/25'>iCloud</span>
        <div className='flex flex-row'>
          <ul className='w-full'>
            <li className='flex items-center justify-between rounded-md bg-[#c7c4c7] p-1'>
              <div className='flex gap-1'>
                <div className='h-5 w-5'>
                  <DirectoryIcon width='20' height='20' viewBox='0 0 28 28' color='#007AFF' />
                </div>
                <span className='text-[13px]'>메모</span>
              </div>
              <span className='text-sm font-bold text-black/25'>4</span>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
