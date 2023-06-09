import { Request, Response } from 'express';
import { generateToken } from '../../common/generateToken';
import { CreateUserUseCase } from './createUserUseCase';

export class CreateUserController {
  constructor(private createUserUseCase: CreateUserUseCase) {}

  async handle(req: Request, res: Response) {
    const { name, email, password } = req.body;
    try {
      const user = await this.createUserUseCase.execute({
        name,
        email,
        password,
      });

      const token = generateToken({ id: user.id });

      res.status(201).json({
        message: 'User create',
        token,
        data: user,
      });
    } catch (error: any) {
      res.status(401).json({
        error: error.meta || 'Unexpected error',
      });
    }
  }
}
