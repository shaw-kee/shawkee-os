import { type KeyboardEvent, type FocusEvent, useState } from 'react';

const Safari = () => {
  const [iframeSrc, setIframeSrc] = useState('');

  const handleFocusInput = (event: FocusEvent<HTMLInputElement, Element>) => {
    console.log('click!');
    event.currentTarget.setSelectionRange(0, event.currentTarget.value.length);
  };

  const handleKeydown = (event: KeyboardEvent<HTMLInputElement>) => {
    if (event.key === 'Enter') {
      setIframeSrc(iframeSrc);
      event.currentTarget.blur();
    }
  };

  return (
    <div className='flex min-h-full w-full flex-col bg-white'>
      <form className='flex items-center gap-1 bg-gray-100 px-2 py-2'>
        <button className='aspect-square w-10 rounded-full transition-colors duration-300 hover:bg-gray-200'>{`<`}</button>
        <button className='aspect-square w-10 rounded-full transition-colors duration-300 hover:bg-gray-200'>{`>`}</button>
        <button className='aspect-square w-10 rounded-full transition-colors duration-300 hover:bg-gray-200'>R</button>
        <button className='aspect-square w-10 rounded-full transition-colors duration-300 hover:bg-gray-200'>H</button>
        <input
          className='w-full rounded-full bg-gray-200 px-3 py-1 focus:bg-white'
          onKeyDown={handleKeydown}
          onFocus={handleFocusInput}
        />
      </form>
      <div className='grow bg-blue-400'></div>
    </div>
  );
};

export default Safari;
