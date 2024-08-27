import { Client } from "../entities/Client"
import { ClientRepository } from "./ClientRepository";

export class InMemoryClientRepository implements ClientRepository {
  private users: Client[] = [];

  async save(user: Client): Promise<void> {
    this.users.push(user);
  }

  async findByEmail(email: string): Promise<Client | null> {
    return this.users.find(user => user.email === email) || null;
  }
}
