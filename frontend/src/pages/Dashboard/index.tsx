import { styled } from "styled-components";
import TableContent from "../../components/Table";

const H1 = styled.h1`
  font-family: Arial, Helvetica, sans-serif;
  margin: 10px 20px;
`;

const Dashboard = () => {
  return (
    <>
      <H1>Dashboard</H1>
      <TableContent />
    </>
  );
};

export default Dashboard;
