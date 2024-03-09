import BulletListIcon from '@/assets/icons/Notes/Bullet_List.svg?react';
import TrashCanIcon from '@/assets/icons/Notes/Trash_Can.svg?react';
import NewNoteIcon from '@/assets/icons/Notes/New_Note.svg?react';
import MemoList from '@/components/Apps/Notes/MemoList';
import NoteContent from '@/components/Apps/Notes/NoteContent';
import Sidebar from '@/components/Apps/Notes/Sidebar';

const Notes = () => {
  return (
    <div className='flex min-h-full'>
      <div className='flex w-full'>
        <Sidebar />
        <div className='flex flex-[5_5_0%] flex-col'>
          <div className='flex h-12 items-center border-b border-black/5 bg-[#f2eff2]'>
            <div className='flex max-w-xs flex-[2_2_0%] justify-between border-r border-black/5'>
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
            <MemoList />
            <NoteContent />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Notes;
