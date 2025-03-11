import { FastifyRequest, FastifyReply } from "fastify";
import { ListGroupService } from "../../services/groups/ListGroupService";

class ListGroupController {
  async handle(request: FastifyRequest, reply: FastifyReply) {
    const listGroupService = new ListGroupService();

    try {
      const groups = await listGroupService.execute();
      reply.send(groups);
    } catch (error) {
      const errorMessage =
        error instanceof Error ? error.message : "Erro desconhecido";
      console.error(error);
      reply.code(500).send({ message: errorMessage });
    }
  }
}

export { ListGroupController };
