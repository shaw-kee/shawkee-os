import BulletListIcon from '@/assets/icons/Notes/Bullet_List.svg?react';
import TrashCanIcon from '@/assets/icons/Notes/Trash_Can.svg?react';
import NewNoteIcon from '@/assets/icons/Notes/New_Note.svg?react';
import MemoList from '@/components/Apps/Notes/MemoList';
import NoteContent from '@/components/Apps/Notes/NoteContent';
import Sidebar from '@/components/Apps/Notes/Sidebar';
import { useEffect, useState } from 'react';
import { getStorage, updateStorage } from '@/utils/storage';
import { MemoType, NoteData, SelectedMemo } from '@/types/note';
import { removeKey } from '@/utils/key';

const defaultSelectedMemo = {
  year: '',
  date: '',
  id: 0,
  title: '',
  content: '',
};

const Notes = () => {
  const [noteData, setNoteData] = useState<NoteData>(getStorage('note', { lastId: 1 }));
  const [selectedMemo, setSelectedMemo] = useState<SelectedMemo>(defaultSelectedMemo);

  useEffect(() => {
    updateStorage('note', noteData);
  }, [noteData]);

  const handleSelectMemo = (memo: SelectedMemo) => {
    setSelectedMemo(memo);
  };

  const handleChange = (id: number, year: string, title: string, content: string) => {
    const date = new Date();
    const yearNow = date.getFullYear();
    const nextMemo = { id, title, content, date: `${yearNow}.${date.getMonth() + 1}.${date.getDate()}` };
    const selectedNoteData = noteData[year] as Array<MemoType>;
    const currentNoteData = noteData[yearNow] as Array<MemoType>;
    const nextData = [nextMemo, ...currentNoteData.filter((memo) => memo.id !== id)];

    if (noteData[year] && selectedNoteData.length > 1) {
      const filteredPrevData = [...selectedNoteData.filter((memo) => memo.id !== id)];

      setNoteData({
        ...noteData,
        [year]: filteredPrevData,
        [yearNow]: nextData,
      });
    } else {
      setNoteData((data) => {
        const keyDeletedData = removeKey(year, data);
        return { ...keyDeletedData, [yearNow]: [...nextData] };
      });
    }
  };

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
            <MemoList noteData={noteData} handleSelectMemo={handleSelectMemo} />
            <NoteContent selectedMemo={selectedMemo} handleChange={handleChange} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Notes;
