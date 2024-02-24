const Notes = () => {
  return (
    <div className='flex min-h-full'>
      <div className='flex w-full'>
        <div className='flex-1 bg-[#dadada]/90 backdrop-blur-md'>SideBar</div>
        <div className='flex flex-[5_5_0%] flex-col'>
          <div className='h-12 border-b border-black/5 bg-[#EAEAEA]'>MenuBar</div>
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
