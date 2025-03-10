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
    } catch (error: unknown) {
      console.error("Erro ao criar grupo:", error);

      if (error instanceof Error) {
        reply.code(400).send({ error: error.message });
      } else {
        reply.code(500).send({ error: "Erro inesperado" });
      }
    }
  }
}

export { CreateGroupController };
