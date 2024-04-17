import { ReactElement } from 'react';

export interface TerminalFile {
  id: string;
  title: string;
  type: string;
  content: JSX.Element;
}

export interface TerminalDirectory {
  id: string;
  title: string;
  type: string;
  children: (TerminalFile | TerminalDirectory)[];
}

export interface ContentType {
  id: string;
  content: ReactElement;
}
