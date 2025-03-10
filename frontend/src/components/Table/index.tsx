import React, { useEffect, useState } from "react";
import styled from "styled-components";
import Button from "../Button";
import CustomerModal from "../CustomerModal";
import GroupModal from "../GroupModal";
import { api } from "../../services/api";
import Swal from "sweetalert2";

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
  align-items: center;
  justify-content: space-around;
  max-width: 50px;
`;

interface Customer {
  id: string;
  name: string;
  email: string;
  password: string;
  status: boolean;
  Groups: Group[];
}

interface Group {
  id: string;
  name: string;
  description: string;
  ownerId: string;
}

export default function UserGroupManagement() {
  const [customers, setCustomers] = useState<Customer[]>([]);
  const [groups, setGroups] = useState<Group[]>([]);
  const [filterGroup, setFilterGroup] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalType, setModalType] = useState<"customer" | "group" | null>(null);

  useEffect(() => {
    loadCustomers();
    loadGroups();
  }, []);

  async function loadCustomers() {
    const response = await api.get("/customer");
    setCustomers(response.data);
  }

  async function loadGroups() {
    const response = await api.get("/group");
    setGroups(response.data);
  }

  const handleOpenUserModal = () => {
    setIsModalOpen(true);
    setModalType("customer");
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setModalType(null);
  };

  const handleOpenGroupModal = () => {
    setIsModalOpen(true);
    setModalType("group");
  };

  const handleUserAdded = () => {
    loadCustomers();
  };

  const handleGroupAdded = () => {
    loadGroups();
  };

  const filteredUsers = filterGroup
    ? customers.filter((customer) => {
        return (
          Array.isArray(customer.Groups) &&
          customer.Groups.some((group) => group.name === filterGroup)
        );
      })
    : customers;

  async function handleDeleteCustomer(id: string) {
    try {
      await api.delete(`/customer?id=${id}`);
      Swal.fire({
        title: "Usuário deletado com sucesso!",
        icon: "success",
        draggable: true,
      });
    } catch (error) {
      console.log("Erro ao deletar", error);
    }

    const allCustomers = customers.filter((customer) => customer.id !== id);
    setCustomers(allCustomers);
  }

  async function handleDeleteGroup(id: string) {
    try {
      await api.delete(`/group?id=${id}`);
      Swal.fire({
        title: "Grupo deletado com sucesso!",
        icon: "success",
        draggable: true,
      });
    } catch (error) {
      console.log("Erro ao deletar", error);
    }

    const allGroups = groups.filter((group) => group.id !== id);
    setGroups(allGroups);
  }

  return (
    <>
      <StyledTable>
        <H2>Gerenciamento de Usuários</H2>
        <Div>
          <Select
            onChange={(e) => {
              const selectedGroup = e.target.value;
              setFilterGroup(selectedGroup);
            }}
          >
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
            {filteredUsers.map((customer) => (
              <tr key={customer.id}>
                <Td>{customer.name}</Td>
                <Td>{customer.email}</Td>
                <Td>********</Td> {/* Oculta a senha */}
                <Td>{customer.status ? "ATIVO" : "INATIVO"}</Td>
                <Td>
                  {Array.isArray(customer.Groups) && customer.Groups.length > 0
                    ? customer.Groups.map((group) => group.name).join(", ")
                    : "Nenhum grupo cadastrado"}
                </Td>
                <Td>
                  <TdButton>
                    <Button>Editar</Button>
                    <DeleteButton
                      onClick={() => handleDeleteCustomer(customer.id)}
                    >
                      Excluir
                    </DeleteButton>
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
                <Td>
                  {group.ownerId
                    ? (() => {
                        const customer = customers.find(
                          (c) => c.id === group.ownerId
                        );
                        return customer
                          ? customer.name
                          : "Dono do grupo não encontrado";
                      })()
                    : "Nenhum dono associado"}
                </Td>

                <Td>
                  <TdButton>
                    <Button>Editar</Button>
                    <DeleteButton onClick={() => handleDeleteGroup(group.id)}>
                      Excluir
                    </DeleteButton>
                  </TdButton>
                </Td>
              </tr>
            ))}
          </tbody>
        </Table>
      </StyledTable>
      {isModalOpen && modalType === "customer" && (
        <CustomerModal
          onClose={handleCloseModal}
          onUserAdded={handleUserAdded}
        />
      )}
      {isModalOpen && modalType === "group" && (
        <GroupModal
          onClose={handleCloseModal}
          onGroupAdded={handleGroupAdded}
        />
      )}
    </>
  );
}
