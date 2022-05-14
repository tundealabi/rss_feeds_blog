import styled from 'styled-components';

const PageMainHeading = styled.h1`
  display: flex;
  align-items: center;
  justify-content: space-between;
  font-size: 1.5rem;
  text-transform: uppercase;
  font-weight: bold;
  margin-bottom: 2rem;
  border-bottom: 1px dashed gray;

  & > a {
    font-size: 0.7rem;
    text-decoration: none;
  }
`;

export { PageMainHeading };
