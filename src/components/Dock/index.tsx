import apps from '@/config/apps';
import DockItem from '@/components/Dock/DockItem';
import { useMotionValue } from 'framer-motion';
import { DOCK_SIZE } from '@/constants/dock';

const Dock = () => {
  const mousePosition = useMotionValue(Infinity);
  const handleMouseMove = (e: React.MouseEvent) => mousePosition.set(e.clientX);
  const handleMouseLeave = () => mousePosition.set(Infinity);

  return (
    <div
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      className='absolute bottom-[5px] left-[50%] flex translate-x-[-50%] gap-1 rounded-2xl border border-[#f3f3f323] bg-[#F6F6F6]/[0.36] p-1 shadow-[0_0_6px_0_rgba(0,0,0,0.15)] backdrop-blur-[68px]'
      style={{ height: DOCK_SIZE + 10 }}
    >
      {apps.map((app) => (
        <DockItem
          key={app.id}
          title={app.title}
          imageUrl={app.imageUrl}
          link={app.link}
          mousePosition={mousePosition}
        />
      ))}
    </div>
  );
};

export default Dock;
