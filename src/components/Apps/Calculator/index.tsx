const Calculator = () => {
  return (
    <div className='flex h-full flex-col bg-[#3d3d3d]/80 shadow-[inset_0_0_2px_2px_rgba(135,135,135,0.8)]'>
      <div className='flex justify-end px-6 text-[4rem] font-thin text-white'>0</div>
      <div className='grid grow grid-cols-4 gap-[2px]'>
        <button className='bg-[#676569]/50 text-[1.5rem] font-normal text-white'>AC</button>
        <button className='bg-[#676569]/50 text-[1.5rem] font-normal text-white'></button>
        <button className='bg-[#676569]/50 text-[1.5rem] font-normal text-white'>%</button>
        <button className='bg-[#ff970e] text-[1.5rem] font-normal text-white'>÷</button>
        <button className='bg-[#807e82]/80 text-[1.5rem] font-normal text-white'>7</button>
        <button className='bg-[#807e82]/80 text-[1.5rem] font-normal text-white'>8</button>
        <button className='bg-[#807e82]/80 text-[1.5rem] font-normal text-white'>9</button>
        <button className='bg-[#ff970e] text-[1.5rem] font-normal text-white'>x</button>
        <button className='bg-[#807e82]/80 text-[1.5rem] font-normal text-white'>4</button>
        <button className='bg-[#807e82]/80 text-[1.5rem] font-normal text-white'>5</button>
        <button className='bg-[#807e82]/80 text-[1.5rem] font-normal text-white'>6</button>
        <button className='bg-[#ff970e] text-[1.5rem] font-normal text-white'>-</button>
        <button className='bg-[#807e82]/80 text-[1.5rem] font-normal text-white'>1</button>
        <button className='bg-[#807e82]/80 text-[1.5rem] font-normal text-white'>2</button>
        <button className='bg-[#807e82]/80 text-[1.5rem] font-normal text-white'>3</button>
        <button className='bg-[#ff970e] text-[1.5rem] font-normal text-white'>+</button>
      </div>
    </div>
  );
};

export default Calculator;
