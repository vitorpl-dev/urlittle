import { PostgresRepository } from '../../repository/implement/PostgresRepository';
import { CreateUserController } from './createUserController';
import { CreateUserUseCase } from './createUserUseCase';

const postgresRepository = new PostgresRepository();

const createUserUseCase = new CreateUserUseCase(postgresRepository);

const createUserController = new CreateUserController(createUserUseCase);

export { createUserUseCase, createUserController };
