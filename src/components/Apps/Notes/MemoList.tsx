import { MemoType, NoteData } from '@/types/note';

interface Props {
  noteData: NoteData;
}

const MemoList = ({ noteData }: Props) => {
  const memoList = Object.entries(noteData)
    .filter(([key]) => key !== 'lastId')
    .sort(([yearA], [yearB]) => Number(yearB) - Number(yearA));

  return (
    <div className='flex w-80 flex-col border-r border-black/5 bg-white'>
      {memoList.map(([year, list]) => (
        <>
          <div className='pl-4 text-sm font-bold text-black/60 first:border-b first:border-black/5 first:py-2'>
            {year}
          </div>
          <div className='mb-8 mt-2 flex flex-col gap-1 px-2'>
            {(list as Array<MemoType>).map((memo) => (
              <div className='flex flex-col whitespace-nowrap px-4 py-2' key={memo.id}>
                <span className='overflow-hidden text-ellipsis text-[12px]/[14px] font-bold'>{memo.title}</span>
                <div className='flex gap-2'>
                  <span className='text-[11px]'>{memo.date}</span>
                  <span className='overflow-hidden text-ellipsis text-[11px] font-bold text-black/50'>
                    {memo.content}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </>
      ))}
    </div>
  );
};

export default MemoList;
