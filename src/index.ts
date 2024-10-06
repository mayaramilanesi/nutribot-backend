import express from 'express';
import dotenv from 'dotenv';
import pool from './config/database';
import winston from 'winston';
import router from './routes';

// Carrega as variáveis de ambiente
dotenv.config();

// Configuração do logger
const logger = winston.createLogger({
  level: 'info',
  format: winston.format.json(),
  transports: [
    new winston.transports.Console(),
    new winston.transports.File({ filename: 'error.log', level: 'error' }),
    new winston.transports.File({ filename: 'combined.log' }),
  ],
});

const app = express();
const port = process.env.PORT || 3000;

// Middleware para parsing de JSON
app.use(express.json());

// Teste de conexão com o banco de dados
pool.query('SELECT NOW()', (err, res) => {
  if (err) {
    logger.error('Error executing query', err.stack);
  } else {
    logger.info('Connected to database:', res.rows[0]);
  }
});


// Routes
app.use('/api', router);


// Middleware de tratamento de erros
app.use((err: Error, req: express.Request, res: express.Response, next: express.NextFunction) => {
  logger.error(err.stack);
  res.status(500).send('Something broke!');
});

// Inicia o servidor
app.listen(port, () => {
  logger.info(`Server is running on port ${port}`);
});
