import { CreateCustomerController } from "../../controllers/customer/CreateCustomerController";
import { CreateCustomerService } from "../../services/customer/CreateCustomerService";

jest.mock("../../services/customer/CreateCustomerService");

describe("Create Customer Controller", () => {
  let mockService: jest.SpyInstance;

  beforeEach(() => {
    mockService = jest.spyOn(CreateCustomerService.prototype, "execute");
  });

  afterEach(() => {
    mockService.mockRestore();
  });

  it("Should create customer successfully", async () => {
    const uniqueEmail = `teste${Date.now()}@teste.com`;

    mockService.mockResolvedValue({
      id: "123",
      name: "teste",
      email: uniqueEmail,
      password: "123456",
      status: true,
      groupIds: [],
    });

    const request = {
      body: {
        name: "teste",
        email: uniqueEmail,
        password: "123456",
        status: true,
        groupIds: [],
      },
    } as any;

    const reply = {
      send: jest.fn(),
    } as any;

    const controller = new CreateCustomerController();
    await controller.handle(request, reply);

    expect(reply.send).toHaveBeenCalledTimes(1);
    expect(reply.send).toHaveBeenCalledWith(
      expect.objectContaining({
        name: "teste",
        email: uniqueEmail,
        password: "123456",
        status: true,
        groupIds: [],
      })
    );
  });

  it("Should return a message stating that one or more groups do not exist", async () => {
    mockService.mockRejectedValue(
      new Error("Um ou mais grupos não existentes")
    );

    const request = {
      body: {
        name: "teste",
        email: "teste@teste.com",
        password: "123456",
        status: true,
        groupIds: ["101"],
      },
    } as any;

    const reply = {
      send: jest.fn(),
    } as any;

    const controller = new CreateCustomerController();

    await expect(controller.handle(request, reply)).rejects.toThrow(
      "Um ou mais grupos não existentes"
    );

    expect(reply.send).not.toHaveBeenCalledTimes(1);
  });

  it("Should return error when email is already exists", async () => {
    mockService.mockRejectedValue(new Error("Email já cadastrado"));

    const request = {
      body: {
        name: "teste",
        email: "teste@teste.com",
        password: "123456",
        status: true,
        groupIds: [],
      },
    } as any;

    const reply = {
      send: jest.fn(),
    } as any;

    const controller = new CreateCustomerController();

    await expect(controller.handle(request, reply)).rejects.toThrow(
      "Email já cadastrado"
    );

    expect(reply.send).not.toHaveBeenCalled();
  });
});
