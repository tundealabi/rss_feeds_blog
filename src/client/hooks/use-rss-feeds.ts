import useSWR from 'swr';
import { fetcher } from '../helpers';
import { IRssFeeds } from '../components/rss-feeds/rss-feeds.interface';

export const useRssFeeds = () => {
  const { data, error } = useSWR<IRssFeeds[]>('/rss-feeds', fetcher);

  return {
    feeds: data || [],
    isLoading: !error && !data,
    isError: error,
  };
};
