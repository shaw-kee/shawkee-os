import SpotlightIcon from '@/assets/icons/SpotlightIcon.svg?react';
import { AppReducerContext, AppStateContext } from '@/store/App/AppContext';
import { useContext, useEffect, useRef, useState } from 'react';

type SpotlightProps = {
  close: () => void;
};

const Spotlight = ({ close }: SpotlightProps) => {
  const apps = useContext(AppStateContext);
  const dispatch = useContext(AppReducerContext);

  if (!dispatch) throw new Error('dispatch is null');

  const [suggestedApps, setSuggestedApps] = useState<typeof apps>([]);
  const [cursor, setCursor] = useState(0);

  const ref = useRef<HTMLDivElement>(null);

  const handleChangeInput = (event: React.ChangeEvent<HTMLInputElement>) => {
    const keyword = event.target.value.toLowerCase();
    if (keyword.trim() === '') {
      setSuggestedApps([]);
      return;
    }
    const selectedApps = apps.filter((app) => app.title.toLowerCase().includes(keyword));
    setSuggestedApps(selectedApps);
  };

  const handleClickApp = (id: (typeof apps)[number]['id']) => {
    dispatch({ type: 'OPEN', id });
    close();
    setSuggestedApps([]);
  };

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

  useEffect(() => {
    const handleKeydown = (event: KeyboardEvent) => {
      switch (event.key) {
        case 'ArrowDown':
          setCursor(cursor === suggestedApps.length - 1 ? 0 : cursor + 1);
          event.preventDefault();
          return;
        case 'ArrowUp':
          setCursor(cursor === 0 ? suggestedApps.length - 1 : cursor - 1);
          event.preventDefault();
          return;
        case 'Enter':
          dispatch({ type: 'OPEN', id: suggestedApps[cursor].id });
          close();
          return;
        default:
          setCursor(0);
          return;
      }
    };

    document.addEventListener('keydown', handleKeydown);

    return () => {
      document.removeEventListener('keydown', handleKeydown);
    };
  }, [cursor, suggestedApps, dispatch, close]);

  const activeCursorClasses = 'bg-blue-500 text-white';

  return (
    <div ref={ref} className='absolute left-1/2 top-[20%] z-50 -translate-x-1/2 transform'>
      <div className='popup-container flex w-[36rem] flex-col rounded-2xl p-2.5'>
        <div className='flex items-center gap-2'>
          <SpotlightIcon width={24} height={24} stroke='none' />
          <input
            placeholder='Spotlight Search'
            className='w-full bg-[rgba(255,_255,_255,_0)] text-[24px] outline-none'
            onChange={handleChangeInput}
          />
        </div>
        <ul className='space-y-2'>
          {suggestedApps.map(({ id, title, imageUrl }, index) => (
            <li
              key={id}
              className={`select-none rounded-md px-1.5 py-0.5 first-of-type:mt-2 ${
                cursor === index ? activeCursorClasses : ''
              }`}
              onClick={() => handleClickApp(id)}
            >
              <div className='flex items-center gap-1'>
                <img src={imageUrl} className='h-5 w-5' />
                <div>{title}</div>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default Spotlight;
