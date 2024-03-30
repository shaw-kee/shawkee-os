import { useEffect, useRef } from 'react';

const mediaStreamConstraints = {
  audio: false,
  video: { width: 800, height: 600 },
};

const PhotoBooth = () => {
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    navigator.mediaDevices
      .getUserMedia(mediaStreamConstraints)
      .then((mediaStream) => {
        if (!videoRef.current) return;
        videoRef.current.srcObject = mediaStream;
        videoRef.current.onloadedmetadata = () => {
          videoRef.current?.play();
        };
      })
      .catch(() => console.error('Can not found video'));
  }, []);

  return (
    <div className='min-h-full bg-white'>
      <video ref={videoRef} className='[transform:rotateY(180deg)]' />
    </div>
  );
};

export default PhotoBooth;
