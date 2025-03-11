import { FastifyRequest, FastifyReply } from "fastify";
import { ListCustomerService } from "../../services/customer/ListCustomerService";

class ListCustomerController {
  async handle(request: FastifyRequest, reply: FastifyReply) {
    const listCustomerService = new ListCustomerService();

    try {
      const customers = await listCustomerService.execute();
      reply.send(customers);
    } catch (error) {
      const errorMessage = (error as Error).message;
      reply.code(500).send({ message: errorMessage });
    }
  }
}

export { ListCustomerController };
