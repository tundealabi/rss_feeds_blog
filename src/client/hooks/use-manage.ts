import useSWR from 'swr';
import { fetcher } from '../helpers';

interface IUseManage {
  pollingFrequency: string;
  previewLength: string;
}

export const useManage = () => {
  const { data, error } = useSWR<IUseManage>('/manage', fetcher);

  return {
    manageData: data,
    isLoading: !error && !data,
    isError: error,
  };
};
