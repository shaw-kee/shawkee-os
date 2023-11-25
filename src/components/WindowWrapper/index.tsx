import { AppStateContext } from '@/store/App/AppContext';
import { useContext } from 'react';
import AppWindow from '@/components/AppWindow';

const WindowWrapper = () => {
  const apps = useContext(AppStateContext);
  const appList = apps.map((app) => {
    if (app.isOpen) return <AppWindow title={app.title} key={app.id} id={app.id} />;
    return false;
  });

  return <div className='absolute bottom-0 left-0 right-0 top-[25px] z-30'>{appList}</div>;
};

export default WindowWrapper;
