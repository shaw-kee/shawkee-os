import { type KeyboardEvent, type FocusEvent, useState, useEffect, useRef } from 'react';
import HomePage from './HomePage';

const Safari = () => {
  const [histories, setHistories] = useState<string[]>(['']);
  const historyCursor = useRef(0);
  const inputRef = useRef<HTMLInputElement>(null);
  const iframeRef = useRef<HTMLIFrameElement>(null);

  const handleFocusInput = (event: FocusEvent<HTMLInputElement, Element>) => {
    event.currentTarget.setSelectionRange(0, event.currentTarget.value.length);
  };

  const handleKeydown = (event: KeyboardEvent<HTMLInputElement>) => {
    if (event.key === 'Enter') {
      let value = event.currentTarget.value;

      if (!value.trim()) return;

      const cursor = histories.length;

      if (!checkUrlProtocol(value)) {
        value = 'https://' + value;

        event.currentTarget.value = new URL(value).hostname;
      }

      setHistories([...histories, value]);

      historyCursor.current = cursor;
      event.currentTarget.blur();
    }
  };

  const currentPage = histories[historyCursor.current];

  const checkUrlProtocol = (url: string) => {
    const protocolPattern = /^(http|https):\/\//;
    return protocolPattern.test(url);
  };

  useEffect(() => {
    let timeoutId: ReturnType<typeof setTimeout> | null = null;

    const handleResize = (entries: ResizeObserverEntry[]) => {
      const iframeElement = entries[0].target as HTMLElement;
      iframeElement.style.pointerEvents = 'none';

      if (timeoutId) clearTimeout(timeoutId);
      timeoutId = setTimeout(() => (iframeElement.style.pointerEvents = 'auto'), 250);
    };

    const observer = new ResizeObserver(handleResize);
    if (iframeRef.current) observer.observe(iframeRef.current);

    return () => observer.disconnect();
  }, [histories]);

  const handleClickBackButton = () => {
    alert('back');
  };

  const handleClickNextButton = () => {
    alert('next');
  };

  const handleClickRefreshButton = () => {
    setHistories([...histories]);
  };

  const handleClickHomeButton = () => {
    if (!inputRef.current || currentPage === '') return;

    inputRef.current.value = '';

    const copiedHistories = histories.slice(0, historyCursor.current + 1);
    const cursor = copiedHistories.length;
    historyCursor.current = cursor;
    copiedHistories.push('');

    setTimeout(() => setHistories(copiedHistories), 100);
  };

  return (
    <div className='flex min-h-full w-full flex-col bg-white'>
      <div className='flex select-none items-center gap-1 bg-gray-100 px-2 py-2'>
        <button
          className='aspect-square w-10 rounded-full transition-colors duration-300 hover:bg-gray-200'
          onClick={handleClickBackButton}
        >{`<`}</button>
        <button
          className='aspect-square w-10 rounded-full transition-colors duration-300 hover:bg-gray-200'
          onClick={handleClickNextButton}
        >{`>`}</button>
        <button
          className='aspect-square w-10 rounded-full transition-colors duration-300 hover:bg-gray-200'
          onClick={handleClickRefreshButton}
        >
          R
        </button>
        <button
          className='aspect-square w-10 rounded-full transition-colors duration-300 hover:bg-gray-200'
          onClick={handleClickHomeButton}
        >
          H
        </button>
        <input
          ref={inputRef}
          className='w-full rounded-full bg-gray-200 px-3 py-1 focus:bg-white'
          onKeyDown={handleKeydown}
          onFocus={handleFocusInput}
        />
      </div>
      {currentPage ? <iframe ref={iframeRef} className='grow' src={currentPage} /> : <HomePage />}
    </div>
  );
};

export default Safari;
