import styled from 'styled-components';

const SelectFieldContainer = styled.div`
  display: flex;
  align-items: center;
  column-gap: 0.4rem;
`;

const SelectFieldLabel = styled.label`
  text-transform: capitalize;
`;

const SelectField = styled.select`
  font-size: 1.12rem;
  text-transform: capitalize;
`;

const SelectFieldHelperText = styled.p<{ error: string }>``;

const SelectFieldOption = styled.option``;

export {
  SelectFieldContainer,
  SelectFieldLabel,
  SelectField,
  SelectFieldHelperText,
  SelectFieldOption,
};
