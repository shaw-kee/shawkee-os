import DockItem from '@/components/Dock/DockItem';
import { useMotionValue } from 'framer-motion';
import { useContext } from 'react';
import { AppStateContext } from '@/store/App/AppContext';
import { DOCK_SIZE } from '@/constants/dock';

const Dock = () => {
  const apps = useContext(AppStateContext);
  const mousePosition = useMotionValue(Infinity);
  const handleMouseMove = (e: React.MouseEvent) => mousePosition.set(e.clientX);
  const handleMouseLeave = () => mousePosition.set(Infinity);

  return (
    <div
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      className='absolute bottom-[5px] left-[50%] z-50 flex translate-x-[-50%] gap-2 rounded-2xl border border-[#f3f3f323] bg-[#F6F6F6]/[0.36] p-2 shadow-[0_0_6px_0_rgba(0,0,0,0.15)] backdrop-blur-[68px]'
      style={{ height: DOCK_SIZE + 18 }}
    >
      {apps.map((app) =>
        app.type === 'window' ? (
          <DockItem
            key={app.id}
            id={app.id}
            title={app.title}
            imageUrl={app.imageUrl}
            mousePosition={mousePosition}
            isOpen={app.isOpen}
          />
        ) : (
          <DockItem
            key={app.id}
            id={app.id}
            title={app.title}
            imageUrl={app.imageUrl}
            mousePosition={mousePosition}
            link={app.link}
          />
        )
      )}
    </div>
  );
};

export default Dock;
