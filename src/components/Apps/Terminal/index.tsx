const Terminal = () => {
  return (
    <div className='flex h-full flex-col bg-slate-800/95 p-3'>
      <div className='text-white'>
        <span>Hello World! Type `help` to get started</span>
      </div>
      <div className='flex gap-1'>
        <div className='flex gap-1'>
          <span className='text-green-400'>shawkee@macbook-pro</span>
          <span className='text-yellow-500'>~</span>
        </div>
        <span className='font-bold text-slate-400'>&gt;</span>
        <input className='bg-transparent text-white caret-slate-400 outline-none'></input>
      </div>
    </div>
  );
};

export default Terminal;
