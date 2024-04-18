import DockItem from '@/components/Dock/DockItem';
import { useMotionValue } from 'framer-motion';
import { useContext, useEffect, useRef } from 'react';
import { AppStateContext } from '@/store/App/AppContext';

const Dock = () => {
  const apps = useContext(AppStateContext);
  const mousePosition = useMotionValue(Infinity);
  const dockRef = useRef<HTMLDivElement>(null);
  const dockHeight = useRef<number>(0);

  useEffect(() => {
    if (dockRef.current) dockHeight.current = dockRef.current.offsetHeight;
  }, []);

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!dockRef.current) return;

    dockRef.current.style.height = `${dockHeight.current}px`;
    mousePosition.set(e.clientX);
  };
  const handleMouseLeave = () => mousePosition.set(Infinity);

  return (
    <div
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      className='absolute bottom-[5px] left-[50%] z-50 flex translate-x-[-50%] gap-2 rounded-2xl border border-[#f3f3f323] bg-[#F6F6F6]/[0.36] p-2 shadow-[0_0_6px_0_rgba(0,0,0,0.15)] backdrop-blur-[68px]'
      ref={dockRef}
    >
      {apps.map((app) => (
        <DockItem
          key={app.id}
          id={app.id}
          title={app.title}
          imageUrl={app.imageUrl}
          link={app.link}
          mousePosition={mousePosition}
          isOpen={app.isOpen}
        />
      ))}
    </div>
  );
};

export default Dock;
