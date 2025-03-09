import React, { forwardRef } from "react";
import styled from "styled-components";

const Select = styled.select`
  background: #ffffff;
  margin: 1em 0;
  box-sizing: border-box;
  box-shadow: 2px 2px 6px rgba(0, 0, 0, 0.25);
  border-radius: 8px;
  border: none;
  width: 100%;
  padding: 16px 5px;
`;

const Label = styled.label`
  display: flex;
  font-weight: 700;
  font-size: 16px;
  line-height: 19px;
  color: black;
  font-family: Arial, Helvetica, sans-serif;
`;

const Container = styled.div`
  width: 50%;
`;

interface InputSelectProps {
  value: string;
  onChange: (e: React.ChangeEvent<HTMLSelectElement>) => void;
  label: string;
  options: { value: string; label: string }[];
}

const InputSelect = forwardRef<HTMLSelectElement, InputSelectProps>(
  ({ value, onChange, label, options }, ref) => {
    return (
      <Container>
        <Label>{label}</Label>
        <Select value={value} onChange={onChange} required ref={ref}>
          {options.map((option) => (
            <option key={option.value} value={option.value}>
              {option.label}
            </option>
          ))}
        </Select>
      </Container>
    );
  }
);

export default InputSelect;
