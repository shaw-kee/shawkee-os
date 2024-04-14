import { terminalRoot } from '@/config/terminal';
import { TerminalDirectory } from '@/types/terminal';

export const getCurrentChildren = (path: string[]) => {
  if (path.length === 0) return terminalRoot;
  return (terminalRoot.find((directory) => directory.title === path[path.length - 1]) as TerminalDirectory).children;
};

export const getCurrentPath = (path: string[]) => {
  return path.length === 0 ? '~' : path[path.length - 1];
};
