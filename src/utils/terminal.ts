import { terminalRoot } from '@/config/terminal';
import { TerminalDirectory } from '@/types/terminal';

export const getCurrentChildren = (path: string[]) => {
  if (path.length === 0) return terminalRoot;
  return (terminalRoot.find((directory) => directory.title === path[path.length - 1]) as TerminalDirectory).children;
};

export const getCurrentPath = (path: string[]) => {
  return path.length === 0 ? '~' : path[path.length - 1];
};

export class History {
  #stack: string[];
  #cursor: number;

  constructor() {
    this.#stack = [];
    this.#cursor = 0;
  }

  pushHistory(command: string) {
    this.#stack.push(command);
    this.#cursor = this.#stack.length;
  }

  getPrevCommand() {
    if (this.#cursor > 0) this.#setCursor(this.#cursor - 1);
    return this.isBound() ? this.#stack[this.#cursor] : '';
  }

  getNextCommand() {
    if (this.#cursor < this.#stack.length) this.#setCursor(this.#cursor + 1);
    return this.isBound() ? this.#stack[this.#cursor] : '';
  }

  isBound() {
    return this.#cursor >= 0 && this.#cursor < this.#stack.length ? true : false;
  }

  #setCursor(value: number) {
    if (value < 0 || value > this.#stack.length) throw Error('history cursor boundary error');
    this.#cursor = value;
  }
}
