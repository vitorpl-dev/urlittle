import { PostgresRepository } from '../../repository/implement/PostgresRepository';
import { AddUrlController } from './addUrlController';
import { AddUrlUseCase } from './addUrlUseCase';

const postgresRepository = new PostgresRepository();

const addUrlUseCase = new AddUrlUseCase(postgresRepository);

const addUrlController = new AddUrlController(addUrlUseCase);

export { addUrlUseCase, addUrlController };
