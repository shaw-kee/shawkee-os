export interface App {
  id: string;
  title: string;
  imageUrl: string;
  link?: string;
  isOpen?: boolean;
}

export const apps: App[] = [
  {
    id: 'notes',
    title: 'Notes',
    imageUrl: 'src/assets/icons/Notes_Icon.png',
    isOpen: false,
  },
  {
    id: 'safari',
    title: 'Safari',
    imageUrl: 'src/assets/icons/Safari_Icon.png',
    isOpen: false,
  },
  {
    id: 'photo_booth',
    title: 'Photo Booth',
    imageUrl: 'src/assets/icons/Photo_Booth_Icon.png',
    isOpen: false,
  },
  {
    id: 'calculator',
    title: 'Calculator',
    imageUrl: 'src/assets/icons/Calculator_Icon.png',
    isOpen: false,
  },
  {
    id: 'calendar',
    title: 'Calendar',
    imageUrl: 'src/assets/icons/Calendar_Icon.png',
    isOpen: false,
  },
];
