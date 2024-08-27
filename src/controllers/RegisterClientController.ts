import { Request, Response } from "express";
import { RegisterClientUseCase } from "../use_cases/RegisterClientUseCase";

export class RegisterClientController {
  constructor(private registerUser: RegisterClientUseCase) {}

  async handle(req: Request, res: Response): Promise<Response> {
    const { name, email, password } = req.body;
    try {
      const user = await this.registerUser.execute(name, email, password);
      return res.status(201).json(user);
    } catch (error) {
      return res.status(400).json({ error: (error as Error).message });
    }
  }
}