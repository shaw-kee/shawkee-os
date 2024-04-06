import { defaultState } from '@/constants/calculator';
import { useState } from 'react';

const useCalculator = () => {
  const [formula, setFormula] = useState(defaultState);
  const [input, setInput] = useState('0');

  const handleClickFunctionKey = (functionKey: string) => () => {
    if (functionKey === 'AC') {
      if (input === '0') setFormula(defaultState);
      setInput('0');
    }

    if (functionKey === '+-') {
      setInput((prev) => {
        if (prev === '0') return prev;
        if (prev.includes('-')) return prev.replace('-', '');
        return `-${prev}`;
      });
    }

    if (functionKey === '%') {
      setInput((prev) => String(Number(prev) / 100));
    }
  };

  const handleClickNumber = (number: string) => () => {
    if (number === '.' && input.includes('.')) return;
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

  const handleClickOperator = (operator: string) => () => {
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

  const displayAC = () => {
    return input === '0' && formula.operand === '' ? 'AC' : 'C';
  };

  return {
    handleClickFunctionKey,
    handleClickNumber,
    handleClickOperator,
    displayAC,
    displayResult,
  };
};

export default useCalculator;
