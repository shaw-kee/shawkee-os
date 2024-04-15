import { TerminalDirectory, TerminalFile } from '@/types/terminal';

export const terminalRoot: (TerminalFile | TerminalDirectory)[] = [
  {
    id: 'shaw',
    title: 'shaw',
    type: 'directory',
    children: [
      {
        id: 'shaw-1',
        title: 'shaw-1',
        type: 'file',
        content: <span>Shaw-1</span>,
      },
      {
        id: 'shaw-2',
        title: 'shaw-2',
        type: 'file',
        content: <span>Shaw-2</span>,
      },
    ],
  },
  { id: 'mckee', title: 'mckee', type: 'directory', children: [] },
  {
    id: 'our-text',
    title: 'our-text',
    type: 'file',
    content: <span>our-text</span>,
  },
];
