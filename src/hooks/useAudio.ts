import { SystemReducerContext, SystemStateContext } from '@/store/System/SystemContext';
import { useContext, useRef } from 'react';

type useAudioProps = {
  src: string;
  loop?: boolean;
};

const useAudio = ({ src, loop = false }: useAudioProps) => {
  const context = useContext(SystemStateContext);
  const dispatch = useContext(SystemReducerContext);

  if (context === null) {
    throw new Error('context is null. The useAudio hook must be inside an SystemStateProvider.');
  }

  if (dispatch === null) {
    throw new Error('dispatch is null. The useAudio hook must be inside an SystemReducerProvider.');
  }

  const { sound } = context;

  const audioRef = useRef<HTMLAudioElement>(new Audio(src));

  audioRef.current.loop = loop;
  audioRef.current.volume = sound * 0.01;

  audioRef.current.addEventListener('ended', () => {
    dispatch({ type: 'SET_IS_PLAYING', value: false });
  });

  const play = () => {
    audioRef.current.play();
    dispatch({ type: 'SET_IS_PLAYING', value: true });
  };

  const pause = () => {
    audioRef.current.pause();
    dispatch({ type: 'SET_IS_PLAYING', value: false });
  };

  const togglePlay = () => {
    audioRef.current.paused ? play() : pause();
  };

  return { togglePlay };
};

export default useAudio;
