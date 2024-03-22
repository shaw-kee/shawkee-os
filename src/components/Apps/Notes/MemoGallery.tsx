import { NoteData } from '@/types/note';
import DirectoryIcon from '@/assets/icons/Notes/Directory.svg?react';
import React from 'react';

interface Props {
  noteData: NoteData;
}

const formatDate = (date: Date) => {
  return `${date.getFullYear()}. ${date.getMonth() + 1}. ${date.getDate()}.`;
};

const MemoGallery = ({ noteData }: Props) => {
  const memoList = Object.entries(noteData)
    .filter(([key]) => key !== 'lastId')
    .sort(([yearA], [yearB]) => Number(yearB) - Number(yearA));

  return (
    <div className='flex w-full flex-col border-r border-black/5 bg-white px-6'>
      {memoList.map(([year, list]) => (
        <React.Fragment key={year}>
          <div className='select-none text-lg font-bold text-black first:mt-4'>{year}년</div>
          <div className='gap mb-8 mt-2 box-content grid auto-rows-[16rem] grid-cols-[repeat(auto-fill,15rem)] justify-between gap-x-4 gap-y-3'>
            {list.map((memo) => (
              <div className={`flex select-none flex-col whitespace-nowrap py-2`} key={memo.id} data-id={memo.id}>
                <div className='grow rounded-[0.7rem] border shadow-md'>
                  <div className={`overflow-hidden text-ellipsis text-lg font-bold`}>{memo.title}</div>
                  <div className={`overflow-hidden text-ellipsis text-sm text-[#969596]`}>{memo.content}</div>
                </div>
                <div className='mt-4 flex flex-col items-center'>
                  <div className={`overflow-hidden text-ellipsis text-[14px]/[18px] font-bold`}>
                    {memo.title === '' ? '새로운 제목' : memo.title}
                  </div>
                  <div className='text-sm font-bold text-[#969596]'>{formatDate(new Date(memo.date))}</div>
                  <div className='flex gap-1'>
                    <div>
                      <DirectoryIcon width='20' height='20' viewBox='0 0 28 28' color='#cacaca' />
                    </div>
                    <span className='text-sm text-[#cacaca]'>메모</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </React.Fragment>
      ))}
    </div>
  );
};

export default MemoGallery;
