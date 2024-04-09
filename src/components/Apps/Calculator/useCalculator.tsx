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
      element.style.fontSize = '2rem';
    }

    if (element.textContent.length >= 15) {
      element.style.fontSize = '1rem';
    }
  };

  const activateKey = (operator: string, className: string) => {
    keypadRef.current[operator].focus();
    keypadRef.current[operator].click();
    keypadRef.current[operator].classList.add(className);
    setTimeout(() => keypadRef.current[operator].classList.remove(className), 100);
  };

  useEffect(() => {
    const handleKeydown = (e: KeyboardEvent) => {
      switch (e.key) {
        case 'Escape':
          activateKey('AC', 'bg-calc-number');
          break;
        case 'Backspace':
          setInput((prev) => (prev.length <= 1 ? '0' : prev.slice(0, -1)));
          break;
        case 'Enter':
          activateKey('=', 'bg-calc-operator-active');
          break;
        case 'x':
          activateKey('*', 'bg-calc-operator-active');
          break;
      }

      if (allKeys[e.key]) {
        const kind = keypadRef.current[e.key].dataset.kind;

        switch (kind) {
          case 'function':
            activateKey(e.key, 'bg-calc-number');
            break;
          case 'number':
            activateKey(e.key, 'bg-calc-number-active');
            break;
          case 'operator':
            activateKey(e.key, 'bg-calc-operator-active');
            break;
        }
      }
    };

    document.addEventListener('keydown', handleKeydown);

    return () => {
      document.removeEventListener('keydown', handleKeydown);
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
