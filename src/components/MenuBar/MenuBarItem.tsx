import type { ReactNode } from 'react';
import { Menu } from '@/types/menu';
import Alert from '../Alert';
import useOverlay from '@/hooks/useOverlay';

interface MenuBarItemProps {
  isAppName?: boolean;
  children: ReactNode;
  menus?: Menu[];
  onClick?: (event: React.MouseEvent<HTMLButtonElement>) => void;
}

const MenuBarItem = ({ isAppName = false, children, onClick }: MenuBarItemProps) => {
  const fontWeightClass = isAppName ? 'font-bold' : 'font-base';

  const overlay = useOverlay();

  return (
    <>
      <button
        type='button'
        className={`text cursor-default rounded-[4px] px-[11px] py-[4px] text-[13px] leading-[16px] active:bg-[#090909]/10 ${fontWeightClass}`}
        onMouseDown={(event) => {
          onClick
            ? onClick(event)
            : overlay.open(
                <Alert
                  appIconUrl='src/assets/icons/Dock/Safari_Icon.png'
                  title='Title'
                  description='Description text about this alert is shown 
                  here, explaining to users what the options 
                  underneath are about and what to do.'
                >
                  <Alert.Button fill onClick={overlay.close}>
                    Close Button
                  </Alert.Button>
                  <Alert.Button>Dummy Button</Alert.Button>
                </Alert>
              );
        }}
      >
        {children}
      </button>
    </>
  );
};

export default MenuBarItem;
