import { Request, Response } from 'express';
import { CreateClientUseCase } from '../use_cases/CreateClientUseCase';
import { CreateClientFilter } from '@/entities/CreateClientFilter';

export class CreateClientController {
  constructor(private createClientUseCase: CreateClientUseCase) {}

  async handle(req: Request, res: Response): Promise<Response> {
    try {
      const filter: CreateClientFilter = req.body;
      const client = await this.createClientUseCase.execute({
        ...filter,
        dateOfBirth: new Date(filter.dateOfBirth),
      });
      return res.status(201).json(client);
    } catch (error) {
      console.error('Error creating client:', error);
      return res.status(400).json({ message: 'Error creating client' });
    }
  }
}