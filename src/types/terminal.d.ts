export interface TerminalFile {
  id: string;
  title: string;
  type: string;
  content: string;
}

export interface TerminalDirectory {
  id: string;
  title: string;
  type: string;
  children: (TerminalFile | TerminalDirectory)[];
}
