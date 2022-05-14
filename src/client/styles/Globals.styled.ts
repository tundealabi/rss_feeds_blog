import styled from 'styled-components';

const PageMainHeading = styled.h1`
  align-items: center;
  border-bottom: 1px dashed gray;
  display: flex;
  font-size: 1.5rem;
  text-transform: uppercase;
  font-weight: bold;
  justify-content: space-between;
  margin-bottom: 2rem;

  & > a {
    font-size: 0.7rem;
    text-decoration: none;
  }
`;

export { PageMainHeading };
