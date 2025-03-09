import { FastifyRequest, FastifyReply } from "fastify";
import { DeleteGroupService } from "../../services/groups/DeleteGroupService";

class DeleteGroupController {
  async handle(request: FastifyRequest, replay: FastifyReply) {
    const { id } = request.query as { id: string };
    const deleteGroupService = new DeleteGroupService();

    const group = await deleteGroupService.execute({ id });

    replay.send(group);
  }
}

export { DeleteGroupController };
