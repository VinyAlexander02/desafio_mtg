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

export default function InputText({
  value,
  type,
  placeholder,
  onChange,
  label,
}: Readonly<InputProps>) {
  return (
    <Container>
      <Label>{label}</Label>
      <Input
        type={type}
        value={value}
        placeholder={placeholder}
        onChange={(e) => onChange(e.target.value)}
        required
      />
    </Container>
  );
}
