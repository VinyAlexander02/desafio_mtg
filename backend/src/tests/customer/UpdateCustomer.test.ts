import { UpdateCustomerController } from "../../controllers/customer/UpdateCustomerController";
import { UpdateCustomerService } from "../../services/customer/UpdateCustomerService";

jest.mock("../../services/customer/UpdateCustomerService");

describe("Update Customer Controller", () => {
  let mockService: jest.SpyInstance;

  beforeEach(() => {
    mockService = jest.spyOn(UpdateCustomerService.prototype, "execute");
  });

  afterEach(() => {
    mockService.mockRestore();
  });

  it("Should update customer data successfully", async () => {
    const updateCustomerMock = {
      id: "1",
      name: "test1",
      email: "novoemail@test.com",
      password: "159753",
      status: true,
    };

    mockService.mockResolvedValue(updateCustomerMock);

    const request = {
      params: {
        id: "1",
      },
      body: {
        name: "test1",
        email: "novoemail@test.com",
        password: "159753",
        status: true,
      },
    } as any;

    const reply = {
      send: jest.fn(),
    } as any;

    const updateController = new UpdateCustomerController();
    await updateController.handle(request, reply);

    expect(reply.send).toHaveBeenCalledTimes(1);
    expect(reply.send).toHaveBeenCalledWith(updateCustomerMock);
  });

  it("Should return error if id is not present", async () => {
    mockService.mockRejectedValue(new Error("ID do usuário é obrigatório"));

    const request = {
      params: {
        id: "",
      },
      body: {
        name: "test1",
        email: "novoemail@test.com",
        password: "159753",
        status: true,
      },
    } as any;

    const reply = {
      code: jest.fn().mockReturnThis(),
      send: jest.fn(),
    } as any;

    const updateController = new UpdateCustomerController();
    await updateController.handle(request, reply);

    expect(reply.code).toHaveBeenCalledWith(400);
    expect(reply.send).toHaveBeenCalledWith({
      error: "ID do usuário é obrigatório",
    });
  });

  it("Should return an error message if an unexpected error occurs", async () => {
    mockService.mockRejectedValue(new Error("Erro inesperado"));

    const request = {
      params: {
        id: "1",
      },
      body: {
        name: "test1",
        email: "novoemail@test.com",
        password: "159753",
        status: true,
      },
    } as any;

    const reply = {
      code: jest.fn().mockReturnThis(),
      send: jest.fn(),
    } as any;

    const updateController = new UpdateCustomerController();
    await updateController.handle(request, reply);

    expect(reply.code).toHaveBeenCalledWith(400);
    expect(reply.send).toHaveBeenCalledWith({
      error: "Erro inesperado",
    });
  });
});
