import { Request, Response } from 'express';
import { AddUrlUseCase } from './addUrlUseCase';

export class AddUrlController {
  constructor(private addUrlUseCase: AddUrlUseCase) {}

  async handle(req: Request, res: Response) {
    if (!req.user) return res.status(401).json({ message: 'Unauthorized' });

    const { url, uri } = req.body;

    try {
      const user = await this.addUrlUseCase.execute({
        id: req.user.id,
        url,
        uri,
      });

      res.status(200).json({
        message: 'Url created successfully',
        data: user,
      });
    } catch (error: any) {
      res.status(401).json({
        error: error.meta || 'Unexpected error',
      });
    }
  }
}
