// src/use_cases/RegisterUser.ts
import { Client } from "../entities/Client";
import { ClientRepository } from "../repository/ClientRepository"
import { HashGateway } from "../gateways/HashGateway";

export class RegisterClientUseCase {
  constructor(
    private userRepository: ClientRepository,
    private hashGateway: HashGateway
  ) {}

  async execute(name: string, email: string, password: string): Promise<Client> {
    const hashedPassword = await this.hashGateway.hash(password);
    const user = new Client(Date.now().toString(), name, email, hashedPassword);
    await this.userRepository.save(user);
    return user;
  }
}
