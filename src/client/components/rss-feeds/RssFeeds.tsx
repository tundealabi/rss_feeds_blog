import { useRssFeeds } from '../../hooks';
import { RssFeedsContainer } from './RssFeeds.styled';
import RssFeedItem from '../rss-feed-item/RssFeedItem';
import RssFeed from '../rss-feed/RssFeed';

const RssFeeds = ({ type }: { type: 'following' | 'manage' }) => {
  const { feeds, isLoading, isError } = useRssFeeds();

  return (
    <>
      {isLoading ? (
        <div>Loading Feeds...</div>
      ) : isError ? (
        <div>Error fetching feeds...try again by reloading</div>
      ) : (
        feeds.map((feed) => {
          return (
            <RssFeedsContainer>
              <RssFeed
                key={feed._id}
                id={feed._id}
                image={feed.image}
                title={feed.title}
                link={feed.link}
                type={type}
              />
              <div>
                {feed.items.map((item) => {
                  return (
                    <RssFeedItem
                      key={item._id}
                      _id={item._id}
                      feedId={feed._id}
                      image={item.image}
                      isRead={item.isRead}
                      title={item.title}
                      description={item.description}
                      link={item.link}
                      publishedDate={item.publishedDate}
                    />
                  );
                })}
              </div>
            </RssFeedsContainer>
          );
        })
      )}
    </>
  );
};

export default RssFeeds;
