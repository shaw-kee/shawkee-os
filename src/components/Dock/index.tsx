import DockItem from './DockItem';

const Dock = () => {
  return (
    <>
      <div className='flex gap-1 absolute p-1 bottom-[5px] left-[50%] translate-x-[-50%] bg-[#F6F6F6]/[0.36] border rounded-2xl border-[#f3f3f323] shadow-[0_0_6px_0_rgba(0,0,0,0.15)] backdrop-blur-[68px]'>
        <DockItem title='Notes' imageUrl='src/assets/icons/Notes_Icon.png' />
        <DockItem title='Calculator' imageUrl='src/assets/icons/Calculator_Icon.png' />
      </div>
    </>
  );
};

export default Dock;
