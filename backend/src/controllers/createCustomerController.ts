import { FastifyRequest, FastifyReply } from "fastify";
import { CreateCustomerService } from "../services/CreateCustomerService";

class createCustomerController {
  async handle(request: FastifyRequest, replay: FastifyReply) {
    const { name, email, password, status } = request.body as {
      name: string;
      email: string;
      password: string;
      status: boolean;
    };

    const customerService = new CreateCustomerService();

    const customer = await customerService.execute({
      name,
      email,
      password,
      status,
    });

    replay.send(customer);
  }
}

export { createCustomerController };
