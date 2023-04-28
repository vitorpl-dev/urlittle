import { Request, Response, Router } from 'express';
import { authenticate } from './common/autenticateToken';
import { addUrlController } from './usecases/addUrlUseCase';
import { createUserController } from './usecases/createUserUseCase';
import { deleteUserController } from './usecases/deleteUserUseCase';
import { findUserController } from './usecases/findUserUseCase';

const router = Router();

router.get('/', (_: Request, res: Response) => {
  res.status(200).json({
    message: 'Hello World',
  });
});

router.post('/user/create', (req: Request, res: Response) => {
  return createUserController.handle(req, res);
});

router.post('/user/login', (req: Request, res: Response) => {
  return findUserController.handle(req, res);
});

router.delete('/user/delete', authenticate, (req: Request, res: Response) => {
  return deleteUserController.handle(req, res);
});

router.post('/url/add', authenticate, (req: Request, res: Response) => {
  return addUrlController.handle(req, res);
});

export { router };
