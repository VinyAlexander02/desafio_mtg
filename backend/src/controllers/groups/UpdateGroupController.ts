import { FastifyRequest, FastifyReply } from "fastify";
import { UpdateGroupService } from "../../services/groups/UpdateGroupService";

class UpdateGroupController {
  async handle(request: FastifyRequest, replay: FastifyReply) {
    const { id } = request.params as { id: string };
    const { name, description, ownerId } = request.body as {
      name: string;
      description: string;
      ownerId: string;
    };

    const updateGroupService = new UpdateGroupService();

    const updateGroup = updateGroupService.execute({
      id,
      name,
      description,
      ownerId,
    });
    replay.send(updateGroup);
  }
}

export { UpdateGroupController };
