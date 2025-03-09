import Fastify from "fastify";
import { routes } from "./routes";
import cors from "@fastify/cors";

const app = Fastify({ logger: true });

// Configurando o tratamento de erros
app.setErrorHandler((error, request, reply) => {
  reply.code(400).send({ message: error.message });
});

// Configurando CORS
app.register(cors, {
  origin: "http://localhost:3000", // O domínio do seu frontend
  methods: ["GET", "POST", "PUT", "DELETE"], // Métodos permitidos
});

// Função para iniciar o servidor
const start = async () => {
  await app.register(routes); // Certifique-se de registrar as rotas antes de iniciar o servidor
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
