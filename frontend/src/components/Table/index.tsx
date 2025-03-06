import React, { useState } from "react";
import styled from "styled-components";
import Button from "../Button";
import UserModal from "../UserModal";
import GroupModal from "../GroupModal";

const StyledTable = styled.table`
  width: 90%;
  margin: 0 auto;
  align-items: center;
  justify-content: center;
  background-color: whitesmoke;
  border-radius: 12px;
  border: 1px solid gray;
  margin-bottom: 10px;
`;

const DeleteButton = styled(Button)`
  background-color: #ff0000;

  &:hover {
    background-color: #f03939;
    transition: 1.5s;
  }
`;

const Div = styled.div`
  display: flex;
  flex-direction: column;
  width: 20%;
  margin: 0 10px;
`;

const H2 = styled.h2`
  font-family: Arial, Helvetica, sans-serif;
  margin: 30px 10px;
`;

const Select = styled.select`
  border: 1px solid black;
  padding: 5px;
  border-radius: 8px;
  width: 150px;
`;

const Table = styled.table`
  width: 100%;
  margin-top: 20px;
`;

const Th = styled.th`
  font-family: Arial, Helvetica, sans-serif;
  font-size: 20px;
`;

const Td = styled.td`
  font-family: Arial, Helvetica, sans-serif;
  font-size: 17px;
  text-align: center;
`;

const TdButton = styled.div`
  display: flex;
  justify-content: space-around;
`;

interface User {
  id: number;
  name: string;
  email: string;
  senha: string;
  status: string;
  groups: string[];
}

interface Group {
  id: number;
  name: string;
  description: string;
  responsible: string;
}

export default function UserGroupManagement() {
  const [users, setUsers] = useState<User[]>([
    {
      id: 1,
      name: "Alice",
      email: "alice@example.com",
      senha: "********",
      status: "Ativo",
      groups: ["Admin"],
    },
    {
      id: 2,
      name: "Bob",
      email: "bob@example.com",
      senha: "********",
      status: "Inativo",
      groups: ["Desenvolvimento", "Dados"],
    },
  ]);

  const [groups, setGroups] = useState<Group[]>([
    {
      id: 1,
      name: "Admin",
      description: "Administrador",
      responsible: "Alice",
    },
    {
      id: 2,
      name: "Desenvolvimento",
      description: "Desenvolvimento",
      responsible: "Bob",
    },
    {
      id: 3,
      name: "Dados",
      description: "DBA",
      responsible: "Bob",
    },
  ]);

  const [filterGroup, setFilterGroup] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalType, setModalType] = useState<"user" | "group" | null>(null);

  const handleOpenUserModal = () => {
    setIsModalOpen(true);
    setModalType("user");
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setModalType(null);
  };

  const handleOpenGroupModal = () => {
    setIsModalOpen(true);
    setModalType("group");
  };

  const filteredUsers = filterGroup
    ? users.filter((user) => user.groups.includes(filterGroup))
    : users;

  return (
    <>
      <StyledTable>
        <H2>Gerenciamento de Usuários</H2>
        <Div>
          <Select onChange={(e) => setFilterGroup(e.target.value)}>
            <option value="">Todos os Grupos</option>
            {groups.map((group) => (
              <option key={group.id} value={group.name}>
                {group.name}
              </option>
            ))}
          </Select>
          <Button onClick={handleOpenUserModal}>Adicionar Usuário</Button>
        </Div>
        <Table>
          <thead>
            <tr>
              <Th>Nome</Th>
              <Th>Email</Th>
              <Th>Senha</Th>
              <Th>Status</Th>
              <Th>Grupos</Th>
              <Th>Ações</Th>
            </tr>
          </thead>
          <tbody>
            {filteredUsers.map((user) => (
              <tr key={user.id}>
                <Td>{user.name}</Td>
                <Td>{user.email}</Td>
                <Td>{user.senha}</Td>
                <Td>{user.status}</Td>
                <Td>{user.groups.join(", ")}</Td>
                <Td>
                  <TdButton>
                    <Button>Editar</Button>
                    <DeleteButton>Excluir</DeleteButton>
                  </TdButton>
                </Td>
              </tr>
            ))}
          </tbody>
        </Table>
      </StyledTable>
      <StyledTable>
        <H2>Gerenciamento de Grupos</H2>
        <Div>
          <Button onClick={handleOpenGroupModal}>Adicionar Grupo</Button>
        </Div>
        <Table>
          <thead>
            <tr>
              <Th>Nome</Th>
              <Th>Descrição</Th>
              <Th>Responsável</Th>
              <Th>Ações</Th>
            </tr>
          </thead>
          <tbody>
            {groups.map((group) => (
              <tr key={group.id}>
                <Td>{group.name}</Td>
                <Td>{group.description}</Td>
                <Td>{group.responsible}</Td>
                <Td>
                  <TdButton>
                    <Button>Editar</Button>
                    <DeleteButton>Excluir</DeleteButton>
                  </TdButton>
                </Td>
              </tr>
            ))}
          </tbody>
        </Table>
      </StyledTable>
      {isModalOpen && modalType === "user" && (
        <UserModal onClose={handleCloseModal} />
      )}
      {isModalOpen && modalType === "group" && (
        <GroupModal onClose={handleCloseModal} />
      )}
    </>
  );
}
