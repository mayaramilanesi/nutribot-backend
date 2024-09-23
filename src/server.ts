import express from 'express';
import pool from '@/config/database';
import { PostgresClientRepository } from './repository/PostgresClientRepository';
import { CreateClientUseCase } from './use_cases/CreateClientUseCase';
import { CreateClientController } from './controllers/CreateClientController';

const app = express();
app.use(express.json());

const clientRepository = new PostgresClientRepository(pool);
const createClientUseCase = new CreateClientUseCase(clientRepository);
const createClientController = new CreateClientController(createClientUseCase);

app.post('/clients', (req, res) => createClientController.handle(req, res));

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});