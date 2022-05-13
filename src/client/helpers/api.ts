import axios from 'axios';

export const requestMarkAsRead = async (feedId: string, feedItemId: string) => {
  const resp = await axios.patch(`/rss-feeds/${feedId}/${feedItemId}`);
  console.log('resp', resp.data);
  return resp.data;
};
