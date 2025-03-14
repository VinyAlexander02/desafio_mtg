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

    const createCustomerMock = {
      id: "123",
      name: "teste",
      email: uniqueEmail,
      password: "123456",
      status: true,
      groupIds: [],
    };

    mockService.mockResolvedValue(createCustomerMock);

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

    const createCustomer = new CreateCustomerController();
    await createCustomer.handle(request, reply);

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
      code: jest.fn().mockReturnThis(),
      send: jest.fn(),
    } as any;

    const createCustomer = new CreateCustomerController();
    await createCustomer.handle(request, reply);

    expect(reply.code).toHaveBeenCalledWith(400);
    expect(reply.send).toHaveBeenCalledWith({
      message: "Um ou mais grupos não existentes",
    });
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
      code: jest.fn().mockReturnThis(),
      send: jest.fn(),
    } as any;

    const createCustomer = new CreateCustomerController();
    await createCustomer.handle(request, reply);

    expect(reply.code).toHaveBeenCalledWith(400);
    expect(reply.send).toHaveBeenCalledWith({ message: "Email já cadastrado" });
  });
});
