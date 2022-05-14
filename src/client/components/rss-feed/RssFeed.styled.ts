import styled from 'styled-components';

const RssFeedContainer = styled.div`
  align-items: center;
  column-gap: 1rem;
  display: flex;
  margin-bottom: 1rem;
`;

const RssFeedContainerLeft = styled.div`
  flex-basis: 30%;
`;

const RssFeedImage = styled.img`
  width: 100%;
`;

const RssFeedContainerRight = styled.div`
  display: flex;
  flex-direction: column;
  row-gap: 0.3rem;
`;

const RssFeedTitle = styled.h2`
  font-size: 1.5rem;
  font-weight: bold;
  text-transform: capitalize;
`;

const RssFeedSiteLink = styled.a`
  font-size: 1.3rem;
  text-transform: capitalize;
`;

const RssFeedDeleteButton = styled.button`
  /* border-radius: 1.875rem; */
  border-radius: 0.4rem;
  height: 2.375rem;
  width: 4.375rem;
  margin-top: 1rem;
  text-transform: capitalize;
`;

export {
  RssFeedContainer,
  RssFeedContainerLeft,
  RssFeedImage,
  RssFeedContainerRight,
  RssFeedTitle,
  RssFeedSiteLink,
  RssFeedDeleteButton,
};
