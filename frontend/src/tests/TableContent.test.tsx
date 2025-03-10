import { fireEvent, render, screen, waitFor } from "@testing-library/react";
import UserGroupManagement from "../components/Table";
import { api } from "../services/api";

jest.mock("../services/api");

describe("UserGroupManagement Component", () => {
  beforeEach(() => {
    (api.get as jest.Mock).mockImplementation((url) => {
      if (url === "/customer") {
        return Promise.resolve({
          data: [
            {
              id: "1",
              name: "Vinicius",
              email: "vinicius@email.com",
              password: "123456",
              status: true,
              Groups: [{ id: "101", name: "PM", description: "Gestão" }],
            },
          ],
        });
      }
      if (url === "/group") {
        return Promise.resolve({
          data: [{ id: "101", name: "PM", description: "Gestão", ownerId: "" }],
        });
      }
    });

    (api.delete as jest.Mock).mockImplementation((url) => {
      if (url === "/customer?id=1") {
        return Promise.resolve({ status: 200 });
      }
    });
  });

  it("Should render the 'Gerenciamento de Usuários' title", () => {
    render(<UserGroupManagement />);

    const titleElement = screen.getByText(/Gerenciamento de Usuários/i);
    expect(titleElement).toBeInTheDocument();
  });

  it("Should render the 'Gerenciamento de Grupos' title", () => {
    render(<UserGroupManagement />);

    const titleElement = screen.getByText(/Gerenciamento de Grupos/i);
    expect(titleElement).toBeInTheDocument();
  });

  it("Should render the user management table", () => {
    render(<UserGroupManagement />);

    const userTable = screen.getAllByRole("table");
    expect(userTable.length).toBeGreaterThanOrEqual(4);
    expect(userTable.length).not.toBeGreaterThanOrEqual(5);
  });

  it("Should render button 'Adicionar Usuário'", () => {
    render(<UserGroupManagement />);

    const userBtn = screen.getByText(/adicionar usuário/i);
    expect(userBtn).toBeInTheDocument();
  });

  it("Should render button 'Adicionar Grupo'", () => {
    render(<UserGroupManagement />);

    const userBtn = screen.getByText(/adicionar grupo/i);
    expect(userBtn).toBeInTheDocument();
  });

  it("Should load and display users", async () => {
    render(<UserGroupManagement />);

    const customerElements = await screen.findAllByText("Vinicius");
    expect(customerElements[0]).toBeInTheDocument();

    expect(await screen.findByText("vinicius@email.com")).toBeInTheDocument();
    expect(await screen.findByText("ATIVO")).toBeInTheDocument();

    const groupElements = await screen.findAllByText("PM");
    expect(groupElements[0]).toBeInTheDocument();
  });

  it("Should load the button 'Editar' after the elements are displayed", async () => {
    render(<UserGroupManagement />);

    const customerElements = await screen.findAllByText("Vinicius");
    expect(customerElements[0]).toBeInTheDocument();

    expect(await screen.findByText("vinicius@email.com")).toBeInTheDocument();
    expect(await screen.findByText("ATIVO")).toBeInTheDocument();

    const groupElements = await screen.findAllByText("PM");
    expect(groupElements[0]).toBeInTheDocument();

    const btnEdit = screen.getAllByText(/editar/i);
    expect(btnEdit.length).toBeGreaterThan(0);
    expect(btnEdit[0]).toBeInTheDocument();
  });

  it("Should load the button 'Excluir' after the elements are displayed", async () => {
    render(<UserGroupManagement />);

    const customerElements = await screen.findAllByText("Vinicius");
    expect(customerElements[0]).toBeInTheDocument();

    expect(await screen.findByText("vinicius@email.com")).toBeInTheDocument();
    expect(await screen.findByText("ATIVO")).toBeInTheDocument();

    const groupElements = await screen.findAllByText("PM");
    expect(groupElements[0]).toBeInTheDocument();

    const btnDelete = screen.getAllByText(/excluir/i);
    expect(btnDelete.length).toBeGreaterThan(0);
    expect(btnDelete[0]).toBeInTheDocument();
  });

  it("Should delete a user when the delete button is clicked", async () => {
    render(<UserGroupManagement />);

    const customerElements = await screen.findAllByText("Vinicius");
    expect(customerElements[0]).toBeInTheDocument();

    expect(await screen.findByText("vinicius@email.com")).toBeInTheDocument();
    expect(await screen.findByText("ATIVO")).toBeInTheDocument();

    const groupElements = await screen.findAllByText("PM");
    expect(groupElements[0]).toBeInTheDocument();

    const btnDelete = screen.getAllByText(/excluir/i);
    expect(btnDelete.length).toBeGreaterThan(0);

    fireEvent.click(btnDelete[0]);

    await waitFor(() => {
      expect(screen.queryByText("Vinicius")).not.toBeInTheDocument();
    });
  });
});
