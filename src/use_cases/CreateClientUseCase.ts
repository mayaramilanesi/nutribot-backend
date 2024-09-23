import { Client } from '../entities/Client';
import { ClientRepository } from '../repository/ClientRepository';

export class CreateClientUseCase {
  constructor(private clientRepository: ClientRepository) {}

  async execute(clientData: Omit<Client, 'id'>): Promise<Client> {
    return this.clientRepository.create(clientData);
  }
}