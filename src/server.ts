// src/server.ts
import express from "express";
import { RegisterClientUseCase } from "./use_cases/RegisterClientUseCase";
import { InMemoryClientRepository } from "./repository/InMemoryClientRepository";
import { BcryptHashGateway } from "./gateways/BcryptHashGateway";
import { RegisterClientController } from "./controllers/RegisterClientController";

const app = express();
app.use(express.json());

const userRepository = new InMemoryClientRepository();
const hashGateway = new BcryptHashGateway();
const registerUser = new RegisterClientUseCase(userRepository, hashGateway);
const registerUserController = new RegisterClientController(registerUser);

app.post("/register", (req, res) => registerUserController.handle(req, res));

app.listen(3000, () => {
  console.log("Server is running on port 3000");
});
