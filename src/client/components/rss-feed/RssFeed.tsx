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
  return (
    <RssFeedContainer>
      <RssFeedContainerLeft>
        <RssFeedImage src={image} />
      </RssFeedContainerLeft>
      <RssFeedContainerRight>
        <RssFeedTitle>{title}</RssFeedTitle>
        <RssFeedSiteLink href={link} target="_blank">
          visit page
        </RssFeedSiteLink>
        {type === 'manage' && (
          <RssFeedDeleteButton
            onClick={() => {
              console.log('delete feed: ' + id);
            }}
          >
            delete
          </RssFeedDeleteButton>
        )}
      </RssFeedContainerRight>
    </RssFeedContainer>
  );
};

export default RssFeed;
