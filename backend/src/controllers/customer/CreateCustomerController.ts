import { FastifyRequest, FastifyReply } from "fastify";
import { CreateCustomerService } from "../../services/customer/CreateCustomerService";

class CreateCustomerController {
  async handle(request: FastifyRequest, replay: FastifyReply) {
    const { name, email, password, status, groupIds } = request.body as {
      name: string;
      email: string;
      password: string;
      status: boolean;
      groupIds: string[];
    };

    const createCustomerService = new CreateCustomerService();

    const customer = await createCustomerService.execute({
      name,
      email,
      password,
      status,
      groupIds,
    });

    replay.send(customer);
  }
}

export { CreateCustomerController };
