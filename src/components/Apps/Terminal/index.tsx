import { terminalRoot } from '@/config/terminal';
import React, { ReactElement, useCallback, useEffect, useRef, useState } from 'react';

interface ContentType {
  id: string;
  content: ReactElement;
}

const Terminal = () => {
  const [contents, setContents] = useState<ContentType[]>([]);
  const currentChildren = useRef(terminalRoot);
  const currentInputRef = useRef<HTMLInputElement>();

  useEffect(() => {
    setContents([{ id: Date.now().toString(), content: generateInput() }]);
  }, []);

  const addContent = (content: ReactElement) => {
    setContents((prevContents) => [...prevContents, { id: Date.now().toString() + prevContents.length, content }]);
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
      const result = command(currentInputRef.current.value);
      currentInputRef.current.readOnly = true;
      if (currentInputRef.current.value !== '' && result !== null) addContent(result);
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

  const command = (input: string) => {
    const [command, argument] = input.split(' ');

    switch (command) {
      case 'help':
        return help();
      case 'clear':
        clearTerminal();
        break;
      case 'ls':
        return ls();
      default:
        return <span className='text-white'>{`zsh: command not found:  ${command}`}</span>;
    }

    return null;
  };

  const help = () => {
    return (
      <ul className='mb-2 list-disc pl-6 text-white'>
        <li>
          <span className='text-yellow-200'>cat {'<file>'}</span> - See the content of {'<file>'}
        </li>
        <li>
          <span className='text-yellow-200'>cd {'<dir>'}</span> - Move into
          {' <dir>'}, "cd .." to move to the parent directory, "cd" or "cd ~" to return to root
        </li>
        <li>
          <span className='text-yellow-200'>ls</span> - See files and directories in the current directory
        </li>
        <li>
          <span className='text-yellow-200'>clear</span> - Clear the screen
        </li>
        <li>
          <span className='text-yellow-200'>help</span> - Display this help menu
        </li>
        <li>
          press <span className='text-yellow-200'>up arrow / down arrow</span> - Select history commands
        </li>
        <li>
          press <span className='text-yellow-200'>tab</span> - Auto complete
        </li>
      </ul>
    );
  };

  const ls = () => {
    return (
      <div className='grid auto-rows-auto grid-cols-[repeat(auto-fill,15rem)]'>
        {currentChildren.current.map((children) => (
          <span className={`${children.type === 'file' ? 'text-white' : 'text-blue-400'}`} key={children.id}>
            {children.title}
          </span>
        ))}
      </div>
    );
  };

  const clearTerminal = () => {
    setContents([]);
  };

  return (
    <div className='flex h-full flex-col overflow-x-auto bg-slate-800/95 p-3' onClick={handleClick}>
      <div className='text-white'>
        <span>Hello World! Type `help` to get started</span>
      </div>
      {contents.map(({ id, content }) => (
        <React.Fragment key={id}>{content}</React.Fragment>
      ))}
    </div>
  );
};

export default Terminal;
