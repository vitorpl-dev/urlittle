import { Request, Response } from 'express';
import { DeleteUserUseCase } from './deleteUserUseCase';

export class DeleteUserController {
  constructor(private deleteUserUseCase: DeleteUserUseCase) {}

  async handle(req: Request, res: Response) {
    if (!req.user) return res.status(401).json({ message: 'Unauthorized' });

    try {
      await this.deleteUserUseCase.execute(req.user.id);

      res.status(200).json({
        message: 'User deleted successfully',
      });
    } catch (error: any) {
      res.status(401).json({
        error: error.meta || 'Unexpected error',
      });
    }
  }
}
