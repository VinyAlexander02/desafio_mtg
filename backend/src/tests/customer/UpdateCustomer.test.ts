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

  it("Should update customer data succesfully", async () => {
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

    const replay = {
      send: jest.fn(),
    } as any;

    const updateController = new UpdateCustomerController();
    await updateController.handle(request, replay);

    expect(replay.send).toHaveBeenCalledTimes(1);
    expect(replay.send).toHaveBeenCalledWith(updateCustomerMock);
  });

  it("Should not update if id is not present", async () => {
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
      send: jest.fn(),
    } as any;

    const updateController = new UpdateCustomerController();
    await updateController.handle(request, reply);

    expect(reply.send).toHaveBeenCalledWith({
      error: "ID do usuário é obrigatório",
    });
  });
});
