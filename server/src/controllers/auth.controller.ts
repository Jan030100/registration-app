import type { Request, Response, NextFunction } from 'express';
import { registerUser } from '../services/auth.service';
import type { RegisterInput } from '../schemas/auth.schema';

export async function register(
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> {
  try {
    const user = await registerUser(req.body as RegisterInput);
    res.status(201).json({ user });
  } catch (error) {
    next(error);
  }
}