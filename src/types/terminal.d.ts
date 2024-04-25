import { ReactElement } from 'react';

export interface TerminalFile {
  id: string;
  title: string;
  type: 'file';
  content: JSX.Element;
}

export interface TerminalDirectory {
  id: string;
  title: string;
  type: 'directory';
  children: (TerminalFile | TerminalDirectory)[];
}

export interface ContentType {
  id: string;
  content: ReactElement;
}
