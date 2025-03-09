import React, { useState, useRef } from "react";
import styled from "styled-components";
import Button from "../Button";
import InputText from "../Input";
import UserRoleSelect from "../UserSelect";
import InputSelect from "../InputSelect";

const ModalContainer = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: rgba(0, 0, 0, 0.5);
  display: flex;
  align-items: center;
  justify-content: center;
`;

const ModalContent = styled.div`
  background-color: white;
  padding: 20px;
  border-radius: 8px;
  width: 500px;
  text-align: center;
`;

const H1 = styled.h1`
  font-family: Arial, Helvetica, sans-serif;
`;

const Forms = styled.form`
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  padding-bottom: 30px;
  border-radius: 10px;
`;

const CloseButton = styled(Button)`
  background-color: #ff0000;

  &:hover {
    background-color: #f03939;
  }
`;

interface ModalProps {
  onClose: () => void;
}

export default function UserModal({ onClose }: Readonly<ModalProps>) {
  const [completName, setCompletName] = useState("");
  const [emailUser, setEmailUser] = useState("");
  const [passwordCreateUser, setPasswordCreateUser] = useState("");
  const [status, setStatus] = useState<boolean | undefined>(undefined);

  const nameRef = useRef<HTMLInputElement | null>(null);
  const emailRef = useRef<HTMLInputElement | null>(null);
  const passwordRef = useRef<HTMLInputElement | null>(null);
  const statusRef = useRef<HTMLSelectElement | null>(null);
  const groupRef = useRef<HTMLSelectElement | null>(null);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Nome:", completName);
    console.log("Email:", emailUser);
    console.log("Senha:", passwordCreateUser);
    console.log("Status:", status);
  };

  const statusValue =
    status === true ? "Ativo" : status === false ? "Inativo" : "";

  return (
    <ModalContainer>
      <ModalContent>
        <H1>Criar novo usuário</H1>
        <Forms onSubmit={handleSubmit}>
          <InputText
            type="text"
            value={completName}
            placeholder="Digite o seu nome completo ..."
            onChange={setCompletName}
            label="Nome Completo"
            ref={nameRef}
          />
          <InputText
            type="email"
            value={emailUser}
            placeholder="Digite o seu email ..."
            onChange={setEmailUser}
            label="Email"
            ref={emailRef} // Passando a referência
          />
          <InputText
            type="password"
            value={passwordCreateUser}
            placeholder="Digite a sua senha ..."
            onChange={setPasswordCreateUser}
            label="Senha"
            ref={passwordRef} // Passando a referência
          />
          <InputSelect
            label="Status"
            value={statusValue}
            onChange={(e) => {
              if (e.target.value === "Ativo") setStatus(true);
              else if (e.target.value === "Inativo") setStatus(false);
            }}
            options={[
              { value: "", label: "Selecione uma opção" },
              { value: "Ativo", label: "Ativo" },
              { value: "Inativo", label: "Inativo" },
            ]}
            ref={statusRef} // Passando a referência, se aplicável
          />
          <UserRoleSelect ref={groupRef} />{" "}
          {/* Adicionando referência ao UserRoleSelect, se aplicável */}
          <Button type="submit">Cadastrar</Button>
          <CloseButton onClick={onClose}>Fechar</CloseButton>
        </Forms>
      </ModalContent>
    </ModalContainer>
  );
}
