import { functionKeys, icons, numbers, operators } from '@/constants/calculator';
import useCalculator from './useCalculator';

const Calculator = () => {
  const { handleClickFunctionKey, handleClickNumber, handleClickOperator, displayAC, displayResult, callbackKeyRef } =
    useCalculator();

  return (
    <div className='flex h-full flex-col bg-[#595559]/95 shadow-[inset_0_0_2px_1px_rgba(187,187,187,0.8)]'>
      <div className='flex justify-end px-6 text-[4rem] font-thin text-white'>{displayResult()}</div>
      <div className='grid grow grid-cols-4 grid-rows-5 gap-[2px]'>
        <div className='col-span-3 row-span-1 flex gap-[2px]'>
          {functionKeys.map((functionKey) =>
            functionKey === 'AC' ? (
              <button
                className='flex flex-[1_0_30%] items-center justify-center bg-calc-function text-[1.5rem] font-normal text-white active:bg-calc-number'
                key={`calc-${functionKey}`}
                onClick={handleClickFunctionKey(functionKey)}
                ref={callbackKeyRef}
                data-key={functionKey}
                data-kind='function'
              >
                {displayAC()}
              </button>
            ) : (
              <button
                className='flex flex-[1_0_30%] items-center justify-center bg-calc-function text-[1.5rem] font-normal text-white active:bg-calc-number'
                key={`calc-${functionKey}`}
                onClick={handleClickFunctionKey(functionKey)}
                ref={callbackKeyRef}
                data-key={functionKey}
                data-kind='function'
              >
                {icons[functionKey]}
              </button>
            )
          )}
        </div>
        <div className='col-span-3 row-span-4 grid grid-cols-3 grid-rows-4 gap-[2px]'>
          {numbers.map((number) =>
            number === '0' ? (
              <button
                className='active:bg-calc-number-active col-span-2 bg-calc-number text-[1.5rem] font-normal text-white'
                key={`calc-${number}`}
                onClick={handleClickNumber(number)}
                ref={callbackKeyRef}
                data-key={number}
                data-kind='number'
              >
                {number}
              </button>
            ) : (
              <button
                className='active:bg-calc-number-active bg-calc-number text-[1.5rem] font-normal text-white'
                key={`calc-${number}`}
                onClick={handleClickNumber(number)}
                ref={callbackKeyRef}
                data-key={number}
                data-kind='number'
              >
                {number}
              </button>
            )
          )}
        </div>
        <div className='col-start-4 row-start-1 row-end-6 flex flex-col gap-[2px]'>
          {operators.map((operator) => (
            <button
              className='active:bg-calc-operator-active flex flex-1 items-center justify-center bg-calc-operator text-[1.5rem] font-normal text-white'
              key={`calc-${operator}`}
              onClick={handleClickOperator(operator)}
              ref={callbackKeyRef}
              data-key={operator}
              data-kind='operator'
            >
              {icons[operator]}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Calculator;
