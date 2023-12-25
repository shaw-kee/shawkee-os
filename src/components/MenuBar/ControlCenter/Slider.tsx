import { type ComponentPropsWithoutRef } from 'react';

const Slider = ({ value, onChange }: ComponentPropsWithoutRef<'input'>) => {
  return <input className='control-center-slider' type='range' min='0' max='100' value={value} onChange={onChange} />;
};

export default Slider;
