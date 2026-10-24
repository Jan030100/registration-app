import { Router } from 'express';
import { register } from '../controllers/auth.controller';
import { validateBody } from '../middleware/validate';
import { registerSchema } from '../schemas/auth.schema';

export const authRouter = Router();

authRouter.post('/auth/register', validateBody(registerSchema), register);