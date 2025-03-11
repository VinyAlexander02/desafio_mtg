import { ListCustomerController } from "../../controllers/customer/ListCustomerController";
import { ListCustomerService } from "../../services/customer/ListCustomerService";

jest.mock("../../services/customer/ListCustomerService");

describe("List Customer controller", () => {
  let mockService: jest.SpyInstance;

  beforeEach(() => {
    mockService = jest.spyOn(ListCustomerService.prototype, "execute");
  });

  afterEach(() => {
    mockService.mockRestore();
  });

  it("Should list all customers successfully", async () => {
    const customersMock = [
      {
        id: "1",
        name: "Cliente 1",
        email: "cliente1@example.com",
        status: true,
      },
      {
        id: "2",
        name: "Cliente 2",
        email: "cliente2@example.com",
        status: false,
      },
    ];

    mockService.mockResolvedValue(customersMock);

    const request = {} as any;
    const reply = {
      send: jest.fn(),
    } as any;

    const listController = new ListCustomerController();
    await listController.handle(request, reply);

    expect(reply.send).toHaveBeenCalledTimes(1);
    expect(reply.send).toHaveBeenCalledWith(customersMock);
  });

  it("Should return empty list if no customer on list", async () => {
    mockService.mockResolvedValue([]);

    const request = {} as any;
    const reply = {
      send: jest.fn(),
    } as any;

    const listController = new ListCustomerController();
    await listController.handle(request, reply);

    expect(reply.send).toHaveBeenCalledTimes(1);
    expect(reply.send).toHaveBeenCalledWith([]);
  });

  it("Should return an error message if an error occurs", async () => {
    mockService.mockRejectedValue(new Error("Erro ao listar clientes"));

    const request = {} as any;
    const reply = {
      code: jest.fn().mockReturnThis(),
      send: jest.fn(),
    } as any;

    const listController = new ListCustomerController();
    await listController.handle(request, reply);

    expect(reply.code).toHaveBeenCalledWith(500);
    expect(reply.send).toHaveBeenCalledWith({
      message: "Erro ao listar clientes",
    });
  });
});
