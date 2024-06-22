export interface WindowApp {
  id: string;
  title: string;
  imageUrl: string;
  isOpen: boolean;
  minWidth: number;
  minHeight: number;
  zIndex: number;
  isMinimize: boolean;
  isResizable: boolean;
  content: ReactElement;
  type: 'window';
}

export interface LinkApp {
  id: string;
  title: string;
  imageUrl: string;
  link: string;
  type: 'link';
}
