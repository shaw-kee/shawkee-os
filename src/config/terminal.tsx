import { TerminalDirectory, TerminalFile } from '@/types/terminal';
import { DoingWhat, Info } from './terminalContents';

export const commands = ['cd', 'cat', 'clear', 'ls', 'help'];

export const terminalRoot: (TerminalFile | TerminalDirectory)[] = [
  {
    id: 'shaw',
    title: 'shaw',
    type: 'directory',
    children: [
      {
        id: 'who-am-i',
        title: 'who-am-i.txt',
        type: 'file',
        content: (
          <span className='text-lg'>
            I'm a <span className='text-yellow-300'>super smart</span> web full-stack developer. 👨‍💻
          </span>
        ),
      },
    ],
  },
  {
    id: 'mckee',
    title: 'mckee',
    type: 'directory',
    children: [
      {
        id: 'doing-what',
        title: 'doing-what.js',
        type: 'file',
        content: <DoingWhat />,
      },
    ],
  },
  {
    id: 'info',
    title: 'info.js',
    type: 'file',
    content: <Info />,
  },
];
