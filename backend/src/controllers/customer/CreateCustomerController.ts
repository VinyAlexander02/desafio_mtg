import { FastifyRequest, FastifyReply } from "fastify";
import { CreateCustomerService } from "../../services/customer/CreateCustomerService";

class CreateCustomerController {
  async handle(request: FastifyRequest, reply: FastifyReply) {
    const { name, email, password, status, groupIds } = request.body as {
      name: string;
      email: string;
      password: string;
      status: boolean;
      groupIds: string[];
    };

    const createCustomerService = new CreateCustomerService();

    try {
      const customer = await createCustomerService.execute({
        name,
        email,
        password,
        status,
        groupIds,
      });
      reply.send(customer);
    } catch (error) {
      const errorMessage = (error as Error).message;
      reply.code(400).send({ message: errorMessage });
    }
  }
}

export { CreateCustomerController };
