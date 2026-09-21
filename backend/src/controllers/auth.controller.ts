import { Request, Response } from 'express';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import { v4 as uuidv4 } from 'uuid';
import { db } from '../config/db';
import { JWT_SECRET } from '../middleware/auth.middleware';

export const registerResponsible = async (req: Request, res: Response) => {
  try {
    const { email, password, name } = req.body;

    if (!email || !password || !name) {
      return res.status(400).json({ error: 'Email, password, and name are required' });
    }

    const existingUser = db.responsables.find(r => r.email === email);
    if (existingUser) {
      return res.status(400).json({ error: 'Responsible with this email already exists' });
    }

    const salt = await bcrypt.genSalt(10);
    const passwordHash = await bcrypt.hash(password, salt);

    const newResponsible = {
      id: uuidv4(),
      email,
      passwordHash,
      name,
      createdAt: new Date().toISOString()
    };

    db.responsables.push(newResponsible);

    const token = jwt.sign({ id: newResponsible.id, email: newResponsible.email }, JWT_SECRET, { expiresIn: '7d' });

    return res.status(201).json({
      message: 'Responsible registered successfully',
      token,
      responsible: {
        id: newResponsible.id,
        email: newResponsible.email,
        name: newResponsible.name
      }
    });
  } catch (error: any) {
    return res.status(500).json({ error: error.message || 'Internal server error' });
  }
};

export const loginResponsible = async (req: Request, res: Response) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({ error: 'Email and password are required' });
    }

    const responsible = db.responsables.find(r => r.email === email);
    if (!responsible) {
      return res.status(401).json({ error: 'Invalid email or password' });
    }

    const isMatch = await bcrypt.compare(password, responsible.passwordHash);
    if (!isMatch) {
      return res.status(401).json({ error: 'Invalid email or password' });
    }

    const token = jwt.sign({ id: responsible.id, email: responsible.email }, JWT_SECRET, { expiresIn: '7d' });

    return res.status(200).json({
      message: 'Login successful',
      token,
      responsible: {
        id: responsible.id,
        email: responsible.email,
        name: responsible.name
      }
    });
  } catch (error: any) {
    return res.status(500).json({ error: error.message || 'Internal server error' });
  }
};
