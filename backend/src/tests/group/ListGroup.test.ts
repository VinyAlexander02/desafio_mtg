import { ListGroupController } from "../../controllers/groups/ListGroupController";
import { ListGroupService } from "../../services/groups/ListGroupService";

jest.mock("../../services/groups/ListGroupService");

describe("List Group Controller", () => {
  let mockService: jest.SpyInstance;

  beforeEach(() => {
    mockService = jest.spyOn(ListGroupService.prototype, "execute");
  });

  afterEach(() => {
    mockService.mockRestore();
  });

  it("Should render all group list", async () => {
    const groupMock = [
      {
        id: "1",
        name: "group 1",
        description: "group 1",
        ownerId: "1",
      },
      {
        id: "2",
        name: "group 2",
        description: "group 2",
        ownerId: "1",
      },
    ];

    mockService.mockResolvedValue(groupMock);

    const request = {} as any;
    const reply = {
      send: jest.fn(),
    } as any;

    const listController = new ListGroupController();
    await listController.handle(request, reply);

    expect(reply.send).toHaveBeenCalledTimes(1);
    expect(reply.send).toHaveBeenCalledWith(groupMock);
  });

  it("Should return a empyty list", async () => {
    mockService.mockResolvedValue([]);

    const request = {} as any;
    const reply = {
      send: jest.fn(),
    } as any;

    const listGroup = new ListGroupController();
    await listGroup.handle(request, reply);

    expect(reply.send).toHaveBeenCalledTimes(1);
    expect(reply.send).toHaveBeenCalledWith([]);
  });

  it("Should return an error if the service fails", async () => {
    mockService.mockRejectedValue(new Error("Erro ao listar grupos"));

    const request = {} as any;
    const reply = {
      code: jest.fn().mockReturnThis(),
      send: jest.fn(),
    } as any;

    const listController = new ListGroupController();
    await listController.handle(request, reply);

    expect(reply.code).toHaveBeenCalledWith(500);
    expect(reply.send).toHaveBeenCalledWith({
      message: "Erro ao listar grupos",
    });
  });
});
