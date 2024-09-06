export const Info = () => {
  return (
    <div className='flex flex-col gap-4'>
      <div>
        <div className='flex gap-2'>
          <span className='text-fuchsia-400'>const</span>
          <span className='text-amber-500'>Shaw</span>
          <span className='text-teal-400'>=</span>
          <span className='text-yellow-400'>{'{'}</span>
        </div>
        <ul className='pl-4'>
          <li>
            <span className='text-stone-300'>github</span>
            <span className='text-teal-400'>: </span>
            <a href='https://github.com/minjongbaek' target='_blank' className='text-lime-400'>
              https://github.com/minjongbaek
            </a>
          </li>
          <li>
            <span className='text-stone-300'>blog</span>
            <span className='text-teal-400'>: </span>
            <a href='https://blog.minjong.dev' target='_blank' className='text-lime-400'>
              https://blog.minjong.dev
            </a>
          </li>
          <li>
            <span className='text-stone-300'>contact</span>
            <span className='text-teal-400'>: </span>
            <a href='mailto:minjongbaek@gmail.com' className='text-lime-400'>
              minjongbaek@gmail.com
            </a>
          </li>
        </ul>
        <span className='text-yellow-400'>{'}'}</span>
      </div>
      <div>
        <div className='flex gap-2'>
          <span className='text-fuchsia-400'>const</span>
          <span className='text-amber-500'>Mckee</span>
          <span className='text-teal-400'>=</span>
          <span className='text-yellow-400'>{'{'}</span>
        </div>
        <ul className='pl-4'>
          <li>
            <span className='text-stone-300'>github</span>
            <span className='text-teal-400'>: </span>
            <a href='https://github.com/jaeung-E' target='_blank' className='text-lime-400'>
              https://github.com/jaeung-E
            </a>
          </li>
          <li>
            <span className='text-stone-300'>blog</span>
            <span className='text-teal-400'>: </span>
            <a href='https://blog.mckee.codes/' target='_blank' className='text-lime-400'>
              https://blog.mckee.codes/
            </a>
          </li>
          <li>
            <span className='text-stone-300'>contact</span>
            <span className='text-teal-400'>: </span>
            <a href='mailto:jaeung5169@naver.com' className='text-lime-400'>
              jaeung5169@naver.com
            </a>
          </li>
        </ul>
        <span className='text-yellow-400'>{'}'}</span>
      </div>
    </div>
  );
};

export const DoingWhat = () => {
  return (
    <div>
      <div className='flex gap-1'>
        <span className='text-fuchsia-400'>while</span>
        <div>
          <span className='text-blue-400'>{'('}</span>
          <span className='text-stone-300'>isJobless</span>
          <span className='text-blue-400'>{')'}</span>
        </div>
        <span className='text-blue-400'>{'{'}</span>
      </div>
      <div className='pl-4'>
        <span className='text-sky-400'>jobHunting</span>
        <span className='text-yellow-400'>{'('}</span>
        <span className='text-yellow-400'>{')'}</span>
        <span className='text-stone-300'>;</span>
      </div>
      <span className='text-blue-400'>{'}'}</span>
    </div>
  );
};
