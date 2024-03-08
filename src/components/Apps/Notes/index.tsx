import SidebarIcon from '@/assets/icons/Notes/Sidebar.svg?react';
import DirectoryIcon from '@/assets/icons/Notes/Directory.svg?react';
import BulletListIcon from '@/assets/icons/Notes/Bullet_List.svg?react';
import TrashCanIcon from '@/assets/icons/Notes/Trash_Can.svg?react';
import NewNoteIcon from '@/assets/icons/Notes/New_Note.svg?react';

const Notes = () => {
  return (
    <div className='flex min-h-full'>
      <div className='flex w-full'>
        <div className='flex w-40 flex-col bg-[#e6e2e6]/95 backdrop-blur-md'>
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
                <li className='flex items-center justify-between rounded-md p-1'>
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
        <div className='flex flex-[5_5_0%] flex-col'>
          <div className='flex h-12 items-center border-b border-black/5 bg-[#f2eff2]'>
            <div className='flex flex-[2_2_0%] justify-between border-r border-black/5'>
              <button className='mx-2 rounded-lg hover:bg-[#e6e3e6]'>
                <div className='px-1'>
                  <BulletListIcon width='28' height='28' viewBox='0 0 28 28' color='#000000' fillOpacity='0.5' />
                </div>
              </button>
              <button className='mx-2 rounded-lg hover:bg-[#e6e3e6]'>
                <div className='px-1'>
                  <TrashCanIcon width='28' height='28' viewBox='0 0 28 28' color='#000000' fillOpacity='0.5' />
                </div>
              </button>
            </div>
            <div className='flex flex-[3_3_0%]'>
              <button className='mx-2 rounded-lg hover:bg-[#e6e3e6]'>
                <div className='px-1'>
                  <NewNoteIcon width='28' height='28' viewBox='0 0 28 28' color='#000000' fillOpacity='0.5' />
                </div>
              </button>
            </div>
          </div>
          <div className='flex grow'>
            <div className='flex-[2_2_0%] border-r border-black/5 bg-white'>MemoList</div>
            <div className='flex-[3_3_0%] bg-white'>NoteContent</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Notes;
