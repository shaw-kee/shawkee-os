import ConditionalLink from '@/components/ConditionalLink';

interface Props {
  title: string;
  imageUrl: string;
  isOpen?: boolean;
  link?: string;
}

const DockItem = ({ title, imageUrl, isOpen = false, link = '' }: Props) => {
  return (
    <div className='tooltip flex flex-col w-12 items-center justify-start hover:cursor-pointer'>
      <ConditionalLink link={link}>
        <div className='tooltip-text top-[-50%] inline-flex items-center rounded-md px-3 py-1 text-sm text-black bg-[#F6F6F6B8] shadow-[0_2px_6px_0_rgba(0,0,0,0.20),0_0_0_0.5px_rgba(0,0,0,0.12)]'>
          {title}
        </div>
        <img src={imageUrl} className='w-12 aspect-square' />
        <div className={`w-1 h-1 rounded-full bg-[#575757] ${isOpen ? '' : 'hidden'}`} />
      </ConditionalLink>
    </div>
  );
};

export default DockItem;
