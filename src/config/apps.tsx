import Calculator from '@/components/Apps/Calculator';
import Calendar from '@/components/Apps/Calendar';
import Notes from '@/components/Apps/Notes';
import PhotoBooth from '@/components/Apps/PhotoBooth';
import Safari from '@/components/Apps/Safari';
import SnakeGame from '@/components/Apps/SnakeGame';
import Terminal from '@/components/Apps/Terminal';
import { INITIAL_INDEX } from '@/constants/app';
import { ReactElement } from 'react';

export interface App {
  id: string;
  title: string;
  imageUrl: string;
  link?: string;
  isOpen?: boolean;
  initialX: number;
  initialY: number;
  minWidth: number;
  minHeight: number;
  zIndex: number;
  isMinimize: boolean;
  isResizable: boolean;
  content?: ReactElement;
}

export const apps: App[] = [
  {
    id: 'notes',
    title: 'Notes',
    imageUrl: 'src/assets/icons/Dock/Notes_Icon.png',
    initialX: 300,
    initialY: 100,
    minWidth: 800,
    minHeight: 600,
    zIndex: INITIAL_INDEX,
    isOpen: false,
    isMinimize: false,
    isResizable: true,
    content: <Notes />,
  },
  {
    id: 'safari',
    title: 'Safari',
    imageUrl: 'src/assets/icons/Dock/Safari_Icon.png',
    initialX: 600,
    initialY: 300,
    minWidth: 1000,
    minHeight: 650,
    zIndex: INITIAL_INDEX,
    isOpen: false,
    isMinimize: false,
    isResizable: true,
    content: <Safari />,
  },
  {
    id: 'photo_booth',
    title: 'Photo Booth',
    imageUrl: 'src/assets/icons/Dock/Photo_Booth_Icon.png',
    initialX: 700,
    initialY: 400,
    minWidth: 600,
    minHeight: 500,
    zIndex: INITIAL_INDEX,
    isOpen: false,
    isMinimize: false,
    isResizable: false,
    content: <PhotoBooth />,
  },
  {
    id: 'calculator',
    title: 'Calculator',
    imageUrl: 'src/assets/icons/Dock/Calculator_Icon.png',
    initialX: 700,
    initialY: 200,
    minWidth: 300,
    minHeight: 400,
    zIndex: INITIAL_INDEX,
    isOpen: false,
    isMinimize: false,
    isResizable: false,
    content: <Calculator />,
  },
  {
    id: 'terminal',
    title: 'Terminal',
    imageUrl: 'src/assets/icons/Dock/Terminal_Icon.png',
    initialX: 700,
    initialY: 200,
    minWidth: 800,
    minHeight: 600,
    zIndex: INITIAL_INDEX,
    isOpen: false,
    isMinimize: false,
    isResizable: true,
    content: <Terminal />,
  },
  {
    id: 'calendar',
    title: 'Calendar',
    imageUrl: 'src/assets/icons/Dock/Calendar_Icon.png',
    initialX: 900,
    initialY: 500,
    minWidth: 300,
    minHeight: 400,
    zIndex: INITIAL_INDEX,
    isOpen: false,
    isMinimize: false,
    isResizable: true,
    content: <Calendar />,
  },
  {
    id: 'snake_game',
    title: 'Snake Game',
    imageUrl: 'src/assets/icons/Dock/Calendar_Icon.png',
    initialX: 300,
    initialY: 400,
    minWidth: 400,
    minHeight: 400,
    zIndex: INITIAL_INDEX,
    isOpen: false,
    isMinimize: false,
    isResizable: false,
    content: <SnakeGame />,
  },
];
