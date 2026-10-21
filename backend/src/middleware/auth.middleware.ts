import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';

const JWT_SECRET = process.env.JWT_SECRET || 'ba-protege-secret-key-2026';

export interface AuthRequest extends Request {
  responsibleId?: string;
  userEmail?: string;
}

export const authenticateToken = (req: AuthRequest, res: Response, next: NextFunction) => {
  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.split(' ')[1];

  if (!token) {
    return res.status(401).json({ error: 'Access token missing or invalid' });
  }

  jwt.verify(token, JWT_SECRET, (err: any, user: any) => {
    if (err) {
      return res.status(403).json({ error: 'Token expired or invalid' });
    }
    req.responsibleId = user.id;
    req.userEmail = user.email;
    next();
  });
};

export { JWT_SECRET };
