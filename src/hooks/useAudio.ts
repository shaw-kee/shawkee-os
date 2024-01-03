import { SystemStateContext } from '@/store/System/SystemContext';
import { useContext, useRef, useState } from 'react';

type useAudioProps = {
  src: string;
  loop?: boolean;
};

const useAudio = ({ src, loop = false }: useAudioProps) => {
  const context = useContext(SystemStateContext);

  if (context === null) {
    throw new Error('context is null. The useAudio hook must be inside an SystemStateProvider.');
  }

  const [isPlaying, setIsPlaying] = useState(false);

  const { sound } = context;

  const audioRef = useRef<HTMLAudioElement>(new Audio(src));

  audioRef.current.loop = loop;
  audioRef.current.volume = sound * 0.01;

  audioRef.current.addEventListener('ended', () => {
    setIsPlaying(false);
  });

  const play = () => {
    audioRef.current.play();
    setIsPlaying(true);
  };

  const pause = () => {
    audioRef.current.pause();
    setIsPlaying(false);
  };

  const togglePlay = () => {
    audioRef.current.paused ? play() : pause();
  };

  return { isPlaying, togglePlay };
};

export default useAudio;
