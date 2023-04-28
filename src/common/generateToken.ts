import jwt from 'jsonwebtoken';

export function generateToken(payload: any): string {
  const secretKey = process.env.SECRET_KEY as string;
  const options = { expiresIn: '1h' };
  return jwt.sign(payload, secretKey, options);
}
