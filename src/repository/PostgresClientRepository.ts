import { Client } from '../entities/Client';
import { ClientRepository } from './ClientRepository';
import { Pool } from 'pg';

export class PostgresClientRepository implements ClientRepository {
  constructor(private pool: Pool) {}

  async create(client: Omit<Client, 'id'>): Promise<Client> {
    const { name, email, phone, password, dateOfBirth, weight } = client;
    const query = `
      INSERT INTO clients (name, email, phone, password, date_of_birth, weight)
      VALUES ($1, $2, $3, $4, $5, $6)
      RETURNING *
    `;
    const values = [name, email, phone, password, dateOfBirth, weight];
    const result = await this.pool.query(query, values);
    return result.rows[0];
  }
}