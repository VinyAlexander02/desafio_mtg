import { useEffect, useState, forwardRef } from "react";
import styled from "styled-components";
import { api } from "../../services/api";

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

interface Customer {
  id: string;
  name: string;
}

const ListUser = forwardRef<HTMLSelectElement, {}>((_, ref) => {
  const [customers, setCustomers] = useState<Customer[]>([]);

  useEffect(() => {
    loadGroups();
  }, []);

  async function loadGroups() {
    const response = await api.get("/customer");
    setCustomers(response.data);
  }

  return (
    <Container>
      <Label>Responsável</Label>
      <Select ref={ref}>
        <option value="">Selecione um responsável</option>
        {customers.map((customer) => (
          <option key={customer.id} value={customer.id}>
            {customer.name}
          </option>
        ))}
      </Select>
    </Container>
  );
});

export default ListUser;
