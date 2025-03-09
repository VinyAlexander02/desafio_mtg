import React, { forwardRef } from "react";
import styled from "styled-components";

const Input = styled.input`
  background: #ffff;
  margin: 1em 0;
  box-sizing: border-box;
  box-shadow: 2px 2px 6px rgba(0, 0, 0, 0.25);
  border-radius: 8px;
  border: none;
  width: 100%;
  padding: 16px;
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

interface InputProps {
  value: string;
  type: "text" | "password" | "email";
  placeholder: string;
  onChange: (value: string) => void;
  label: string;
}

const InputText = forwardRef<HTMLInputElement, InputProps>(
  ({ value, type, placeholder, onChange, label }, ref) => {
    return (
      <Container>
        <Label>{label}</Label>
        <Input
          type={type}
          value={value}
          placeholder={placeholder}
          onChange={(e) => onChange(e.target.value)}
          required
          ref={ref}
        />
      </Container>
    );
  }
);

export default InputText;
