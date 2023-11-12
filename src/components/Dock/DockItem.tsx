import ConditionalLink from '@/components/ConditionalLink';
import { useCalculatedWidth } from '@/hooks/useCalculatedWidth';
import { motion, MotionValue } from 'framer-motion';
import { useRef } from 'react';

interface Props {
  title: string;
  imageUrl: string;
  isOpen?: boolean;
  link?: string;
  mousePosition: MotionValue;
}

const DockItem = ({ title, imageUrl, isOpen = false, link = '', mousePosition }: Props) => {
  const ref = useRef<HTMLDivElement>(null);
  const width = useCalculatedWidth(mousePosition, ref, 50);

  return (
    <motion.div
      ref={ref}
      style={{ width }}
      className='tooltip flex flex-col items-center justify-end hover:cursor-pointer'
    >
      <ConditionalLink link={link}>
        <div className='tooltip-text top-[calc(-100%-10px)] inline-flex items-center rounded-md px-3 py-1 text-sm text-black bg-[#F6F6F6B8] shadow-[0_2px_6px_0_rgba(0,0,0,0.20),0_0_0_0.5px_rgba(0,0,0,0.12)]'>
          {title}
        </div>
        <img src={imageUrl} className='w-full aspect-square' />
        <div className={`w-1 h-1 absolute bottom-[2px] rounded-full bg-[#575757] ${isOpen ? '' : 'hidden'}`} />
      </ConditionalLink>
    </motion.div>
  );
};

export default DockItem;
