import { Client } from '../entities/Client';

export interface ClientRepository {
  create(client: Omit<Client, 'id'>): Promise<Client>;
}