import { useState, useRef, FormEvent } from "react";
import styled from "styled-components";
import Button from "../Button";
import InputText from "../Input";
import ListUser from "../ListUser";
import Swal from "sweetalert2";
import { api } from "../../services/api";
import axios from "axios";

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
  onGroupAdded: () => void;
}

export default function GroupModal({
  onClose,
  onGroupAdded,
}: Readonly<ModalProps>) {
  const [groupName, setGroupName] = useState<string>("");
  const [description, setDescription] = useState<string>("");

  const groupNameRef = useRef<HTMLInputElement | null>(null);
  const descriptionRef = useRef<HTMLInputElement | null>(null);
  const responseGroupRef = useRef<HTMLSelectElement | null>(null);

  async function handleSubmit(event: FormEvent) {
    event.preventDefault();

    const customerIdValue = responseGroupRef.current?.value.trim();

    const payload = {
      name: groupNameRef.current?.value.trim(),
      description: descriptionRef.current?.value.trim(),
      ownerId: customerIdValue,
    };

    try {
      const response = await api.post("/group", payload, {
        headers: {
          "Content-Type": "application/json",
        },
      });

      console.log("Resposta da API:", response.data);
      Swal.fire({
        title: "Grupo cadastrado com sucesso!",
        icon: "success",
        draggable: true,
      });

      onGroupAdded();

      setGroupName("");
      setDescription("");
    } catch (error) {
      if (axios.isAxiosError(error)) {
        console.error("Erro da API:", error.response?.data);
        alert(`Erro da API: ${JSON.stringify(error.response?.data, null, 2)}`);
      } else if (error instanceof Error) {
        console.error("Erro inesperado:", error.message);
        alert(`Erro inesperado: ${error.message}`);
      }
    }
  }

  return (
    <ModalContainer>
      <ModalContent>
        <H1>Criar novo grupo</H1>
        <Forms onSubmit={handleSubmit}>
          <InputText
            type="text"
            value={groupName}
            placeholder="Digite o nome do grupo ..."
            onChange={setGroupName}
            label="Nome do Grupo"
            ref={groupNameRef}
          />
          <InputText
            type="text"
            value={description}
            placeholder="Digite a descrição ..."
            onChange={setDescription}
            label="Descrição"
            ref={descriptionRef}
          />
          <ListUser ref={responseGroupRef} />
          <Button>Cadastrar</Button>
          <CloseButton onClick={onClose}>Fechar</CloseButton>
        </Forms>
      </ModalContent>
    </ModalContainer>
  );
}
