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
  justify-content: space-evenly;
  max-width: 100%;
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
  const [selectedCustomer, setSelectedCustomer] = useState<Customer | null>(
    null
  );
  const [selectedGroup, setSelectedGroup] = useState<Group | null>(null);
  const [refresh, setRefresh] = useState(0);

  useEffect(() => {
    loadCustomers();
    loadGroups();
  }, [refresh]);

  async function loadCustomers() {
    console.log("🔄 Carregando clientes...");
    const response = await api.get("/customer");
    console.log("📦 Clientes recebidos:", response.data);
    setCustomers(response.data);
  }

  async function loadGroups() {
    console.log("🔄 Carregando grupos...");
    const response = await api.get("/group");
    console.log("📦 Grupos recebidos:", response.data);
    setGroups(response.data);
  }

  const handleOpenUserModal = () => {
    setIsModalOpen(true);
    setModalType("customer");
    setSelectedCustomer(null);
  };

  const handleOpenGroupModal = () => {
    setIsModalOpen(true);
    setModalType("group");
    setSelectedGroup(null);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setModalType(null);
  };

  const handleCustomerAdded = async () => {
    await loadCustomers();
    setRefresh((prev) => prev + 1);
  };

  const handleGroupAdded = async () => {
    await loadGroups();
    setRefresh((prev) => prev + 1);
  };

  const handleEditCustomer = (customer: Customer) => {
    setSelectedCustomer(customer);
    setIsModalOpen(true);
    setModalType("customer");
  };

  const handleEditGroup = (group: Group) => {
    setSelectedGroup(group);
    setIsModalOpen(true);
    setModalType("group");
  };

  const filteredUsers = filterGroup
    ? customers.filter(
        (customer) =>
          Array.isArray(customer.Groups) &&
          customer.Groups.some((group) => group.name === filterGroup)
      )
    : customers;

  async function handleDeleteCustomer(id: string) {
    try {
      await api.delete(`/customer?id=${id}`);
      Swal.fire({
        title: "Usuário deletado com sucesso!",
        icon: "success",
        draggable: true,
      });
      await loadCustomers();
    } catch (error) {
      console.log("Erro ao deletar", error);
    }
  }

  async function handleDeleteGroup(id: string) {
    try {
      await api.delete(`/group?id=${id}`);
      Swal.fire({
        title: "Grupo deletado com sucesso!",
        icon: "success",
        draggable: true,
      });
      await loadGroups();
    } catch (error) {
      console.log("Erro ao deletar", error);
    }
  }

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
                <Td>{customer.status ? "ATIVO" : "INATIVO"}</Td>
                <Td>
                  {customer.Groups.map((group) => group.name).join(", ") ||
                    "Nenhum"}
                </Td>
                <TdButton>
                  <Button onClick={() => handleEditCustomer(customer)}>
                    Editar
                  </Button>
                  <DeleteButton
                    onClick={() => handleDeleteCustomer(customer.id)}
                  >
                    Excluir
                  </DeleteButton>
                </TdButton>
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
                  {customers.find((c) => c.id === group.ownerId)?.name ??
                    "Não encontrado"}
                </Td>
                <TdButton>
                  <Button onClick={() => handleEditGroup(group)}>Editar</Button>
                  <DeleteButton onClick={() => handleDeleteGroup(group.id)}>
                    Excluir
                  </DeleteButton>
                </TdButton>
              </tr>
            ))}
          </tbody>
        </Table>
      </StyledTable>

      {isModalOpen && modalType === "customer" && (
        <CustomerModal
          onClose={handleCloseModal}
          onCustomerAdded={handleCustomerAdded}
          customer={selectedCustomer || undefined}
        />
      )}
      {isModalOpen && modalType === "group" && (
        <GroupModal
          onClose={handleCloseModal}
          onGroupAdded={handleGroupAdded}
          group={selectedGroup || undefined}
        />
      )}
    </>
  );
}
