import { Request, Response } from 'express';
import { generateToken } from '../../common/generateToken';
import { FindUserUseCase } from './findUserUseCase';

export class FindUserController {
  constructor(private findUserUseCase: FindUserUseCase) {}

  async handle(req: Request, res: Response) {
    const { email, password } = req.body;
    try {
      const user = await this.findUserUseCase.execute({
        email,
        password,
      });

      const token = generateToken({ id: user.id });

      res.status(200).json({
        message: 'User authenticated',
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
