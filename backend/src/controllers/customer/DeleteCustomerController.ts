import { FastifyRequest, FastifyReply } from "fastify";
import { DeleteCustomerService } from "../../services/customer/DeleteCustomerService";

class DeleteCustomerController {
  async handle(request: FastifyRequest, reply: FastifyReply) {
    const { id } = request.query as { id?: string };

    if (!id) {
      return reply.status(400).send({ message: "ID do cliente é obrigatório" });
    }

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
