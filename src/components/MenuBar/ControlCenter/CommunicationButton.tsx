import { useState, type ReactNode } from 'react';

type CommunicationButtonProps = {
  icon: ReactNode;
  name: string;
  showDescription?: boolean;
};

const CommunicationButton = ({ icon, name, showDescription = true }: CommunicationButtonProps) => {
  const [isActive, setIsActive] = useState(false);
  const iconColorClass = isActive ? '[&>svg]:fill-white bg-[#007AFF]' : '[&>svg]:fill-black bg-[#aaaaaa]';

  return (
    <div className='flex w-full items-center px-0.5 py-1'>
      <div className='flex items-center gap-2'>
        <button className='flex cursor-default items-center' onClick={() => setIsActive((prevActive) => !prevActive)}>
          <span className={`flex h-6 w-6 items-center justify-center rounded-full ${iconColorClass}`}>{icon}</span>

          <div className='text-left [&>*]:leading-3'>
            <div className='text-[11px]'>{name}</div>
            {showDescription && <div className='text-[10px]'>{isActive ? 'On' : 'Off'}</div>}
          </div>
        </button>
      </div>
    </div>
  );
};

export default CommunicationButton;
