import { useRef, useState } from 'react';
import Webcam from 'react-webcam';
import CameraIcon from '@/assets/svg/PhotoBooth/CameraIcon.svg?react';
import CancelIcon from '@/assets/svg/PhotoBooth/CancelIcon.svg?react';

type Photo = { id: number; src: string };

const PhotoBooth = () => {
  const [camLoaded, setCamLoaded] = useState(false);
  const webcamRef = useRef<Webcam>(null);
  const [photos, setPhotos] = useState<Photo[]>([]);
  const [previewImage, setPreviewImage] = useState<Photo | null>(null);

  const webcamClassNames = camLoaded ? 'opacity-100' : 'opacity-0';

  const handleClickButton = () => {
    if (previewImage !== null) {
      setPreviewImage(null);
      return;
    }

    const screenshot = webcamRef.current?.getScreenshot();
    if (screenshot) {
      const id = new Date().getTime();
      const copiedPhotos = [...photos];
      copiedPhotos.unshift({ id, src: screenshot });
      setPhotos(copiedPhotos);
    }
  };

  const handleClickPhoto = (id: number) => {
    const photo = photos.find((photo) => photo.id === id);
    if (photo) setPreviewImage(photo);
  };

  const handleClickDeletePhotoButton = (id: number) => {
    const targetPhotoIndex = photos.findIndex((photo) => photo.id === id);
    if (targetPhotoIndex === -1) return;

    const newPhotos = [...photos.slice(0, targetPhotoIndex), ...photos.slice(targetPhotoIndex + 1)];

    setPhotos(newPhotos);
  };

  return (
    <div className='flex min-h-full flex-col bg-white'>
      <div className='relative flex-grow bg-black'>
        {previewImage && (
          <img
            src={previewImage.src}
            alt={`screenshot-${previewImage.id}`}
            className='absolute z-20 h-full w-full flex-grow object-cover'
          />
        )}
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
        {photos.length !== 0 && (
          <div className='absolute bottom-0 z-30 flex h-20 w-full flex-row-reverse items-center gap-2 overflow-x-scroll bg-white/70 px-2 py-1'>
            {photos.map(({ id, src }) => (
              <div
                key={id}
                className={`relative h-full flex-shrink-0 ${id === previewImage?.id ? 'outline outline-blue-500' : ''}`}
              >
                <button
                  className='absolute left-[-6px] top-0 rounded-full border border-slate-500 bg-[#e5e7eb]/75 p-1 text-md active:opacity-100'
                  onClick={() => handleClickDeletePhotoButton(id)}
                >
                  <CancelIcon width={12} height={12} />
                </button>
                {
                  <img
                    src={src}
                    alt={`screenshot-${id}`}
                    className=' h-full cursor-pointer select-none'
                    draggable={false}
                    onClick={() => handleClickPhoto(id)}
                  />
                }
              </div>
            ))}
          </div>
        )}
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
