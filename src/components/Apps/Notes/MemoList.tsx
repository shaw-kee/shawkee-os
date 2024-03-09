const MemoList = () => {
  return (
    <div className='flex max-w-xs flex-col border-r border-black/5 bg-white'>
      <div className='border-b border-black/5 py-2 pl-4 text-sm font-bold text-black/60'>오늘</div>
      <div className='mt-2 flex flex-col gap-1 px-2'>
        <div className='flex flex-col  whitespace-nowrap px-4 py-2'>
          <span className='overflow-hidden text-ellipsis text-[12px]/[14px] font-bold'>
            새로운 메모 메모 메모 메모 메모 메모 메모 메모 메모 메모 메모 메모 메모 메모 메모 메모v
          </span>
          <div className='flex gap-2'>
            <span className='text-[11px]'>2024. 2. 25.</span>
            <span className='overflow-hidden text-ellipsis text-[11px] font-bold text-black/50'>
              추가 컨텐츠 없음 추가 컨텐츠 없음 추가 컨텐츠 없음 추가 컨텐츠 없음
            </span>
          </div>
        </div>
        <div className='flex flex-col  whitespace-nowrap px-4 py-2'>
          <span className='overflow-hidden text-ellipsis text-[12px]/[14px] font-bold'>
            새로운 메모 메모 메모 메모 메모 메모 메모 메모 메모 메모 메모 메모 메모 메모 메모 메모v
          </span>
          <div className='flex gap-2'>
            <span className='text-[11px]'>2024. 2. 25.</span>
            <span className='overflow-hidden text-ellipsis text-[11px] font-bold text-black/50'>
              추가 컨텐츠 없음 추가 컨텐츠 없음 추가 컨텐츠 없음 추가 컨텐츠 없음
            </span>
          </div>
        </div>
        <div className='flex flex-col  whitespace-nowrap px-4 py-2'>
          <span className='overflow-hidden text-ellipsis text-[12px]/[14px] font-bold'>
            새로운 메모 메모 메모 메모 메모 메모 메모 메모 메모 메모 메모 메모 메모 메모 메모 메모v
          </span>
          <div className='flex gap-2'>
            <span className='text-[11px]'>2024. 2. 25.</span>
            <span className='overflow-hidden text-ellipsis text-[11px] font-bold text-black/50'>
              추가 컨텐츠 없음 추가 컨텐츠 없음 추가 컨텐츠 없음 추가 컨텐츠 없음
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MemoList;
