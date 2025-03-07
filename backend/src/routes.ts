import {
  FastifyInstance,
  FastifyPluginOptions,
  FastifyRequest,
  FastifyReply,
} from "fastify";
import { createCustomerController } from "./controllers/createCustomerController";
import { ListCustomerController } from "./controllers/ListCustomerController";
import { DeleteCustomerController } from "./controllers/DeleteCustomerController";

export async function routes(
  fastify: FastifyInstance,
  options: FastifyPluginOptions
) {
  fastify.get(
    "/teste",
    async (request: FastifyRequest, replay: FastifyReply) => {
      return { ok: true };
    }
  );

  fastify.post(
    "/customer",
    async (request: FastifyRequest, replay: FastifyReply) => {
      return new createCustomerController().handle(request, replay);
    }
  );

  fastify.get(
    "/customer",
    async (request: FastifyRequest, replay: FastifyReply) => {
      return new ListCustomerController().handle(request, replay);
    }
  );

  fastify.delete(
    "/customer",
    async (request: FastifyRequest, replay: FastifyReply) => {
      return new DeleteCustomerController().handle(request, replay);
    }
  );
}
