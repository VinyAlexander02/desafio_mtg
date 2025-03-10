import Fastify from "fastify";
import { routes } from "./routes";
import cors from "@fastify/cors";

const app = Fastify({ logger: true });

app.setErrorHandler((error, request, reply) => {
  reply.code(400).send({ message: error.message });
});

app.register(cors, {
  origin: "http://localhost:3000",
  methods: ["GET", "POST", "PUT", "DELETE"],
});

const start = async () => {
  await app.register(routes);
  try {
    await app.listen({ port: 3333 });
    console.log("Servidor rodando em http://localhost:3333");
  } catch (error) {
    console.error("Erro ao iniciar o servidor:", error);
    process.exit(1);
  }
};

// Iniciar o servidor
start();
