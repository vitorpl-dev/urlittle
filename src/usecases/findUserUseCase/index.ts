import { PostgresRepository } from '../../repository/implement/PostgresRepository';
import { FindUserController } from './findUserController';
import { FindUserUseCase } from './findUserUseCase';

const postgresRepository = new PostgresRepository();

const findUserUseCase = new FindUserUseCase(postgresRepository);

const findUserController = new FindUserController(findUserUseCase);

export { findUserUseCase, findUserController };
