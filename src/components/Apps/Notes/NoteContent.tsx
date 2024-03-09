const NoteContent = () => {
  return (
    <div className='flex flex-[3_3_0%] flex-col justify-center bg-white'>
      <span className='mt-2 select-none text-center text-sm font-bold text-black/30'>2024년 2월 24일 오후 10:42</span>
      <div className='mt-2 flex grow flex-col px-4'>
        <input className='text-lg font-bold outline-none' />
        <textarea className='mt-2 grow resize-none text-sm focus:outline-none' />
      </div>
    </div>
  );
};

export default NoteContent;
