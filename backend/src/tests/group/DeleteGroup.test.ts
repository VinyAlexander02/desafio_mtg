import { DeleteGroupController } from "../../controllers/groups/DeleteGroupController";
import { DeleteGroupService } from "../../services/groups/DeleteGroupService";

jest.mock("../../services/groups/DeleteGroupService");

describe("Delete group controller", () => {
  let mockService: jest.SpyInstance;

  beforeEach(() => {
    mockService = jest.spyOn(DeleteGroupService.prototype, "execute");
  });

  afterEach(() => {
    mockService.mockRestore();
  });

  it("Should delete group successfully", async () => {
    mockService.mockResolvedValue({ message: "Grupo deletado com sucesso" });

    const request = {
      query: { id: "123" },
    } as any;

    const reply = {
      status: jest.fn().mockReturnThis(),
      send: jest.fn(),
    } as any;

    const deleteGroup = new DeleteGroupController();
    await deleteGroup.handle(request, reply);

    expect(reply.status).toHaveBeenCalledWith(200);
    expect(reply.send).toHaveBeenCalledWith({
      message: "Grupo deletado com sucesso",
    });
  });

  it("Should return an error if id is not present", async () => {
    const request = {
      query: {},
    } as any;

    const reply = {
      status: jest.fn().mockReturnThis(),
      send: jest.fn(),
    } as any;

    const deleteGroup = new DeleteGroupController();
    await deleteGroup.handle(request, reply);

    expect(reply.status).toHaveBeenCalledWith(400);
    expect(reply.send).toHaveBeenCalledWith({
      error: "ID do grupo é obrigatório",
    });
  });

  it("Should return error 500 if service fails", async () => {
    mockService.mockRejectedValue(new Error("Erro interno no servidor"));

    const request = {
      query: { id: "123" },
    } as any;

    const reply = {
      status: jest.fn().mockReturnThis(),
      send: jest.fn(),
    } as any;

    const deleteGroup = new DeleteGroupController();
    await deleteGroup.handle(request, reply);

    expect(reply.status).toHaveBeenCalledWith(500);
    expect(reply.send).toHaveBeenCalledWith({
      error: "Erro interno no servidor",
    });
  });
});
