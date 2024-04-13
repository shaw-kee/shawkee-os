import { TerminalDirectory, TerminalFile } from '@/types/terminal';

export const terminalRoot: (TerminalFile | TerminalDirectory)[] = [
  {
    id: 'shaw',
    title: 'shaw',
    type: 'folder',
    children: [
      {
        id: 'shaw-1',
        title: 'shaw-1',
        type: 'file',
        content: 'hi',
      },
      {
        id: 'shaw-2',
        title: 'shaw-2',
        type: 'file',
        content: 'hi-2',
      },
    ],
  },
  { id: 'mckee', title: 'mckee', type: 'folder', children: [] },
  {
    id: 'our-text',
    title: 'our-text',
    type: 'file',
    content: 'ot',
  },
];
