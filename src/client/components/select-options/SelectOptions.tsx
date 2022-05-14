import {
  SelectField,
  SelectFieldContainer,
  SelectFieldLabel,
  SelectFieldOption,
} from './SelectOptions.styled';

const SelectOptions = ({
  options,
  onChange,
  label,
  value,
  ...props
}: {
  options: { name: string; value: string }[];
  onChange: (value: string) => void;
  value: string;
  label: string;
}) => {
  return (
    <SelectFieldContainer>
      <SelectFieldLabel>{label}: </SelectFieldLabel>
      <SelectField
        {...props}
        value={value}
        onChange={(ev) => onChange(ev.target.value)}
      >
        {options.map((option) => (
          <SelectFieldOption key={option.value} value={option.value}>
            {option.name}
          </SelectFieldOption>
        ))}
      </SelectField>
    </SelectFieldContainer>
  );
};

export default SelectOptions;
