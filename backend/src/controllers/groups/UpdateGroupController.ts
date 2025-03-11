import { FastifyRequest, FastifyReply } from "fastify";
import { UpdateGroupService } from "../../services/groups/UpdateGroupService";

class UpdateGroupController {
  async handle(request: FastifyRequest, reply: FastifyReply) {
    const { id } = request.params as { id: string };
    const { name, description, ownerId } = request.body as {
      name: string;
      description: string;
      ownerId: string;
    };

    if (!ownerId) {
      return reply
        .code(400)
        .send({ error: "Usuário do responsável obrigatório" });
    }

    const updateGroupService = new UpdateGroupService();

    try {
      const updatedGroup = await updateGroupService.execute({
        id,
        name,
        description,
        ownerId,
      });
      reply.send(updatedGroup);
    } catch (error) {
      const errorMessage = (error as Error).message;
      reply.code(500).send({ message: errorMessage });
    }
  }
}

export { UpdateGroupController };
