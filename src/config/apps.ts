import { INITIAL_INDEX } from '@/constants/app';

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
}

export const apps: App[] = [
  {
    id: 'notes',
    title: 'Notes',
    imageUrl: 'src/assets/icons/Dock/Notes_Icon.png',
    isOpen: false,
    initialX: 500,
    initialY: 300,
    minWidth: 300,
    minHeight: 400,
    zIndex: INITIAL_INDEX,
  },
  {
    id: 'safari',
    title: 'Safari',
    imageUrl: 'src/assets/icons/Dock/Safari_Icon.png',
    isOpen: false,
    initialX: 600,
    initialY: 350,
    minWidth: 300,
    minHeight: 400,
    zIndex: INITIAL_INDEX,
  },
  {
    id: 'photo_booth',
    title: 'Photo Booth',
    imageUrl: 'src/assets/icons/Dock/Photo_Booth_Icon.png',
    isOpen: false,
    initialX: 700,
    initialY: 400,
    minWidth: 300,
    minHeight: 400,
    zIndex: INITIAL_INDEX,
  },
  {
    id: 'calculator',
    title: 'Calculator',
    imageUrl: 'src/assets/icons/Dock/Calculator_Icon.png',
    isOpen: false,
    initialX: 800,
    initialY: 450,
    minWidth: 300,
    minHeight: 400,
    zIndex: INITIAL_INDEX,
  },
  {
    id: 'calendar',
    title: 'Calendar',
    imageUrl: 'src/assets/icons/Dock/Calendar_Icon.png',
    isOpen: false,
    initialX: 900,
    initialY: 500,
    minWidth: 300,
    minHeight: 400,
    zIndex: INITIAL_INDEX,
  },
];
