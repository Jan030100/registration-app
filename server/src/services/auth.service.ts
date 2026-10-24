import bcrypt from 'bcrypt';
import { prisma } from '../lib/prisma';
import { ApiError } from '../utils/ApiError';
import type { RegisterInput } from '../schemas/auth.schema';

const SALT_ROUNDS = 12;

export interface SafeUser {
  id: string;
  fullName: string;
  email: string;
  createdAt: Date;
  updatedAt: Date;
}

interface PrismaLikeError {
  code?: string;
}

function isUniqueConstraintError(error: unknown): boolean {
  return (
    typeof error === 'object' &&
    error !== null &&
    'code' in error &&
    (error as PrismaLikeError).code === 'P2002'
  );
}

export async function registerUser(input: RegisterInput): Promise<SafeUser> {
  const normalizedEmail = input.email.toLowerCase();
  const passwordHash = await bcrypt.hash(input.password, SALT_ROUNDS);

  try {
    return await prisma.user.create({
      data: {
        fullName: input.fullName,
        email: normalizedEmail,
        passwordHash,
      },
      select: {
        id: true,
        fullName: true,
        email: true,
        createdAt: true,
        updatedAt: true,
      },
    });
  } catch (error) {
    if (isUniqueConstraintError(error)) {
      throw new ApiError(
        409,
        'An account with this email already exists.'
      );
    }
    throw error;
  }
}