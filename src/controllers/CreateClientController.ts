import { Request, Response } from 'express';
import { CreateClientUseCase } from '../use_cases/CreateClientUseCase';

export class CreateClientController {
  constructor(private createClientUseCase: CreateClientUseCase) {}

  async handle(req: Request, res: Response): Promise<Response> {
    try {
      const { name, email, phone, password, dateOfBirth, weight } = req.body;
      const client = await this.createClientUseCase.execute({
        name,
        email,
        phone,
        password,
        dateOfBirth: new Date(dateOfBirth),
        weight: Number(weight),
      });
      return res.status(201).json(client);
    } catch (error) {
      return res.status(400).json({ message: 'Error creating client' });
    }
  }
}