import PlusMinusIcon from '@/assets/svg/Calculator/PlusMinus.svg?react';
import PlusIcon from '@/assets/svg/Calculator/Plus.svg?react';
import PercentIcon from '@/assets/svg/Calculator/Percent.svg?react';
import MinusIcon from '@/assets/svg/Calculator/Minus.svg?react';
import DivideIcon from '@/assets/svg/Calculator/Divide.svg?react';
import EqualIcon from '@/assets/svg/Calculator/Equal.svg?react';
import MultiplyIcon from '@/assets/svg/Calculator/Multiply.svg?react';
import { IconType } from '@/types/calculator';

export const defaultState = { operand: '', formulaOperator: '' };
export const numbers = ['7', '8', '9', '4', '5', '6', '1', '2', '3', '0', '.'];
export const functionKeys = ['AC', '+-', '%'];
export const operators = ['/', '*', '-', '+', '='];
export const icons: IconType = {
  '+-': <PlusMinusIcon width='28' height='28' fill='white' />,
  '%': <PercentIcon width='28' height='28' fill='white' />,
  '/': <DivideIcon width='28' height='28' fill='white' />,
  '*': <MultiplyIcon width='28' height='28' fill='white' />,
  '-': <MinusIcon width='28' height='28' fill='white' />,
  '+': <PlusIcon width='28' height='28' fill='white' />,
  '=': <EqualIcon width='28' height='28' fill='white' />,
};
