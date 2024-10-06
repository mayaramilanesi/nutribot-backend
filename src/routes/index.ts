import express from 'express';
import { CreateClientController } from '@/controllers/CreateClientController';
import { CreateClientUseCase } from '@/use_cases/CreateClientUseCase';
import { PostgresClientRepository } from '@/repository/PostgresClientRepository';
import pool from '@/config/database';

const router = express.Router();

const clientRepository = new PostgresClientRepository(pool);

const createClientUseCase = new CreateClientUseCase(clientRepository);
const createClientController = new CreateClientController(createClientUseCase);

router.post('/clients', async (req, res) => {
  await createClientController.handle(req, res);
});

export default router;
