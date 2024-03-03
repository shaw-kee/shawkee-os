import { type KeyboardEvent, type FocusEvent, useState, useEffect, useRef } from 'react';

const Safari = () => {
  const [iframeSrc, setIframeSrc] = useState('');
  const iframeRef = useRef<HTMLIFrameElement>(null);

  const handleFocusInput = (event: FocusEvent<HTMLInputElement, Element>) => {
    console.log('click!');
    event.currentTarget.setSelectionRange(0, event.currentTarget.value.length);
  };

  const handleKeydown = (event: KeyboardEvent<HTMLInputElement>) => {
    if (event.key === 'Enter') {
      let value = event.currentTarget.value;

      if (!checkUrlProtocol(value)) {
        value = 'https://' + value;
      }

      event.currentTarget.value = new URL(value).hostname;

      setIframeSrc(value);
      event.currentTarget.blur();
    }
  };

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
  }, [iframeSrc]);

  return (
    <div className='flex min-h-full w-full flex-col bg-white'>
      <div className='flex items-center gap-1 bg-gray-100 px-2 py-2'>
        <button className='aspect-square w-10 rounded-full transition-colors duration-300 hover:bg-gray-200'>{`<`}</button>
        <button className='aspect-square w-10 rounded-full transition-colors duration-300 hover:bg-gray-200'>{`>`}</button>
        <button className='aspect-square w-10 rounded-full transition-colors duration-300 hover:bg-gray-200'>R</button>
        <button className='aspect-square w-10 rounded-full transition-colors duration-300 hover:bg-gray-200'>H</button>
        <input
          className='w-full rounded-full bg-gray-200 px-3 py-1 focus:bg-white'
          onKeyDown={handleKeydown}
          onFocus={handleFocusInput}
        />
      </div>
      {iframeSrc ? <iframe ref={iframeRef} className='grow' src={iframeSrc} /> : <div className='grow bg-blue-400' />}
    </div>
  );
};

export default Safari;
