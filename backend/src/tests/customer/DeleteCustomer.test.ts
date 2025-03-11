import { DeleteCustomerController } from "../../controllers/customer/DeleteCustomerController";
import { DeleteCustomerService } from "../../services/customer/DeleteCustomerService";

jest.mock("../../services/customer/DeleteCustomerService");

describe("Delete Customer Controller", () => {
  let mockService: jest.SpyInstance;

  beforeEach(() => {
    mockService = jest.spyOn(DeleteCustomerService.prototype, "execute");
  });

  afterEach(() => {
    mockService.mockRestore();
  });

  it("Should delete a customer successfully", async () => {
    mockService.mockResolvedValue({ message: "Deletado com sucesso" });

    const request = {
      params: {
        id: "123",
      },
    } as any;

    const reply = {
      send: jest.fn(),
    } as any;

    const deleteController = new DeleteCustomerController();
    await deleteController.handle(request, reply);

    expect(reply.send).toHaveBeenCalledWith({
      message: "Deletado com sucesso",
    });
  });

  it("Should return an error if id is missing", async () => {
    mockService.mockRejectedValue(new Error("Solicitação Inválida"));

    const request = {
      params: {
        id: "",
      },
    } as any;

    const reply = {
      send: jest.fn(),
    } as any;

    const deleteController = new DeleteCustomerController();
    await deleteController.handle(request, reply);

    expect(reply.send).toHaveBeenCalledWith({
      message: "Solicitação Inválida",
    });
  });

  it("Should return an error if customer does not exist", async () => {
    mockService.mockRejectedValue(new Error("Cliente não existe"));

    const request = {
      params: {
        id: "999",
      },
    } as any;

    const reply = {
      send: jest.fn(),
    } as any;

    const deleteController = new DeleteCustomerController();
    await deleteController.handle(request, reply);

    expect(reply.send).toHaveBeenCalledWith({ message: "Cliente não existe" });
  });
});
