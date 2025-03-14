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

  it("Should list all customers sucessfully", async () => {
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
    const replay = {
      send: jest.fn(),
    } as any;

    const listController = new ListCustomerController();
    await listController.handle(request, replay);

    expect(replay.send).toHaveBeenCalledTimes(1);
    expect(replay.send).toHaveBeenCalledWith(customersMock);
  });

  it("Shoold return empty list if no customer on list", async () => {
    mockService.mockResolvedValue([]);

    const request = {} as any;
    const replay = {
      send: jest.fn(),
    } as any;

    const listController = new ListCustomerController();
    await listController.handle(request, replay);

    expect(replay.send).toHaveBeenCalledTimes(1);
    expect(replay.send).toHaveBeenCalledWith([]);
  });
  it("Should return an error if the service fails", async () => {
    mockService.mockRejectedValue(new Error("Erro ao listar Customers"));

    const request = {} as any;
    const reply = {
      code: jest.fn().mockReturnThis(),
      send: jest.fn(),
    } as any;

    const listController = new ListCustomerController();
    await listController.handle(request, reply);

    expect(reply.code).toHaveBeenCalledWith(500);
    expect(reply.send).toHaveBeenCalledWith({
      message: "Erro ao listar Customers",
    });
  });
});
