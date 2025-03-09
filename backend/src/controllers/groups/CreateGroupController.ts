import { FastifyRequest, FastifyReply } from "fastify";
import { CreateGroupService } from "../../services/groups/CreateGroupService";

class CreateGroupController {
  async handle(request: FastifyRequest, replay: FastifyReply) {
    const { name, description, ownerId } = request.body as {
      name: string;
      description: string;
      ownerId: string;
    };

    const createGroupService = new CreateGroupService();

    const group = await createGroupService.execute({
      name,
      description,
      ownerId,
    });

    replay.send(group);
  }
}

export { CreateGroupController };
