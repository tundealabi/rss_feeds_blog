import { useState } from 'react';
import SelectOptions from '../select-options/SelectOptions';

const options = [
  { name: 'one', value: '1' },
  { name: 'two', value: '2' },
  { name: 'three', value: '3' },
  { name: 'four', value: '4' },
  { name: 'five', value: '5' },
  { name: 'six', value: '6' },
];

const PreviewLength = () => {
  const [value, setValue] = useState('');
  return (
    <SelectOptions
      value={value}
      options={options}
      label="preview length"
      onChange={setValue}
    />
  );
};

export default PreviewLength;
