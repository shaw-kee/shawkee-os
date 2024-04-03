import PlusMinusIcon from '@/assets/icons/Calculator/PlusMinus.svg?react';
import PlusIcon from '@/assets/icons/Calculator/Plus.svg?react';
import PercentIcon from '@/assets/icons/Calculator/Percent.svg?react';
import MinusIcon from '@/assets/icons/Calculator/Minus.svg?react';
import DivideIcon from '@/assets/icons/Calculator/Divide.svg?react';
import EqualIcon from '@/assets/icons/Calculator/Equal.svg?react';
import MultiplyIcon from '@/assets/icons/Calculator/Multiply.svg?react';

const Calculator = () => {
  return (
    <div className='flex h-full flex-col bg-[#595559]/95 shadow-[inset_0_0_2px_1px_rgba(187,187,187,0.8)]'>
      <div className='flex justify-end px-6 text-[4rem] font-thin text-white'>0</div>
      <div className='grid grow grid-cols-4 gap-[2px]'>
        <button className='bg-calc-function active:bg-calc-number text-[1.5rem] font-normal text-white'>AC</button>
        <button className='bg-calc-function active:bg-calc-number flex items-center justify-center text-[1.5rem] font-normal text-white'>
          <PlusMinusIcon width='28' height='28' fill='white' />
        </button>
        <button className='bg-calc-function active:bg-calc-number flex items-center justify-center text-[1.5rem] font-normal text-white'>
          <PercentIcon width='28' height='28' fill='white' />
        </button>
        <button className='bg-calc-operator flex items-center justify-center text-[1.5rem] font-normal text-white active:bg-[#ff970e]/70'>
          <DivideIcon width='28' height='28' fill='white' />
        </button>
        <button className='bg-calc-number text-[1.5rem] font-normal text-white active:bg-[#aba8ad]'>7</button>
        <button className='bg-calc-number text-[1.5rem] font-normal text-white active:bg-[#aba8ad]'>8</button>
        <button className='bg-calc-number text-[1.5rem] font-normal text-white active:bg-[#aba8ad]'>9</button>
        <button className='bg-calc-operator flex items-center justify-center text-[1.5rem] font-normal text-white active:bg-[#ff970e]/70'>
          <MultiplyIcon width='28' height='28' fill='white' />
        </button>
        <button className='bg-calc-number text-[1.5rem] font-normal text-white active:bg-[#aba8ad]'>4</button>
        <button className='bg-calc-number text-[1.5rem] font-normal text-white active:bg-[#aba8ad]'>5</button>
        <button className='bg-calc-number text-[1.5rem] font-normal text-white active:bg-[#aba8ad]'>6</button>
        <button className='bg-calc-operator flex items-center justify-center text-[1.5rem] font-normal text-white active:bg-[#ff970e]/70'>
          <MinusIcon width='28' height='28' fill='white' />
        </button>
        <button className='bg-calc-number text-[1.5rem] font-normal text-white active:bg-[#aba8ad]'>1</button>
        <button className='bg-calc-number text-[1.5rem] font-normal text-white active:bg-[#aba8ad]'>2</button>
        <button className='bg-calc-number text-[1.5rem] font-normal text-white active:bg-[#aba8ad]'>3</button>
        <button className='bg-calc-operator flex items-center justify-center text-[1.5rem] font-normal text-white active:bg-[#ff970e]/70'>
          <PlusIcon width='28' height='28' fill='white' />
        </button>
        <button className='bg-calc-number col-span-2 text-[1.5rem] font-normal text-white active:bg-[#aba8ad]'>
          0
        </button>
        <button className='bg-calc-number text-[1.5rem] font-normal text-white active:bg-[#aba8ad]'>.</button>
        <button className='bg-calc-operator flex items-center justify-center text-[1.5rem] font-normal text-white active:bg-[#ff970e]/70'>
          <EqualIcon width='28' height='28' fill='white' />
        </button>
      </div>
    </div>
  );
};

export default Calculator;
