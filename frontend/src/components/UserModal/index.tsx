import { useState, useRef, FormEvent } from "react";
import styled from "styled-components";
import Button from "../Button";
import InputText from "../Input";
import UserRoleSelect from "../UserSelect";
import InputSelect from "../InputSelect";
import { api } from "../../services/api";
import axios from "axios";
import Swal from "sweetalert2";

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
  onUserAdded: () => void;
}

export default function UserModal({
  onClose,
  onUserAdded,
}: Readonly<ModalProps>) {
  const [completName, setCompletName] = useState("");
  const [emailUser, setEmailUser] = useState("");
  const [passwordCreateUser, setPasswordCreateUser] = useState("");
  const [status, setStatus] = useState<boolean | undefined>(undefined);

  const nameRef = useRef<HTMLInputElement | null>(null);
  const emailRef = useRef<HTMLInputElement | null>(null);
  const passwordRef = useRef<HTMLInputElement | null>(null);
  const statusRef = useRef<HTMLSelectElement | null>(null);
  const groupRef = useRef<HTMLSelectElement | null>(null);

  async function handleSubmit(event: FormEvent) {
    event.preventDefault();

    if (
      !nameRef.current?.value ||
      !emailRef.current?.value ||
      !passwordRef.current?.value ||
      !statusRef.current?.value ||
      groupRef.current?.value === undefined
    ) {
      Swal.fire({
        title: "Todos os campos são obrigatórios!",
        icon: "error",
        draggable: true,
      });
      return;
    }

    const groupIdValue = groupRef.current.value.trim();

    const payload = {
      name: nameRef.current.value.trim(),
      email: emailRef.current.value.trim(),
      password: passwordRef.current.value.trim(),
      status: status === true,
      groupIds: groupIdValue ? [groupIdValue] : [],
    };

    try {
      const response = await api.post("/customer", payload, {
        headers: {
          "Content-Type": "application/json",
        },
      });

      console.log("Resposta da API:", response.data);
      Swal.fire({
        title: "Usuário Cadastrado com sucesso!",
        icon: "success",
        draggable: true,
      });

      onUserAdded();

      setCompletName("");
      setEmailUser("");
      setPasswordCreateUser("");
      setStatus(undefined);
      if (statusRef.current) statusRef.current.value = "";
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

  const statusValue = status === true ? "Ativo" : "Inativo";

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
            ref={emailRef}
          />
          <InputText
            type="password"
            value={passwordCreateUser}
            placeholder="Digite a sua senha ..."
            onChange={setPasswordCreateUser}
            label="Senha"
            ref={passwordRef}
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
            ref={statusRef}
          />
          <UserRoleSelect ref={groupRef} />
          <Button type="submit">Cadastrar</Button>
          <CloseButton onClick={onClose}>Fechar</CloseButton>
        </Forms>
      </ModalContent>
    </ModalContainer>
  );
}
