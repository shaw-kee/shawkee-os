import React, { ReactElement, useCallback, useRef, useState } from 'react';

interface ContentType {
  id: string;
  content: ReactElement;
}

const Terminal = () => {
  const [contents, setContents] = useState<ContentType[]>([]);
  const currentInputRef = useRef<HTMLInputElement>();

  const addContent = (content: ReactElement) => {
    setContents((prevContents) => [...prevContents, { id: Date.now().toString(), content }]);
  };

  const generateInput = () => {
    return (
      <div className='flex gap-1'>
        <div className='flex gap-1'>
          <span className='text-green-400'>shawkee@macbook-pro</span>
          <span className='text-yellow-500'>~</span>
        </div>
        <span className='font-bold text-slate-400'>&gt;</span>
        <input
          className='grow bg-transparent text-white caret-slate-400 outline-none'
          ref={callbackInputRef}
          autoFocus
        />
      </div>
    );
  };

  const handleKeydown = useCallback((e: KeyboardEvent) => {
    if (!currentInputRef.current) return;

    if (e.key === 'Enter') {
      currentInputRef.current.readOnly = true;
      addContent(generateInput());
    }
  }, []);

  const callbackInputRef = (element: HTMLInputElement) => {
    if (element) {
      element.addEventListener('keydown', handleKeydown);
      currentInputRef.current = element;
    }
  };

  const handleClick = () => {
    if (!currentInputRef.current) return;
    currentInputRef.current.focus();
  };

  return (
    <div className='flex h-full flex-col overflow-x-auto bg-slate-800/95 p-3' onClick={handleClick}>
      <div className='text-white'>
        <span>Hello World! Type `help` to get started</span>
      </div>
      {generateInput()}
      {contents.map(({ id, content }) => (
        <React.Fragment key={id}>{content}</React.Fragment>
      ))}
    </div>
  );
};

export default Terminal;
