import { FastifyRequest, FastifyReply } from "fastify";
import { DeleteCustomerService } from "../services/DeleteCustomerService";

class DeleteCustomerController {
  async handle(request: FastifyRequest, replay: FastifyReply) {
    const { id } = request.query as { id: string };
    const deleteCustomerService = new DeleteCustomerService();

    const customer = await deleteCustomerService.execute({ id });

    replay.send(customer);
  }
}

export { DeleteCustomerController };
