import {
  FastifyInstance,
  FastifyPluginOptions,
  FastifyRequest,
  FastifyReply,
} from "fastify";
import { CreateCustomerController } from "./controllers/customer/createCustomerController";
import { ListCustomerController } from "./controllers/customer/ListCustomerController";
import { DeleteCustomerController } from "./controllers/customer/DeleteCustomerController";
import { CreateGroupController } from "./controllers/groups/CreateGroupController";
import { ListGroupController } from "./controllers/groups/ListGroupController";
import { DeleteGroupController } from "./controllers/groups/DeleteGroupController";
import { UpdateCustomerController } from "./controllers/customer/UpdateCustomerController";

export async function routes(
  fastify: FastifyInstance,
  options: FastifyPluginOptions
) {
  fastify.post(
    "/customer",
    async (request: FastifyRequest, replay: FastifyReply) => {
      return new CreateCustomerController().handle(request, replay);
    }
  );

  fastify.get(
    "/customer",
    async (request: FastifyRequest, replay: FastifyReply) => {
      return new ListCustomerController().handle(request, replay);
    }
  );

  fastify.put(
    "/customer/:id",
    async (request: FastifyRequest, replay: FastifyReply) => {
      return new UpdateCustomerController().handle(request, replay);
    }
  );

  fastify.delete(
    "/customer",
    async (request: FastifyRequest, replay: FastifyReply) => {
      return new DeleteCustomerController().handle(request, replay);
    }
  );

  fastify.post(
    "/group",
    async (request: FastifyRequest, replay: FastifyReply) => {
      return new CreateGroupController().handle(request, replay);
    }
  );

  fastify.get(
    "/group",
    async (request: FastifyRequest, replay: FastifyReply) => {
      return new ListGroupController().handle(request, replay);
    }
  );

  fastify.delete(
    "/group",
    async (request: FastifyRequest, replay: FastifyReply) => {
      return new DeleteGroupController().handle(request, replay);
    }
  );
}
