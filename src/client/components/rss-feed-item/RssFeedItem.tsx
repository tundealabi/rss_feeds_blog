import React from 'react';
import { useSWRConfig } from 'swr';
import { requestMarkAsRead } from '../../helpers';
import { IRssFeedItem } from './rss-feed-item.interface';
import {
  RssFeedItemContainer,
  RssFeedItemContainerLeft,
  RssFeedItemImage,
  RssFeedItemContainerRight,
  RssFeedItemTitle,
  RssFeedItemDescription,
  RssFeedItemPublishedDate,
} from './RssFeedItem.styled';

const RssFeedItem = ({
  _id: id,
  feedId,
  image,
  isRead,
  title,
  description,
  link,
  publishedDate,
}: IRssFeedItem) => {
  const { mutate } = useSWRConfig();

  const handleMarkAsRead = async () => {
    if (!isRead) {
      await requestMarkAsRead(feedId, id);
      mutate('/rss-feeds');
    }
  };
  return (
    <RssFeedItemContainer isRead={isRead} onClick={handleMarkAsRead}>
      <RssFeedItemContainerLeft>
        <RssFeedItemImage src={image} />
      </RssFeedItemContainerLeft>
      <RssFeedItemContainerRight>
        <RssFeedItemTitle>{title}</RssFeedItemTitle>
        <RssFeedItemDescription>{description}</RssFeedItemDescription>
        <RssFeedItemPublishedDate>{publishedDate}</RssFeedItemPublishedDate>
      </RssFeedItemContainerRight>
    </RssFeedItemContainer>
  );
};

export default RssFeedItem;
