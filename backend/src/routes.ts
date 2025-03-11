import {
  FastifyInstance,
  FastifyPluginOptions,
  FastifyRequest,
  FastifyReply,
} from "fastify";
import { CreateCustomerController } from "./controllers/customer/CreateCustomerController";
import { ListCustomerController } from "./controllers/customer/ListCustomerController";
import { DeleteCustomerController } from "./controllers/customer/DeleteCustomerController";
import { CreateGroupController } from "./controllers/groups/CreateGroupController";
import { ListGroupController } from "./controllers/groups/ListGroupController";
import { DeleteGroupController } from "./controllers/groups/DeleteGroupController";
import { UpdateCustomerController } from "./controllers/customer/UpdateCustomerController";
import { UpdateGroupController } from "./controllers/groups/UpdateGroupController";

export async function routes(
  fastify: FastifyInstance,
  options: FastifyPluginOptions
) {
  fastify.post(
    "/customer",
    async (request: FastifyRequest, reply: FastifyReply) => {
      return new CreateCustomerController().handle(request, reply);
    }
  );

  fastify.get(
    "/customer",
    async (request: FastifyRequest, reply: FastifyReply) => {
      return new ListCustomerController().handle(request, reply);
    }
  );

  fastify.put(
    "/customer/:id",
    async (request: FastifyRequest, reply: FastifyReply) => {
      return new UpdateCustomerController().handle(request, reply);
    }
  );

  fastify.delete(
    "/customer",
    async (request: FastifyRequest, reply: FastifyReply) => {
      return new DeleteCustomerController().handle(request, reply);
    }
  );

  fastify.post(
    "/group",
    async (request: FastifyRequest, reply: FastifyReply) => {
      return new CreateGroupController().handle(request, reply);
    }
  );

  fastify.get(
    "/group",
    async (request: FastifyRequest, reply: FastifyReply) => {
      return new ListGroupController().handle(request, reply);
    }
  );

  fastify.put(
    "/group/:id",
    async (request: FastifyRequest, reply: FastifyReply) => {
      return new UpdateGroupController().handle(request, reply);
    }
  );

  fastify.delete(
    "/group",
    async (request: FastifyRequest, reply: FastifyReply) => {
      return new DeleteGroupController().handle(request, reply);
    }
  );
}
