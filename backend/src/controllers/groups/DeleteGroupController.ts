import { FastifyRequest, FastifyReply } from "fastify";
import { DeleteGroupService } from "../../services/groups/DeleteGroupService";

class DeleteGroupController {
  async handle(request: FastifyRequest, reply: FastifyReply) {
    const { id } = request.query as { id?: string };

    if (!id) {
      return reply.status(400).send({ error: "ID do grupo é obrigatório" });
    }

    const deleteGroupService = new DeleteGroupService();

    try {
      const group = await deleteGroupService.execute({ id });
      return reply.status(200).send(group);
    } catch (error) {
      if (error instanceof Error) {
        return reply.status(500).send({ error: error.message });
      } else {
        return reply.status(500).send({ error: "Erro desconhecido" });
      }
    }
  }
}

export { DeleteGroupController };
