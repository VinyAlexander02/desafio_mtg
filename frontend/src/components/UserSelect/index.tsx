import React, { useState } from "react";
import { styled } from "styled-components";

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

export default function UserRoleSelect() {
  const [userRole, setUserRole] = useState("");
  return (
    <Container>
      <Label>Grupo</Label>
      <Select
        id="userRole"
        value={userRole}
        onChange={(e) => setUserRole(e.target.value)}
      >
        <option value="">Selecione um grupo</option>
        <option value="leadership">Liderança</option>
        <option value="developer">Desenvolvedor</option>
        <option value="datas">Dados</option>
      </Select>
    </Container>
  );
}
