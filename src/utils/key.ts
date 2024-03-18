import { NoteData } from '@/types/note';

export const removeKey = (key: string, noteData: NoteData) => {
  const { [key]: _, ...rest } = noteData;
  return rest;
};
