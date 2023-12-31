import WifiIcon from '@/assets/icons/WifiIcon.svg?react';
import BluetoothIcon from '@/assets/icons/BluetoothIcon.svg?react';
import AirDropIcon from '@/assets/icons/AirDropIcon.svg?react';
import PlayIcon from '@/assets/icons/PlayIcon.svg?react';
import PauseIcon from '@/assets/icons/PauseIcon.svg?react';
import NightIcon from '@/assets/icons/NightIcon.svg?react';
import CommunicationButton from './CommunicationButton';
import ControlCenterItem from './ControlCenterItem';
import Slider from './Slider';
import { useContext } from 'react';
import { SystemReducerContext, SystemStateContext } from '@/store/System/SystemContext';

type ControlCenterProps = {
  isPlayingMusic?: boolean;
  togglePlay?: () => void;
};

const ControlCenter = ({ isPlayingMusic, togglePlay }: ControlCenterProps) => {
  const { sound, brightness } = useContext(SystemStateContext);
  const dispatch = useContext(SystemReducerContext);

  if (!dispatch) throw new Error('dispatch is null');

  return (
    <div className='gal-2 flex w-80 flex-col gap-2 [&>*]:flex-1'>
      <div className='flex gap-2 [&>*]:flex-1'>
        <div className='[&_*]:gap-2'>
          <ControlCenterItem>
            <CommunicationButton icon={<WifiIcon width={16} height={11} viewBox='0 0 16 11' />} name='Wi-Fi' />
            <CommunicationButton icon={<BluetoothIcon width={16} height={16} viewBox='0 0 24 24' />} name='Bluetooth' />
            <CommunicationButton icon={<AirDropIcon width={16} height={16} viewBox='0 0 29 29' />} name='AirDrop' />
          </ControlCenterItem>
        </div>
        <div className='flex flex-col gap-2 [&>*]:flex-1 [&_*]:gap-2'>
          <div>
            <ControlCenterItem>
              <CommunicationButton
                icon={<NightIcon width={16} height={16} viewBox='0 0 29 29' />}
                name='Focus'
                showDescription={false}
              />
            </ControlCenterItem>
          </div>
          <div className='flex h-full items-center gap-2 text-[10px]'>
            <ControlCenterItem>
              <div className='text-center'>Stage Manager</div>
            </ControlCenterItem>
            <ControlCenterItem>
              <div className='text-center'>Screen Mirroring</div>
            </ControlCenterItem>
          </div>
        </div>
      </div>

      <ControlCenterItem>
        <div className='mb-1 text-[11px] font-semibold'>Display</div>
        <Slider
          value={brightness}
          onChange={(event) => dispatch({ type: 'SET_BRIGHTNESS', value: Number(event.target.value) })}
        />
      </ControlCenterItem>

      <ControlCenterItem>
        <div className='mb-1 text-[11px] font-semibold'>Sound</div>
        <Slider
          value={sound}
          onChange={(event) => dispatch({ type: 'SET_SOUND', value: Number(event.target.value) })}
        />
      </ControlCenterItem>

      <ControlCenterItem>
        <div className='flex gap-2'>
          <div className='h-10 w-10 rounded-md bg-slate-500/50' />
          <div className='flex flex-grow flex-col justify-center'>
            <div className='text-[11px] font-semibold'>Title</div>
            <div className='text-[10px]'>Shaekee - Shakee 1st album</div>
          </div>
          <button className='cursor-default' onClick={togglePlay}>
            {isPlayingMusic ? <PauseIcon /> : <PlayIcon />}
          </button>
        </div>
      </ControlCenterItem>
    </div>
  );
};
export default ControlCenter;
