// controllers/customer/DeleteCustomerController.ts
import { FastifyRequest, FastifyReply } from "fastify";
import { DeleteCustomerService } from "../../services/customer/DeleteCustomerService";

class DeleteCustomerController {
  async handle(request: FastifyRequest, reply: FastifyReply) {
    const { id } = request.query as { id: string }; // Capturando o ID da query string
    const deleteCustomerService = new DeleteCustomerService();

    try {
      const customer = await deleteCustomerService.execute({ id });
      reply.send(customer);
    } catch (error) {
      const errorMessage = (error as Error).message; // Afirmação de tipo
      console.error(error); // Logar o erro
      reply.status(400).send({ message: errorMessage });
    }
  }
}

export { DeleteCustomerController };
