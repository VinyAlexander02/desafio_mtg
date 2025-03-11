import { FastifyRequest, FastifyReply } from "fastify";
import { UpdateCustomerService } from "../../services/customer/UpdateCustomerService";

class UpdateCustomerController {
  async handle(request: FastifyRequest, replay: FastifyReply) {
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

      replay.send(updateCustomer);
    } catch (error) {
      if (error instanceof Error) {
        replay.send({ error: error.message });
      } else {
        replay.send({ error: "Erro desconhecido" });
      }
    }
  }
}

export { UpdateCustomerController };
