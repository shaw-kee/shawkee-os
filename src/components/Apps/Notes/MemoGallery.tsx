import { NoteData, SelectedMemo } from '@/types/note';
import DirectoryIcon from '@/assets/icons/Notes/Directory.svg?react';
import React from 'react';

interface Props {
  noteData: NoteData;
  selectedMemo: SelectedMemo;
  onClick: (memo: SelectedMemo) => void;
  onDoubleClick: () => void;
}

const formatDate = (date: Date) => {
  return `${date.getFullYear()}. ${date.getMonth() + 1}. ${date.getDate()}.`;
};

const MemoGallery = ({ noteData, selectedMemo, onClick, onDoubleClick }: Props) => {
  const memoList = Object.entries(noteData)
    .filter(([key]) => key !== 'lastId')
    .sort(([yearA], [yearB]) => Number(yearB) - Number(yearA));

  return (
    <div className='flex w-full flex-col overflow-y-auto border-r border-black/5 bg-white px-6'>
      {memoList.map(([year, list]) => (
        <React.Fragment key={year}>
          <div className='select-none text-lg font-bold text-black first:mt-4'>{year}년</div>
          <div className='gap mb-8 mt-2 box-content grid auto-rows-[16rem] grid-cols-[repeat(auto-fill,15rem)] justify-between gap-x-4 gap-y-3'>
            {list.map((memo) => (
              <div className='flex select-none flex-col py-2' key={memo.id} data-id={memo.id}>
                <div
                  className={`h-40 overflow-hidden break-all rounded-[0.7rem] shadow-md ${
                    selectedMemo.id === memo.id ? 'border-2 border-[#3477f6] p-[11px]' : 'border p-[12px]'
                  }`}
                  onClick={() => onClick({ year, ...memo })}
                  onDoubleClick={onDoubleClick}
                >
                  <div className='text-md font-bold'>{memo.title}</div>
                  <div className='whitespace-pre-line text-[11px]'>{memo.content}</div>
                </div>
                <div className='mt-4 flex flex-col items-center'>
                  <div className={`w-full overflow-hidden text-ellipsis text-center text-[12px]/[18px] font-bold`}>
                    {memo.title === '' ? '새로운 제목' : memo.title}
                  </div>
                  <div className='text-[11px]/[16px] font-bold text-[#969596]'>{formatDate(new Date(memo.date))}</div>
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
