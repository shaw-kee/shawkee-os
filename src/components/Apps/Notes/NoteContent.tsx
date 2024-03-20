import { SelectedMemo } from '@/types/note';
import { formatDate } from '@/utils/formatDate';
import { ChangeEvent, KeyboardEvent, useEffect, useLayoutEffect, useRef, useState } from 'react';

interface Props {
  selectedMemo: SelectedMemo;
  handleClick: () => void;
  handleChange: (id: number, year: string, title: string, content: string) => void;
}

const NoteContent = ({ selectedMemo, handleChange, handleClick }: Props) => {
  const date = new Date(selectedMemo.date);
  const [title, setTitle] = useState(selectedMemo.title);
  const [content, setContent] = useState(selectedMemo.content);
  const titleRef = useRef<HTMLTextAreaElement>(null);
  const contentRef = useRef<HTMLTextAreaElement>(null);
  const isKeyDown = useRef<boolean>(false);

  useEffect(() => {
    if (titleRef.current) {
      titleRef.current.style.height = 'auto';
      titleRef.current.style.height = `${titleRef.current.scrollHeight}px`;
    }
  });

  useLayoutEffect(() => {
    if (!titleRef.current) return;

    if (selectedMemo.title === '') {
      titleRef.current.focus();
    }

    setTitle(selectedMemo.title);
    setContent(selectedMemo.content);
  }, [selectedMemo]);

  useEffect(() => {
    if (isKeyDown.current) {
      handleChange(selectedMemo.id, selectedMemo.year, title, content);
      isKeyDown.current = false;
    }
  }, [handleChange, selectedMemo, title, content]);

  const changeTitle = (e: ChangeEvent<HTMLTextAreaElement>) => {
    if (titleRef.current) {
      titleRef.current.style.height = 'auto';
      titleRef.current.style.height = `${titleRef.current.scrollHeight}px`;
      setTitle(e.target.value);
    }
  };

  const changeContent = (e: ChangeEvent<HTMLTextAreaElement>) => {
    setContent(e.target.value);
  };

  const handleKeyDown = () => {
    isKeyDown.current = true;
  };

  const handleKeyDownTitle = (e: KeyboardEvent) => {
    if (e.key === 'Enter' && contentRef.current) {
      contentRef.current.focus();
    }
  };

  return (
    <div className='flex flex-[3_3_0%] flex-col justify-center bg-white' onClick={handleClick}>
      {selectedMemo.year !== '' && (
        <>
          <span className='mt-2 select-none text-center text-sm font-bold text-black/30'>{`${formatDate(date)}`}</span>
          <div className='mt-2 flex grow flex-col px-4' onKeyDown={handleKeyDown}>
            <textarea
              ref={titleRef}
              className='resize-none break-all text-lg font-bold outline-none'
              value={title}
              onChange={changeTitle}
              onKeyDown={handleKeyDownTitle}
              rows={1}
            />
            <textarea
              ref={contentRef}
              className='mt-2 grow resize-none text-sm focus:outline-none'
              value={content}
              onChange={changeContent}
            />
          </div>
        </>
      )}
    </div>
  );
};

export default NoteContent;
