interface App {
  id: string;
  title: string;
  imageUrl: string;
  link?: string;
}

const apps: App[] = [
  {
    id: 'notes',
    title: 'Notes',
    imageUrl: 'src/assets/icons/Notes_Icon.png',
  },
  {
    id: 'safari',
    title: 'Safari',
    imageUrl: 'src/assets/icons/Safari_Icon.png',
  },
  {
    id: 'photo_booth',
    title: 'Photo_Booth',
    imageUrl: 'src/assets/icons/Photo_Booth_Icon.png',
  },
  {
    id: 'calculator',
    title: 'Calculator',
    imageUrl: 'src/assets/icons/Calculator_Icon.png',
  },
  {
    id: 'calendar',
    title: 'Calendar',
    imageUrl: 'src/assets/icons/Calendar_Icon.png',
  },
];

export default apps;
