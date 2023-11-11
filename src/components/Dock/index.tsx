import apps from '@/config/apps';
import DockItem from '@/components/Dock/DockItem';

const Dock = () => {
  return (
    <>
      <div className='flex gap-1 h-[65px] absolute p-1 bottom-[5px] left-[50%] translate-x-[-50%] bg-[#F6F6F6]/[0.36] border rounded-2xl border-[#f3f3f323] shadow-[0_0_6px_0_rgba(0,0,0,0.15)] backdrop-blur-[68px]'>
        {apps.map((app) => (
          <DockItem key={app.id} title={app.title} imageUrl={app.imageUrl} link={app.link} />
        ))}
      </div>
    </>
  );
};

export default Dock;
