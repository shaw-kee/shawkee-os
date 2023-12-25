import { type ChangeEvent, useState } from 'react';

const Slider = () => {
  const [value, setValue] = useState(0);

  const handleSilderChange = (event: ChangeEvent<HTMLInputElement>) => {
    setValue(Number(event.target.value));
  };

  return (
    <input
      className='control-center-slider'
      type='range'
      min='0'
      max='100'
      value={value}
      onChange={handleSilderChange}
    />
  );
};

export default Slider;
