import axios from 'axios';
import { useSWRConfig } from 'swr';
import { IRssFeed } from './rss-feed.interface';
import {
  RssFeedContainer,
  RssFeedContainerLeft,
  RssFeedContainerRight,
  RssFeedDeleteButton,
  RssFeedImage,
  RssFeedSiteLink,
  RssFeedTitle,
} from './RssFeed.styled';

const RssFeed = ({ id, image, title, link, type }: IRssFeed) => {
  const { mutate } = useSWRConfig();
  const handleDelete = async () => {
    try {
      const resp = await axios.delete(`/rss-feeds/${id}`);
      mutate('/rss-feeds');
      alert('RSS feed deleted successfully');
    } catch (error: any) {
      alert('Error deleting RSS feed');
    }
  };
  return (
    <RssFeedContainer>
      <RssFeedContainerLeft>
        <RssFeedImage src={image} />
      </RssFeedContainerLeft>
      <RssFeedContainerRight>
        <RssFeedTitle>{title}</RssFeedTitle>
        {type === 'following' && (
          <RssFeedSiteLink href={link} target="_blank">
            visit page
          </RssFeedSiteLink>
        )}
        {type === 'manage' && (
          <RssFeedDeleteButton onClick={handleDelete}>
            delete
          </RssFeedDeleteButton>
        )}
      </RssFeedContainerRight>
    </RssFeedContainer>
  );
};

export default RssFeed;
