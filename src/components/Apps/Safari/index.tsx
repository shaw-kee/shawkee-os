import { type KeyboardEvent, type FocusEvent, useEffect, useState, useRef } from 'react';
import HomePage from './HomePage';

const Safari = () => {
  const [histories, setHistories] = useState<string[]>(['']);
  const [historyCursor, setHistoryCursor] = useState(0);
  const inputRef = useRef<HTMLInputElement>(null);
  const iframeRef = useRef<HTMLIFrameElement>(null);

  const handleFocusInput = (event: FocusEvent<HTMLInputElement, Element>) => {
    event.currentTarget.setSelectionRange(0, event.currentTarget.value.length);
  };

  const handleKeydown = (event: KeyboardEvent<HTMLInputElement>) => {
    if (event.key === 'Enter') {
      let value = event.currentTarget.value;

      if (!value.trim()) return;

      if (!checkUrlProtocol(value)) {
        value = 'https:' + value;
      }

      const url = new URL(value);
      value = `${url.protocol}//${url.hostname}`;

      if (histories[historyCursor] !== value) {
        setHistories([...histories, value]);
        setHistoryCursor(histories.length);
      }
      event.currentTarget.blur();
    }
  };

  const checkUrlProtocol = (url: string) => {
    const protocolPattern = /^(http|https):/;
    return protocolPattern.test(url);
  };

  const handleClickBackButton = () => {
    if (!inputRef.current) return;
    const nextHistoryCursor = Math.max(historyCursor - 1, 0);
    setHistoryCursor(nextHistoryCursor);
  };

  const handleClickNextButton = () => {
    if (!inputRef.current) return;
    const nextHistoryCursor = Math.min(historyCursor + 1, histories.length - 1);
    setHistoryCursor(nextHistoryCursor);
  };

  const handleClickRefreshButton = () => {
    setHistories([...histories]);
  };

  const handleClickHomeButton = () => {
    const copiedHistories = histories.slice(0, historyCursor + 1);
    const cursor = copiedHistories.length;

    if (copiedHistories[cursor] !== '') {
      copiedHistories.push('');
      setHistoryCursor(cursor);
      setHistories(copiedHistories);
    }
  };

  const handleClickBookmark = (value: string) => {
    if (!inputRef.current) return;
    inputRef.current.value = value;
    if (histories[historyCursor] !== value) {
      setHistories([...histories.slice(historyCursor, 1), value]);
      setHistoryCursor(historyCursor + 1);
    }
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

  useEffect(() => {
    if (!inputRef.current) return;
    console.log(histories, historyCursor);
    inputRef.current.value = histories[historyCursor];
  }, [historyCursor, histories]);

  return (
    <div className='flex h-full w-full flex-col bg-white'>
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
      {histories[historyCursor] ? (
        <iframe ref={iframeRef} className='grow' src={histories[historyCursor]} />
      ) : (
        <HomePage onClickBookmark={handleClickBookmark} />
      )}
    </div>
  );
};

export default Safari;
