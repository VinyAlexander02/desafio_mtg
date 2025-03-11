import { FastifyRequest, FastifyReply } from "fastify";
import { CreateGroupService } from "../../services/groups/CreateGroupService";

class CreateGroupController {
  async handle(request: FastifyRequest, reply: FastifyReply) {
    const { name, description, ownerId } = request.body as {
      name: string;
      description: string;
      ownerId: string;
    };

    const createGroupService = new CreateGroupService();

    try {
      const group = await createGroupService.execute({
        name,
        description,
        ownerId,
      });
      reply.code(201).send(group);
    } catch (error) {
      const errorMessage = (error as Error).message;
      reply.status(400).send({ error: errorMessage });
    }
  }
}

export { CreateGroupController };
