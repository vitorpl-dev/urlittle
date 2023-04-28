import { PostgresRepository } from '../../repository/implement/PostgresRepository';
import { DeleteUserController } from './deleteUserController';
import { DeleteUserUseCase } from './deleteUserUseCase';

const postgresRepository = new PostgresRepository();

const deleteUserUseCase = new DeleteUserUseCase(postgresRepository);

const deleteUserController = new DeleteUserController(deleteUserUseCase);

export { deleteUserUseCase, deleteUserController };
