import { FastifyRequest, FastifyReply } from "fastify";
import { DeleteCustomerService } from "../../services/customer/DeleteCustomerService";

class DeleteCustomerController {
  async handle(request: FastifyRequest, reply: FastifyReply) {
    const { id } = request.query as { id: string };
    const deleteCustomerService = new DeleteCustomerService();

    try {
      const customer = await deleteCustomerService.execute({ id });
      reply.send(customer);
    } catch (error) {
      const errorMessage = (error as Error).message;
      console.error(error);
      reply.status(400).send({ message: errorMessage });
    }
  }
}

export { DeleteCustomerController };
