import { useState } from 'react';
import SelectOptions from '../select-options/SelectOptions';

const options = [
  { name: '5 mins', value: '5' },
  { name: '10 mins', value: '10' },
  { name: '15 mins', value: '15' },
  { name: '20 mins', value: '20' },
  { name: '25 mins', value: '25' },
  { name: '30 mins', value: '30' },
];

const PollingFrequency = () => {
  const [value, setValue] = useState('');
  return (
    <SelectOptions
      value={value}
      options={options}
      label="polling frequency"
      onChange={setValue}
    />
  );
};

export default PollingFrequency;
