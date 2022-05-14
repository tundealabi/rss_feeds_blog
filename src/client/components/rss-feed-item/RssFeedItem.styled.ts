import styled from 'styled-components';

const RssFeedItemContainer = styled.div<{ isRead: boolean }>`
  align-items: center;
  border-bottom: 1px solid #ccc;
  color: ${(props) => (props.isRead ? '#838B88' : '#000')};
  column-gap: 1rem;
  cursor: ${(props) => (props.isRead ? 'default' : 'pointer')};
  display: flex;
  margin-bottom: 1rem;
  padding-left: 2rem;
`;

const RssFeedItemContainerLeft = styled.div``;

const RssFeedItemImage = styled.img`
  width: 3rem;
`;

const RssFeedItemContainerRight = styled.div`
  display: flex;
  flex-direction: column;
  row-gap: 0.6rem;
`;

const RssFeedItemTitle = styled.h3`
  font-size: 1.1rem;
  font-weight: bold;
`;

const RssFeedItemDescription = styled.p`
  display: -webkit-box;
  overflow: hidden;
  -webkit-line-clamp: 3;
  -webkit-box-orient: vertical;
`;

const RssFeedItemPublishedDate = styled.p``;

export {
  RssFeedItemContainer,
  RssFeedItemContainerLeft,
  RssFeedItemImage,
  RssFeedItemContainerRight,
  RssFeedItemTitle,
  RssFeedItemDescription,
  RssFeedItemPublishedDate,
};
