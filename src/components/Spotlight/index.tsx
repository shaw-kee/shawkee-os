import SpotlightIcon from '@/assets/icons/SpotlightIcon.svg?react';
import { useEffect, useRef } from 'react';

type SpotlightProps = {
  close: () => void;
};

const Spotlight = ({ close }: SpotlightProps) => {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickAway = (event: Event) => {
      const divElement = ref.current;
      const isClickElementAway = event.target instanceof HTMLElement && !divElement?.contains(event.target);

      if (isClickElementAway) {
        close();
      }
    };

    document.addEventListener('mousedown', handleClickAway);

    return () => {
      document.removeEventListener('mousedown', handleClickAway);
    };
  }, [close]);

  return (
    <div ref={ref} className='absolute left-1/2 top-1/4 z-50 -translate-x-1/2 -translate-y-1/2 transform'>
      <div className='popup-container flex w-[36rem] items-center gap-2 rounded-2xl p-2.5'>
        <SpotlightIcon width={24} height={24} stroke='none' />
        <input placeholder='Spotlight Search' className='w-full bg-[rgba(255,_255,_255,_0)] text-[24px] outline-none' />
      </div>
    </div>
  );
};

export default Spotlight;
