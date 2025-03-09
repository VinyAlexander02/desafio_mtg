import { FastifyRequest, FastifyReply } from "fastify";
import { ListGroupService } from "../../services/groups/ListGroupService";

class ListGroupController {
  async handle(request: FastifyRequest, replay: FastifyReply) {
    const listGroupService = new ListGroupService();

    const groups = await listGroupService.execute();

    replay.send(groups);
  }
}

export { ListGroupController };
