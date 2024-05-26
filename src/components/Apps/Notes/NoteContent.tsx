import useResize from '@/hooks/useResize';
import { SelectedMemo } from '@/types/note';
import { formatDate } from '@/utils/formatDate';
import React, { ChangeEvent, KeyboardEvent, useEffect, useRef, useState } from 'react';

interface Props {
  selectedMemo: SelectedMemo;
  onClick?: () => void;
  onChange: (title: string, content: string) => void;
}

const handleResize = (entries: ResizeObserverEntry[]) => {
  for (const entry of entries) {
    const element = entry.target as HTMLElement;
    element.style.height = `${element.scrollHeight}px`;
  }
};

const NoteContent = React.memo(({ selectedMemo, onClick, onChange }: Props) => {
  const date = new Date(selectedMemo.date);
  const [title, setTitle] = useState(selectedMemo.title);
  const [content, setContent] = useState(selectedMemo.content);
  const titleRef = useResize<HTMLTextAreaElement>(handleResize);
  const contentRef = useResize<HTMLTextAreaElement>(handleResize);
  const isKeyDown = useRef<boolean>(false);

  useEffect(() => {
    if (titleRef.current && contentRef.current) {
      titleRef.current.style.height = 'auto';
      contentRef.current.style.height = 'auto';
      titleRef.current.style.height = `${titleRef.current.scrollHeight}px`;
      contentRef.current.style.height = `${contentRef.current.scrollHeight}px`;
    }
  });

  useEffect(() => {
    if (!titleRef.current) return;

    if (selectedMemo.title === '') {
      titleRef.current.focus();
    }

    setTitle(selectedMemo.title);
    setContent(selectedMemo.content);
  }, [selectedMemo, titleRef]);

  useEffect(() => {
    if (isKeyDown.current) {
      onChange(title, content);
      isKeyDown.current = false;
    }
  }, [onChange, title, content]);

  const changeTitle = (e: ChangeEvent<HTMLTextAreaElement>) => {
    setTitle(e.target.value);
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
    <div className='flex grow flex-col overflow-y-auto bg-white' onClick={onClick}>
      <span
        className={`mt-2 select-none text-center text-sm font-bold text-black/30 ${
          selectedMemo.year === '' ? 'invisible' : ''
        }`}
      >{`${formatDate({ date })}`}</span>
      <div
        className={`mt-2 flex flex-col px-4 ${selectedMemo.year === '' ? 'invisible' : ''}`}
        onKeyDown={handleKeyDown}
      >
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
          className='mt-2 resize-none text-sm focus:outline-none'
          value={content}
          onChange={changeContent}
        />
      </div>
    </div>
  );
});

export default NoteContent;
