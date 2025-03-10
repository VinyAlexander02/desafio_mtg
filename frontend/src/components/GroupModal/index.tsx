import { useState, useRef, FormEvent } from "react";
import styled from "styled-components";
import Button from "../Button";
import InputText from "../Input";
import ListUser from "../ListUser";
import Swal from "sweetalert2";
import { api } from "../../services/api";

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

interface Group {
  id: string;
  name: string;
  description: string;
  ownerId: string;
}

interface ModalProps {
  onClose: () => void;
  onGroupAdded: () => void;
  group?: Group;
}

export default function GroupModal({
  onClose,
  onGroupAdded,
  group,
}: Readonly<ModalProps>) {
  const [groupName, setGroupName] = useState<string>(group?.name ?? "");
  const [description, setDescription] = useState<string>(
    group?.description ?? ""
  );

  const groupNameRef = useRef<HTMLInputElement | null>(null);
  const descriptionRef = useRef<HTMLInputElement | null>(null);
  const responseGroupRef = useRef<HTMLSelectElement | null>(null);

  async function handleSubmit(event: FormEvent) {
    event.preventDefault();

    if (
      !groupNameRef.current?.value ||
      !descriptionRef.current?.value ||
      !responseGroupRef.current?.value
    ) {
      Swal.fire({
        title: "Todos os campos são obrigatórios!",
        icon: "error",
        draggable: true,
      });
      return;
    }

    const customerIdValue = responseGroupRef.current?.value.trim();

    const payload = {
      name: groupNameRef.current?.value.trim(),
      description: descriptionRef.current?.value.trim(),
      ownerId: customerIdValue,
    };

    try {
      if (group) {
        await api.put(`/group/${group.id}`, payload);
        Swal.fire("Grupo atualizado com sucesso!", "", "success");
      } else {
        await api.post("/group", payload);
        Swal.fire("Grupo cadastrado com sucesso!", "", "success");
      }

      onGroupAdded();
      onClose();
    } catch (error) {
      console.error("Erro ao salvar grupo", error);
      Swal.fire("Erro ao salvar grupo", "Tente novamente.", "error");
    }
  }

  return (
    <ModalContainer>
      <ModalContent>
        <H1>{group ? "Editar Grupo" : "Criar Novo Grupo"}</H1>
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
          <Button type="submit">{group ? "Atualizar" : "Cadastrar"}</Button>
          <CloseButton onClick={onClose}>Fechar</CloseButton>
        </Forms>
      </ModalContent>
    </ModalContainer>
  );
}
