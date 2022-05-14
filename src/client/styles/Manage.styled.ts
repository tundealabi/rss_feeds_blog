import styled from 'styled-components';

const ManageContentContainer = styled.div`
  @media (min-width: 768px) {
    margin-inline: auto;
    width: 70%;
  }
`;

const FeedsContainer = styled.div`
  margin-top: 5rem;
`;

const FeedsHeading = styled.h2`
  font-size: 1.13rem;
  font-weight: bold;
  margin-bottom: 1rem;
`;

export { ManageContentContainer, FeedsContainer, FeedsHeading };
