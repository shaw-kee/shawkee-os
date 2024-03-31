import { useRef, useState } from 'react';
import Webcam from 'react-webcam';
import CameraIcon from '@/assets/icons/PhotoBooth/CameraIcon.svg?react';

const PhotoBooth = () => {
  const [camLoaded, setCamLoaded] = useState(false);
  const webcamRef = useRef<Webcam>(null);

  const webcamClassNames = camLoaded ? 'opacity-100' : 'opacity-0';

  const handleClickButton = () => {
    const screenshot = webcamRef.current?.getScreenshot();
    console.log(screenshot);
  };

  return (
    <div className='flex min-h-full flex-col bg-white'>
      <div className='relative flex-grow bg-black'>
        <Webcam
          className={`${webcamClassNames} absolute h-full w-full flex-grow object-cover transition-opacity duration-500`}
          mirrored={true}
          audio={false}
          screenshotFormat='image/png'
          videoConstraints={{
            facingMode: 'user',
          }}
          onUserMedia={() => setCamLoaded(true)}
          ref={webcamRef}
        />
      </div>
      <div className='flex w-full items-center justify-center bg-[#e5e7eb] py-1'>
        <button className='cursor-auto rounded-full bg-red-500 p-2 active:bg-red-600' onClick={handleClickButton}>
          <CameraIcon width={36} height={36} fill='#fff' />
        </button>
      </div>
    </div>
  );
};

export default PhotoBooth;
