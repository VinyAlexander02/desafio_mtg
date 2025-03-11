import { FastifyRequest, FastifyReply } from "fastify";
import { UpdateCustomerService } from "../../services/customer/UpdateCustomerService";

class UpdateCustomerController {
  async handle(request: FastifyRequest, reply: FastifyReply) {
    try {
      const { id } = request.params as { id: string };
      const { name, email, password, status } = request.body as {
        name: string;
        email: string;
        password: string;
        status: boolean;
      };

      const updateCustomerService = new UpdateCustomerService();

      const updateCustomer = await updateCustomerService.execute({
        id,
        name,
        email,
        password,
        status,
      });

      reply.send(updateCustomer);
    } catch (error) {
      const errorMessage =
        error instanceof Error ? error.message : "Erro desconhecido";
      reply.code(400).send({ error: errorMessage });
    }
  }
}

export { UpdateCustomerController };
