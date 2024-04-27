import React from 'react';
import useTerminal from './useTerminal';

const Terminal = () => {
  const { contents, handleClick } = useTerminal();

  return (
    <div className='flex h-full flex-col overflow-x-auto bg-slate-800/95 p-3 text-white' onClick={handleClick}>
      <div className='mb-1'>
        <span>
          Hello World! Type `<span className='text-yellow-200'>help</span>` to get started.😆
        </span>
      </div>
      {contents.map(({ id, content }) => (
        <React.Fragment key={id}>{content}</React.Fragment>
      ))}
    </div>
  );
};

export default Terminal;
