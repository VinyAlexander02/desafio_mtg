import { FastifyRequest, FastifyReply } from "fastify";
import { DeleteGroupService } from "../../services/groups/DeleteGroupService";

class DeleteGroupController {
  async handle(request: FastifyRequest, reply: FastifyReply) {
    const { id } = request.params as { id: string };

    if (!id) {
      return reply.code(400).send({ error: "ID do grupo é obrigatório" });
    }

    const deleteGroupService = new DeleteGroupService();

    try {
      await deleteGroupService.execute({ id });
      reply.code(200).send({ message: "Grupo deletado com sucesso" });
    } catch (error) {
      reply.code(500).send({ error: "Erro ao deletar grupo" });
    }
  }
}

export { DeleteGroupController };
