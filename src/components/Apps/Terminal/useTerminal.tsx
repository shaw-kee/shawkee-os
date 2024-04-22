import { commands, terminalRoot } from '@/config/terminal';
import { ContentType, TerminalFile } from '@/types/terminal';
import { History, getCurrentChildren, getCurrentPath } from '@/utils/terminal';
import { KeyboardEvent, useEffect, useRef, useState } from 'react';

const useTerminal = () => {
  const history = new History();
  const [contents, setContents] = useState<ContentType[]>([]);
  const currentChildren = useRef(terminalRoot);
  const currentInputRef = useRef<HTMLInputElement>();
  const path = useRef<string[]>([]);

  useEffect(() => {
    setContents([{ id: Date.now().toString(), content: generateInput() }]);
  }, []);

  const generateInput = () => {
    return (
      <div className='flex gap-1'>
        <div className='flex gap-1'>
          <span className='text-teal-400'>shawkee@macbook-pro</span>
          <span className='text-rose-400'>{getCurrentPath(path.current)}</span>
        </div>
        <span className='font-bold text-slate-400'>&gt;</span>
        <input
          className='grow bg-transparent caret-slate-400 outline-none'
          ref={callbackInputRef}
          onKeyDown={handleKeydown}
          autoFocus
        />
      </div>
    );
  };

  const handleKeydown = (e: KeyboardEvent) => {
    if (!currentInputRef.current) return;

    if (e.key === 'Enter') {
      const result = command(currentInputRef.current.value);
      if (currentInputRef.current.value.trim() !== '') history.pushHistory(currentInputRef.current.value);
      if (currentInputRef.current.value !== '' && result !== undefined) addContent(result);
      currentInputRef.current.readOnly = true;
      addContent(generateInput());
    }

    if (e.key === 'ArrowUp') {
      e.preventDefault();
      currentInputRef.current.value = history.getPrevCommand();
    }

    if (e.key === 'ArrowDown') {
      currentInputRef.current.value = history.getNextCommand();
    }

    if (e.key === 'Tab') {
      e.preventDefault();
      currentInputRef.current.value = autoComplete(currentInputRef.current.value);
    }
  };

  const callbackInputRef = (element: HTMLInputElement) => {
    if (element) currentInputRef.current = element;
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
      case 'cd':
        return changeDirectory(argument);
      case 'ls':
        return ls();
      case 'cat':
        return displayContent(argument);
      default:
        return <span>{`zsh: command not found:  ${command}`}</span>;
    }
  };

  const help = () => {
    return (
      <ul className='mb-2 list-disc pl-6'>
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

  const changeDirectory = (argument: string) => {
    const targetChild = currentChildren.current.find((child) => child.title === argument);
    const isDirectory = targetChild !== undefined && targetChild.type === 'directory';
    const backToRoot = argument === undefined || argument === '' || argument === '~';

    if (backToRoot) {
      path.current = [];
      currentChildren.current = terminalRoot;
      return;
    }
    if (argument === '.') return;
    if (argument === '..') {
      path.current = path.current.slice(0, -1);
      currentChildren.current = getCurrentChildren(path.current);
      return;
    }
    if (isDirectory) {
      path.current = [...path.current, argument];
      currentChildren.current = getCurrentChildren(path.current);
      return;
    }

    return <span>cd: no such file or directory: {argument}</span>;
  };

  const ls = () => {
    return (
      <div className='grid auto-rows-auto grid-cols-[repeat(auto-fill,15rem)]'>
        {currentChildren.current.map((children) => (
          <span className={`${children.type === 'directory' ? 'text-blue-400' : ''}`} key={children.id}>
            {children.title}
          </span>
        ))}
      </div>
    );
  };

  const clearTerminal = () => {
    setContents([]);
  };

  const displayContent = (file: string) => {
    const targetChild = currentChildren.current.find((child) => child.title === file);
    const isFile = targetChild !== undefined && targetChild.type === 'file';

    return isFile ? (targetChild as TerminalFile).content : <span>cat: no such file or directory: {file}</span>;
  };

  const autoComplete = (input: string): string => {
    if (input === '') return '';

    const [inputCommand, inputArgument] = input.split(' ');
    const autoCommand = commands.find((command) => command.startsWith(inputCommand));

    if (inputArgument === undefined) {
      return autoCommand ? autoCommand : inputCommand;
    } else {
      const targetChild = currentChildren.current.find((child) => child.title.startsWith(inputArgument));
      const isCompleteCommand = targetChild !== undefined && inputCommand === autoCommand;
      if (isCompleteCommand) return `${autoCommand} ${targetChild.title}`;
    }

    return `${inputCommand} ${inputArgument}`;
  };

  const addContent = (content: JSX.Element) => {
    setContents((prevContents) => [...prevContents, { id: Date.now().toString() + prevContents.length, content }]);
  };

  return { contents, handleClick };
};

export default useTerminal;
