import { functionKeys, icons, numbers, operators } from '@/constants/calculator';
import { useState } from 'react';
const defaultState = { operand: '', formulaOperator: '' };

const Calculator = () => {
  const [formula, setFormula] = useState(defaultState);
  const [input, setInput] = useState('0');

  const handleClickNumber = (number: string) => {
    if (formula.formulaOperator === '=') {
      setFormula({ ...formula, formulaOperator: '' });
    }

    setInput((prev) => {
      if (prev !== '0' || number === '.') {
        return prev + number;
      }

      return number;
    });
  };

  const handleClickOperator = (operator: string) => {
    const { operand, formulaOperator } = formula;
    if (input === '0' && operand === '') return;
    if (formulaOperator === '=') {
      setFormula({ ...formula, formulaOperator: operator });
      return;
    }
    setInput('0');

    if (formulaOperator === '') {
      setFormula({ formulaOperator: operator, operand: input });
    }

    if (formulaOperator !== '') {
      setFormula({ formulaOperator: operator, operand: calculate(operand, formulaOperator, input) });
    }

    if (operator === '=') {
      setInput('0');
    }
  };

  const calculate = (operandA: string, operator: string, operandB: string) => {
    switch (operator) {
      case '+':
        return String(Number(operandA) + Number(operandB));
      case '-':
        return String(Number(operandA) - Number(operandB));
      case '*':
        return String(Number(operandA) * Number(operandB));
      case '/':
        return String(Number(operandA) / Number(operandB));
    }
    return '';
  };

  const displayResult = () => {
    if (formula.operand !== '' && input === '0') return formula.operand;
    return input;
  };

  return (
    <div className='flex h-full flex-col bg-[#595559]/95 shadow-[inset_0_0_2px_1px_rgba(187,187,187,0.8)]'>
      <div className='flex justify-end px-6 text-[4rem] font-thin text-white'>{displayResult()}</div>
      <div className='grid grow grid-cols-4 grid-rows-5 gap-[2px]'>
        <div className='col-span-3 row-span-1 flex gap-[2px]'>
          {functionKeys.map((functionKey) => (
            <button
              className='flex flex-[1_0_30%] items-center justify-center bg-calc-function text-[1.5rem] font-normal text-white active:bg-calc-number'
              key={`calc-${functionKey}`}
            >
              {icons[functionKey] ? icons[functionKey] : functionKey}
            </button>
          ))}
        </div>
        <div className='col-span-3 row-span-4 grid grid-cols-3 grid-rows-4 gap-[2px]'>
          {numbers.map((number) =>
            number === '0' ? (
              <button
                className='col-span-2 bg-calc-number text-[1.5rem] font-normal text-white active:bg-[#aba8ad]'
                key={`calc-${number}`}
                onClick={() => handleClickNumber(number)}
              >
                {number}
              </button>
            ) : (
              <button
                className='bg-calc-number text-[1.5rem] font-normal text-white active:bg-[#aba8ad]'
                key={`calc-${number}`}
                onClick={() => handleClickNumber(number)}
              >
                {number}
              </button>
            )
          )}
        </div>
        <div className='col-start-4 row-start-1 row-end-6 flex flex-col gap-[2px]'>
          {operators.map((operator) => (
            <button
              className='flex flex-1 items-center justify-center bg-calc-operator text-[1.5rem] font-normal text-white active:bg-[#ff970e]/70'
              key={`calc-${operator}`}
              onClick={() => handleClickOperator(operator)}
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
