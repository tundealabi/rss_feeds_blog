import { useEffect, useState } from 'react';
import axios from 'axios';
import { useManage } from '../../hooks';
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
  const { manageData } = useManage();
  const [value, setValue] = useState('');
  const handleSetPollingFrequency = async (frequency: string) => {
    setValue(frequency);
    try {
      const resp = await axios.patch('/manage/set-polling-frequency', {
        frequency,
      });
    } catch (error: any) {
      console.log('error', error.message);
    }
  };
  useEffect(() => {
    if (manageData) {
      setValue(manageData.pollingFrequency);
    }
  }, [manageData?.pollingFrequency]);
  return (
    <SelectOptions
      value={value}
      options={options}
      label="polling frequency"
      onChange={handleSetPollingFrequency}
    />
  );
};

export default PollingFrequency;
