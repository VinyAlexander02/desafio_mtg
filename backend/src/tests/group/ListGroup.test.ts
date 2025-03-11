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

  it("Shoul render all group list", async () => {
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
    const replay = {
      send: jest.fn(),
    } as any;

    const listController = new ListGroupController();
    await listController.handle(request, replay);

    expect(replay.send).toHaveBeenCalledTimes(1);
    expect(replay.send).toHaveBeenCalledWith(groupMock);
  });
});
