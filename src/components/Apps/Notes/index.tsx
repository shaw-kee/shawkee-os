import BulletListIcon from '@/assets/icons/Notes/Bullet_List.svg?react';
import GalleryIcon from '@/assets/icons/Notes/Gallery.svg?react';
import TrashCanIcon from '@/assets/icons/Notes/Trash_Can.svg?react';
import NewNoteIcon from '@/assets/icons/Notes/New_Note.svg?react';
import MemoList from '@/components/Apps/Notes/MemoList';
import NoteContent from '@/components/Apps/Notes/NoteContent';
import Sidebar from '@/components/Apps/Notes/Sidebar';
import { useEffect, useRef, useState } from 'react';
import { getStorage, updateStorage } from '@/utils/storage';
import { NoteData, SelectedMemo } from '@/types/note';
import { removeKey } from '@/utils/key';
import MemoGallery from './MemoGallery';

const defaultSelectedMemo = {
  year: '',
  date: '',
  id: 0,
  title: '',
  content: '',
};

const Notes = () => {
  const [noteData, setNoteData] = useState<NoteData>(getStorage('note', {}));
  const [selectedMemo, setSelectedMemo] = useState<SelectedMemo>(defaultSelectedMemo);
  const [selectedId, setSelectedId] = useState<number>(0);
  const [isGalleryMode, setIsGalleryMode] = useState<boolean>(false);
  const noteIndex = useRef<number>(getStorage('noteIndex', 0));

  useEffect(() => {
    updateStorage('note', noteData);
    updateStorage('noteIndex', noteIndex.current);
  }, [noteData]);

  const createMemo = () => {
    const date = new Date();
    const yearNow = date.getFullYear();
    const nextId = noteIndex.current + 1;
    const newMemo = { id: nextId, title: '', content: '', date: `${date}` };

    if (noteData[yearNow]) {
      const prevNoteData = noteData[yearNow];
      setNoteData({ ...noteData, [yearNow]: [newMemo, ...prevNoteData] });
    } else {
      setNoteData({ ...noteData, [yearNow]: [newMemo] });
    }

    noteIndex.current += 1;
    setSelectedMemo({ year: yearNow.toString(), ...newMemo });
    setSelectedId(0);
  };

  const deleteMemo = () => {
    if (selectedMemo.id === 0) return;

    const targetNoteData = noteData[selectedMemo.year];

    if (targetNoteData.length > 1) {
      const nextNoteData = targetNoteData.filter((memo) => memo.id !== selectedMemo.id);
      setNoteData({ ...noteData, [selectedMemo.year]: nextNoteData });
    } else {
      setNoteData((data) => {
        const keyDeletedData = removeKey(selectedMemo.year, data);
        return { ...keyDeletedData };
      });
    }

    setSelectedMemo(defaultSelectedMemo);
  };

  const handleChange = (id: number, year: string, title: string, content: string) => {
    const date = new Date();
    const yearNow = date.getFullYear();
    const nextMemo = { id, title, content, date: `${date}` };
    const selectedNoteData = noteData[year];
    const currentNoteData = noteData[yearNow];
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

  const handleSelectMemo = (memo: SelectedMemo) => {
    setSelectedMemo(memo);
    setSelectedId(memo.id);
  };

  const initSelectId = () => {
    setSelectedId(0);
  };

  const handleClickBulletList = () => {
    setIsGalleryMode(false);
    setSelectedMemo(defaultSelectedMemo);
    initSelectId();
  };

  const handleClickGallery = () => {
    setIsGalleryMode(true);
    setSelectedMemo(defaultSelectedMemo);
  };

  return (
    <div className='flex min-h-full'>
      <div className='flex w-full'>
        <Sidebar noteData={noteData} />
        <div className='flex flex-[5_5_0%] flex-col'>
          <div className='flex h-12 items-center border-b border-black/5 bg-[#f2eff2]'>
            <div className='flex max-w-xs flex-[2_2_0%] justify-between border-r border-black/5'>
              <div className='flex pl-2'>
                <button className='rounded-lg hover:bg-[#e6e3e6]' onClick={handleClickBulletList}>
                  <div className='px-1'>
                    <BulletListIcon width='28' height='28' viewBox='0 0 28 28' color='#000000' fillOpacity='0.5' />
                  </div>
                </button>
                <button className='rounded-lg hover:bg-[#e6e3e6]' onClick={handleClickGallery}>
                  <div className='px-1'>
                    <GalleryIcon
                      width='28'
                      height='28'
                      viewBox='-6 -6 24 24'
                      fill='none'
                      stroke='black'
                      strokeOpacity='0.5'
                      strokeWidth='1.2'
                    />
                  </div>
                </button>
              </div>
              <button className='mx-2 rounded-lg hover:bg-[#e6e3e6]' onClick={deleteMemo}>
                <div className='px-1'>
                  <TrashCanIcon width='28' height='28' viewBox='0 0 28 28' color='#000000' fillOpacity='0.5' />
                </div>
              </button>
            </div>
            <div className='flex flex-[3_3_0%]'>
              <button className='mx-2 rounded-lg hover:bg-[#e6e3e6]' onClick={createMemo}>
                <div className='px-1'>
                  <NewNoteIcon width='28' height='28' viewBox='0 0 28 28' color='#000000' fillOpacity='0.5' />
                </div>
              </button>
            </div>
          </div>
          <div className='flex grow'>
            {isGalleryMode ? (
              <MemoGallery noteData={noteData} selectedMemo={selectedMemo} handleSelectMemo={handleSelectMemo} />
            ) : (
              <>
                <MemoList
                  noteData={noteData}
                  handleSelectMemo={handleSelectMemo}
                  selectedMemo={selectedMemo}
                  selectedId={selectedId}
                />
                <NoteContent selectedMemo={selectedMemo} handleChange={handleChange} handleClick={initSelectId} />
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Notes;
