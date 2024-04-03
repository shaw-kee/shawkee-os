const Calculator = () => {
  return (
    <div className='flex h-full flex-col bg-[#595559]/95 shadow-[inset_0_0_2px_1px_rgba(187,187,187,0.8)]'>
      <div className='flex justify-end px-6 text-[4rem] font-thin text-white'>0</div>
      <div className='grid grow grid-cols-4 gap-[2px]'>
        <button className='bg-calc-function text-[1.5rem] font-normal text-white'>AC</button>
        <button className='bg-calc-function text-[1.5rem] font-normal text-white'></button>
        <button className='bg-calc-function text-[1.5rem] font-normal text-white'>%</button>
        <button className='bg-calc-operator text-[1.5rem] font-normal text-white'>÷</button>
        <button className='bg-calc-number text-[1.5rem] font-normal text-white'>7</button>
        <button className='bg-calc-number text-[1.5rem] font-normal text-white'>8</button>
        <button className='bg-calc-number text-[1.5rem] font-normal text-white'>9</button>
        <button className='bg-calc-operator text-[1.5rem] font-normal text-white'>x</button>
        <button className='bg-calc-number text-[1.5rem] font-normal text-white'>4</button>
        <button className='bg-calc-number text-[1.5rem] font-normal text-white'>5</button>
        <button className='bg-calc-number text-[1.5rem] font-normal text-white'>6</button>
        <button className='bg-calc-operator text-[1.5rem] font-normal text-white'>-</button>
        <button className='bg-calc-number text-[1.5rem] font-normal text-white'>1</button>
        <button className='bg-calc-number text-[1.5rem] font-normal text-white'>2</button>
        <button className='bg-calc-number text-[1.5rem] font-normal text-white'>3</button>
        <button className='bg-calc-operator text-[1.5rem] font-normal text-white'>+</button>
        <button className='bg-calc-number col-span-2 text-[1.5rem] font-normal text-white'>0</button>
        <button className='bg-calc-number text-[1.5rem] font-normal text-white'>.</button>
        <button className='bg-calc-operator text-[1.5rem] font-normal text-white'>=</button>
      </div>
    </div>
  );
};

export default Calculator;
