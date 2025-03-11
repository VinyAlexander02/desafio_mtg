import type { Config } from "jest";

const config: Config = {
  preset: "ts-jest",
  testEnvironment: "node",
  testMatch: ["**/__tests__/**/*.ts?(x)", "**/?(*.)+(spec|test).ts?(x)"],
  clearMocks: true, // Limpa os mocks entre os testes
  transform: {
    "^.+\\.ts$": "ts-jest",
  },
};

export default config;
