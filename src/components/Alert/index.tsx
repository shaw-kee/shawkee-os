import type { ComponentPropsWithoutRef, ReactNode } from 'react';

interface AlertProps {
  title: string;
  description: string;
  appIconUrl?: string;
  children?: ReactNode;
}

const Alert = ({ title, description, appIconUrl, children }: AlertProps) => {
  return (
    <div className='absolute left-1/2 top-1/2 z-50 -translate-x-1/2 -translate-y-1/2 transform'>
      <div className='popup-container flex max-w-[260px] flex-col items-center justify-center gap-4 rounded-[10px] p-[20px_16px_16px_16px] text-[11px]'>
        {appIconUrl && <img src={appIconUrl} alt='app-icon' className='h-16 w-16' />}
        <div className='flex flex-col items-center gap-[10px] text-center'>
          <strong className='text-[13px] font-bold'>{title}</strong>
          <p className='leading-[14px]'>{description}</p>
        </div>
        {children && <div className='flex w-full flex-col gap-1'>{children}</div>}
      </div>
    </div>
  );
};

interface AlertButtonProps extends Omit<ComponentPropsWithoutRef<'button'>, 'className'> {
  fill?: boolean;
}

const AlertButton = ({ fill = false, ...props }: AlertButtonProps) => {
  const colorClasses = fill ? 'bg-[#007AFF] text-white' : 'bg-[#000000]/5';

  return (
    <button
      type='button'
      className={`w-full rounded-[5px] px-[7px] py-1.5 text-[13px] ${colorClasses} active:`}
      {...props}
    />
  );
};

Alert.Button = AlertButton;

export default Alert;
