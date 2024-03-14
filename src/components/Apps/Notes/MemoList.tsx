import { MemoType, NoteData, SelectedMemo } from '@/types/note';
import React from 'react';

interface Props {
  noteData: NoteData;
  selectedMemo: SelectedMemo;
  selectedId: number;
  handleSelectMemo: (memo: SelectedMemo) => void;
}

const formatDate = (date: Date) => {
  return `${date.getFullYear()}. ${date.getMonth() + 1}. ${date.getDate()}.`;
};

const MemoList = ({ noteData, handleSelectMemo, selectedMemo, selectedId }: Props) => {
  const memoList = Object.entries(noteData)
    .filter(([key]) => key !== 'lastId')
    .sort(([yearA], [yearB]) => Number(yearB) - Number(yearA));

  return (
    <div className='flex w-80 flex-col border-r border-black/5 bg-white'>
      {memoList.map(([year, list]) => (
        <React.Fragment key={year}>
          <div className='pl-4 text-sm font-bold text-black/60 first:border-b first:border-black/5 first:py-2'>
            {year}년
          </div>
          <div className='mb-8 mt-2 flex flex-col gap-1 px-2'>
            {(list as Array<MemoType>).map((memo) => (
              <div
                className={`flex select-none flex-col whitespace-nowrap rounded-[4px] px-4 py-2 ${
                  selectedId === memo.id ? 'bg-[#3477f6] text-white' : ''
                } ${selectedMemo.id === memo.id ? 'bg-[#d6d4d6]' : ''}`}
                key={memo.id}
                onClick={() => handleSelectMemo({ year, ...memo })}
                data-id={memo.id}
              >
                <div className={`overflow-hidden text-ellipsis text-[12px]/[14px] font-bold`}>
                  {memo.title === '' ? '새로운 제목' : memo.title}
                </div>
                <div className='flex gap-2'>
                  <div className='text-[11px]'>{`${formatDate(new Date(memo.date))}`}</div>
                  <div
                    className={`overflow-hidden text-ellipsis text-[11px] text-[#969596] ${
                      selectedId === memo.id ? 'text-[#d4d3d3]' : ''
                    }`}
                  >
                    {memo.content === '' ? '추가 컨텐츠 없음' : memo.content}
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

export default MemoList;
