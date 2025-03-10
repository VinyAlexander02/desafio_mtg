import { fireEvent, render, screen, waitFor } from "@testing-library/react";
import CustomerModal from "../components/CustomerModal";
import { api } from "../services/api";
import Swal from "sweetalert2";

jest.mock("../services/api", () => ({
  get: jest.fn().mockResolvedValue({
    data: [],
  }),
  post: jest.fn(),
  put: jest.fn(),
}));

jest.mock("sweetalert2");

describe("CustomerModal Component", () => {
  const mockOnClose = jest.fn();
  const mockOnCustomerAdded = jest.fn();

  beforeEach(() => {
    jest.clearAllMocks();
    (Swal.fire as jest.Mock).mockReset();
  });

  it("Should render the modal with title 'Criar novo usuário'", async () => {
    render(
      <CustomerModal
        onClose={mockOnClose}
        onCustomerAdded={mockOnCustomerAdded}
      />
    );

    const titleElement = await waitFor(() =>
      screen.findByText(/Criar novo usuário/i)
    );
    expect(titleElement).toBeInTheDocument();
  });

  it("Should show an error message if the form is submitted with empty fields", async () => {
    render(
      <CustomerModal
        onClose={mockOnClose}
        onCustomerAdded={mockOnCustomerAdded}
      />
    );

    const submitButton = screen.getByText(/cadastrar/i);
    fireEvent.click(submitButton);

    await waitFor(() => {
      expect(Swal.fire).toHaveBeenCalledWith({
        title: "Todos os campos são obrigatórios!",
        icon: "error",
        draggable: true,
      });
    });
  });

  it("Should call onCustomerAdded and onClose when user is created successfully", async () => {
    (api.post as jest.Mock).mockResolvedValueOnce({ status: 200 });

    render(
      <CustomerModal
        onClose={mockOnClose}
        onCustomerAdded={mockOnCustomerAdded}
      />
    );

    fireEvent.change(
      screen.getByPlaceholderText(/digite o seu nome completo .../i),
      { target: { value: "Vinicius" } }
    );
    fireEvent.change(screen.getByPlaceholderText(/digite o seu email .../i), {
      target: { value: "vinicius@email.com" },
    });
    fireEvent.change(screen.getByPlaceholderText(/digite a sua senha .../i), {
      target: { value: "123456" },
    });
    fireEvent.change(screen.getByLabelText(/status/i), {
      target: { value: "Ativo" },
    });
    fireEvent.change(screen.getByRole("combobox"), {
      target: { value: "101" },
    });

    const submitButton = screen.getByRole("button", { name: /cadastrar/i });
    fireEvent.click(submitButton);

    await waitFor(() => {
      expect(api.post).toHaveBeenCalledTimes(1);
    });

    expect(api.post).toHaveBeenCalledWith("/customer", {
      name: "Vinicius",
      email: "vinicius@email.com",
      password: "123456",
      status: true,
      groupIds: ["101"],
    });

    expect(Swal.fire).toHaveBeenCalledWith(
      "Usuário cadastrado com sucesso!",
      "",
      "success"
    );
    expect(mockOnCustomerAdded).toHaveBeenCalled();
    expect(mockOnClose).toHaveBeenCalled();
  });
});
