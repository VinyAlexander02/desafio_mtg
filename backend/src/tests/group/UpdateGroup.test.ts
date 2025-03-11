import { UpdateGroupController } from "../../controllers/groups/UpdateGroupController";
import { UpdateGroupService } from "../../services/groups/UpdateGroupService";

jest.mock("../../services/customer/UpdateCustomerService");

describe("Update group controller", () => {
  let mockService: jest.SpyInstance;

  beforeEach(() => {
    mockService = jest.spyOn(UpdateGroupService.prototype, "execute");
  });

  afterEach(() => {
    mockService.mockRestore();
  });

  it("Should update group successfully", async () => {
    const updateGroupMock = {
      body: {
        id: "123",
        name: "Developer",
        description: "Developer Group",
        ownerId: "123",
      },
    };

    mockService.mockResolvedValue(updateGroupMock);

    const request = {
      params: {
        id: "1",
      },
      body: {
        id: "123",
        name: "Developer",
        description: "Developer Group",
        ownerId: "123",
      },
    } as any;

    const reply = {
      send: jest.fn(),
    } as any;

    const updateGroup = new UpdateGroupController();
    await updateGroup.handle(request, reply);

    expect(reply.send).toHaveBeenCalledTimes(1);
    expect(reply.send).toHaveBeenCalledWith(updateGroupMock);
  });

  it("Should return error if ownerId is no present", async () => {
    mockService.mockRejectedValue(
      new Error("Usuário do responsável obrigatório")
    );

    const request = {
      params: {
        id: "1",
      },
      body: {
        name: "Desenvolvedor",
        description: "Desenvolvedor Group",
        ownerId: "",
      },
    } as any;

    const reply = {
      code: jest.fn().mockReturnThis(),
      send: jest.fn(),
    } as any;

    const updateGroup = new UpdateGroupController();
    updateGroup.handle(request, reply);

    expect(reply.code).toHaveBeenCalledWith(400);
    expect(reply.send).toHaveBeenCalledWith({
      error: "Usuário do responsável obrigatório",
    });
  });
  it("Should return 500 if service fails", async () => {
    mockService.mockRejectedValue(new Error("Erro interno ao atualizar grupo"));

    const request = {
      params: {
        id: "1",
      },
      body: {
        name: "Grupo Teste",
        description: "Descrição do grupo",
        ownerId: "123",
      },
    } as any;

    const reply = {
      code: jest.fn().mockReturnThis(),
      send: jest.fn(),
    } as any;

    const updateGroup = new UpdateGroupController();
    await updateGroup.handle(request, reply);

    expect(reply.code).toHaveBeenCalledWith(500);
    expect(reply.send).toHaveBeenCalledWith({
      message: "Erro interno ao atualizar grupo",
    });
  });
});
