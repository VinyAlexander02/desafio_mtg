import exp from "constants";
import { CreateGroupController } from "../../controllers/groups/CreateGroupController";
import { CreateGroupService } from "../../services/groups/CreateGroupService";

jest.mock("../../services/groups/CreateGroupService");

describe("Create Group Controller", () => {
  let mockService: jest.SpyInstance;

  beforeEach(() => {
    mockService = jest.spyOn(CreateGroupService.prototype, "execute");
  });

  afterEach(() => {
    mockService.mockRestore();
  });

  it("Should create group successfully", async () => {
    const uniqueName = "Developer";

    const createGroupMock = {
      id: "123",
      name: uniqueName,
      description: "Developer Group",
      ownerId: "123",
    };

    mockService.mockResolvedValue(createGroupMock);

    const request = {
      body: {
        id: "123",
        name: uniqueName,
        description: "Developer Group",
        ownerId: "123",
      },
    } as any;

    const reply = {
      code: jest.fn().mockReturnThis(),
      send: jest.fn(),
    } as any;

    const createGroup = new CreateGroupController();
    await createGroup.handle(request, reply);

    expect(reply.code).toHaveBeenCalledWith(201);
    expect(reply.send).toHaveBeenCalledTimes(1);
    expect(reply.send).toHaveBeenCalledWith(
      expect.objectContaining({
        name: uniqueName,
        description: "Developer Group",
        ownerId: "123",
      })
    );
  });

  it("Should verify if contain a group with the same name", async () => {
    mockService.mockRejectedValue(new Error("Nome de grupo já existe"));

    const request = {
      body: {
        id: "123",
        name: "Developer",
        description: "Developer Group",
        ownerId: "123",
      },
    } as any;

    const reply = {
      status: jest.fn().mockReturnThis(),
      send: jest.fn(),
    } as any;

    const createGroup = new CreateGroupController();

    await createGroup.handle(request, reply);

    expect(reply.status).toHaveBeenCalledWith(400);
    expect(reply.send).toHaveBeenCalledWith({
      error: "Nome de grupo já existe",
    });
  });
});
