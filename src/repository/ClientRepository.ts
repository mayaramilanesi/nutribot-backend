import { Client } from "../entities/Client"

export interface ClientRepository {
  save(user: Client): Promise<void>;
  findByEmail(email: string): Promise<Client | null>;
}