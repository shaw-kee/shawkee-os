import ConditionalLink from '@/components/ConditionalLink';
import { useCalculatedWidth } from '@/components/Dock/useCalculatedWidth';
import { AppReducerContext } from '@/store/App/AppContext';
import { motion, MotionValue } from 'framer-motion';
import { useContext, useRef } from 'react';

interface Props {
  title: string;
  id: string;
  imageUrl: string;
  isOpen?: boolean;
  link?: string;
  mousePosition: MotionValue;
}

const DockItem = ({ id, title, imageUrl, isOpen = false, link = '', mousePosition }: Props) => {
  const dispatch = useContext(AppReducerContext);
  const ref = useRef<HTMLDivElement>(null);
  const width = useCalculatedWidth(mousePosition, ref);

  if (!dispatch) throw new Error('dispatch is null');

  const handleClick = () => {
    if (link === '') dispatch({ type: 'OPEN', id });
  };

  return (
    <motion.div
      ref={ref}
      style={{ width }}
      className='tooltip flex flex-col items-center justify-end hover:cursor-pointer'
      onClick={handleClick}
    >
      <div className='tooltip-text top-[calc(-100%-10px)] inline-flex items-center rounded-md bg-[#F6F6F6B8] px-3 py-1 text-sm text-black shadow-[0_2px_6px_0_rgba(0,0,0,0.20),0_0_0_0.5px_rgba(0,0,0,0.12)]'>
        {title}
      </div>
      <div>
        <ConditionalLink link={link}>
          <img src={imageUrl} className='aspect-square w-full active:contrast-50' draggable={false} />
          <div className={`absolute bottom-[2px] h-1 w-1 rounded-full bg-[#575757] ${isOpen ? '' : 'hidden'}`} />
        </ConditionalLink>
      </div>
    </motion.div>
  );
};

export default DockItem;
