// Modal.tsx
import React, { useState } from "react";
import styled from "styled-components";
import Button from "../Button";
import InputText from "../Input";

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

export default function GroupModal({ onClose }: Readonly<ModalProps>) {
  const [completName, setCompletName] = useState<string>("");
  const [description, setDescription] = useState<string>("");
  const [groupName, setGroupName] = useState<string>("");
  return (
    <ModalContainer>
      <ModalContent>
        <H1>Criar novo grupo</H1>
        <Forms>
          <InputText
            type="password"
            value={groupName}
            placeholder="Digite o nome do grupo ..."
            onChange={setGroupName}
            label="Nome do Grupo"
          />
          <InputText
            type="text"
            value={description}
            placeholder="Digite a descrição ..."
            onChange={setDescription}
            label="Descrição"
          />
          <InputText
            type="text"
            value={completName}
            placeholder="Digite o nome do responsável ..."
            onChange={setCompletName}
            label="Nome Responsável"
          />
          <Button>Cadastrar</Button>
          <CloseButton onClick={onClose}>Fechar</CloseButton>
        </Forms>
      </ModalContent>
    </ModalContainer>
  );
}
