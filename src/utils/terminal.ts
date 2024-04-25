import { terminalRoot } from '@/config/terminal';

export const getCurrentChildren = (path: string[]) => {
  const targetChild = terminalRoot.find((directory) => directory.title === path[path.length - 1]);
  if (targetChild !== undefined && targetChild.type === 'directory') return targetChild.children;
  return terminalRoot;
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
