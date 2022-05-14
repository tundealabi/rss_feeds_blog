import { useEffect, useState } from 'react';
import axios from 'axios';
import { useManage } from '../../hooks';
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
  const { manageData } = useManage();
  const [value, setValue] = useState('');
  const handleSetPreviewLength = async (previewLength: string) => {
    setValue(previewLength);
    try {
      const resp = await axios.patch('/manage/set-preview-length', {
        previewLength,
      });
    } catch (error: any) {
      console.log('error', error.message);
    }
  };
  useEffect(() => {
    if (manageData) {
      setValue(manageData.previewLength);
    }
  }, [manageData?.previewLength]);
  return (
    <SelectOptions
      value={value}
      options={options}
      label="preview length"
      onChange={handleSetPreviewLength}
    />
  );
};

export default PreviewLength;
