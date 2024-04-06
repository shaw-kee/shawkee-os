import { defaultState, functionKeys, numbers, operators } from '@/constants/calculator';
import { useEffect, useRef, useState } from 'react';

interface KeypadRefType {
  [key: string]: HTMLButtonElement;
}

interface KeyType {
  [key: string]: string;
}

const allKeys: KeyType = [...operators, ...numbers, ...functionKeys].reduce((obj, key) => {
  return { ...obj, [key]: key };
}, {});

const useCalculator = () => {
  const [formula, setFormula] = useState(defaultState);
  const [input, setInput] = useState('0');
  const keypadRef = useRef<KeypadRefType>({});

  const callbackKeyRef = (element: HTMLButtonElement) => {
    if (!element || !element.dataset.key) return;
    keypadRef.current[element.dataset.key] = element;
  };

  const callbackDisplayRef = (element: HTMLDivElement) => {
    if (!element || !element.textContent) return;

    if (element.textContent.length < 5) {
      element.style.fontSize = '4rem';
    }

    if (element.textContent.length >= 7) {
      element.style.fontSize = '3rem';
    }

    if (element.textContent.length >= 20) {
      element.style.fontSize = '1rem';
    }
  };

  useEffect(() => {
    const handleKeydown = (e: KeyboardEvent) => {
      switch (e.key) {
        case 'Escape':
          keypadRef.current['AC'].click();
          break;
        case 'Backspace':
          setInput((prev) => (prev.length <= 1 ? '0' : prev.slice(0, -1)));
          break;
        case 'Enter':
          keypadRef.current['='].click();
          keypadRef.current['='].classList.add('bg-calc-operator-active');
          break;
        case 'x':
          keypadRef.current['*'].click();
          keypadRef.current['*'].classList.add('bg-calc-operator-active');
          break;
      }

      if (allKeys[e.key]) {
        const kind = keypadRef.current[e.key].dataset.kind;

        switch (kind) {
          case 'function':
            keypadRef.current[e.key].classList.add('bg-calc-number');
            break;
          case 'number':
            keypadRef.current[e.key].classList.add('bg-calc-number-active');
            break;
          case 'operator':
            keypadRef.current[e.key].classList.add('bg-calc-operator-active');
            break;
        }

        keypadRef.current[e.key].click();
      }
    };

    const handleKeyup = (e: KeyboardEvent) => {
      switch (e.key) {
        case 'Enter':
          keypadRef.current['='].classList.remove('bg-calc-operator-active');
          break;
        case 'x':
          keypadRef.current['*'].classList.remove('bg-calc-operator-active');
          break;
      }

      if (!allKeys[e.key]) return;

      if (keypadRef.current[e.key].dataset.kind === 'function') {
        keypadRef.current[e.key].classList.remove('bg-calc-number');
      }

      keypadRef.current[e.key].classList.remove('bg-calc-number-active');
      keypadRef.current[e.key].classList.remove('bg-calc-operator-active');
    };

    document.addEventListener('keydown', handleKeydown);
    document.addEventListener('keyup', handleKeyup);

    return () => {
      document.removeEventListener('keydown', handleKeydown);
      document.removeEventListener('keyup', handleKeyup);
    };
  }, []);

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
    callbackKeyRef,
    callbackDisplayRef,
  };
};

export default useCalculator;
