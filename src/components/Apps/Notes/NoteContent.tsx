import { SelectedMemo } from '@/types/note';
import { ChangeEvent, useEffect, useRef, useState } from 'react';

interface Props {
  selectedMemo: SelectedMemo;
  handleChange: (id: number, year: string, title: string, content: string) => void;
}

const NoteContent = ({ selectedMemo, handleChange }: Props) => {
  const [title, setTitle] = useState(selectedMemo.title);
  const [content, setContent] = useState(selectedMemo.content);
  const isKeyPress = useRef<boolean>(false);

  useEffect(() => {
    setTitle(selectedMemo.title);
    setContent(selectedMemo.content);
  }, [selectedMemo]);

  useEffect(() => {
    if (isKeyPress.current) {
      handleChange(selectedMemo.id, selectedMemo.year, title, content);
      isKeyPress.current = false;
    }
  }, [handleChange, selectedMemo, title, content]);

  const changeTitle = (e: ChangeEvent<HTMLInputElement>) => {
    setTitle(e.target.value);
  };

  const changeContent = (e: ChangeEvent<HTMLTextAreaElement>) => {
    setContent(e.target.value);
  };

  const handleKeyDown = () => {
    isKeyPress.current = true;
  };

  return (
    <div className='flex flex-[3_3_0%] flex-col justify-center bg-white'>
      <span className='mt-2 select-none text-center text-sm font-bold text-black/30'>{selectedMemo.date}</span>
      <div className='mt-2 flex grow flex-col px-4'>
        <input
          className='text-lg font-bold outline-none'
          value={title}
          onChange={changeTitle}
          onKeyDown={handleKeyDown}
        />
        <textarea
          className='mt-2 grow resize-none text-sm focus:outline-none'
          value={content}
          onChange={changeContent}
          onKeyDown={handleKeyDown}
        />
      </div>
    </div>
  );
};

export default NoteContent;
