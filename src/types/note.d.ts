export interface NoteData {
  [key: string]: MemoType[] | number;
}

export interface MemoType {
  id: number;
  date: string;
  title: string;
  content: string;
}

export interface SelectedMemo extends MemoType {
  year: string;
}
