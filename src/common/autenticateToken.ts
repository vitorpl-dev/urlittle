import { NextFunction, Request, Response } from 'express';
import { verify } from 'jsonwebtoken';
import { BlacklistToken } from './blacklistToken';

export function authenticate(blacklistToken: BlacklistToken) {
  return async (req: Request, res: Response, next: NextFunction) => {
    const authHeader = req.headers.authorization;

    if (!authHeader) {
      return res.status(401).json({ message: 'Unauthorized' });
    }

    const token = authHeader.split(' ')[1];

    try {
      const decodedToken: any = verify(
        token,
        process.env.JWT_SECRET_KEY as string
      );

      const isBlacklisted = await blacklistToken.isTokenBlacklisted(token);

      if (isBlacklisted) {
        return res.status(401).json({ message: 'Unauthorized' });
      }

      req.user = {
        id: decodedToken.id,
      };

      next();
    } catch (error) {
      res.status(401).json({ message: 'Unauthorized' });
    }
  };
}
