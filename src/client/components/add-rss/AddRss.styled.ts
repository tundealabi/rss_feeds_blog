import styled from 'styled-components';

const AddRssContainer = styled.form``;

const AddRssInputFieldContainer = styled.div`
  margin-bottom: 1rem;
`;

const AddRssInputField = styled.input`
  border-radius: 0.4rem;
  margin-bottom: 0.3rem;
  padding: 0.468rem 0.8rem;
  width: 90%;
`;

const AddRssInputFieldHelperText = styled.p<{ error: string }>`
  color: ${(props) => (props.error ? 'red' : 'black')};
  font-size: 0.82rem;
  padding-inline: 0.62rem;
  visibility: ${(props) => (props.error ? 'visible' : 'hidden')};
`;

const AddRssButton = styled.button`
  border-radius: 1.875rem;
  cursor: pointer;
  height: 2.375rem;
  width: 9.375rem;
`;

export {
  AddRssContainer,
  AddRssInputFieldContainer,
  AddRssInputField,
  AddRssInputFieldHelperText,
  AddRssButton,
};
