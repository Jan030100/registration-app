import type { Request, Response, NextFunction } from 'express';
import { ApiError } from '../utils/ApiError';
import { env } from '../config/env';

interface BodyParserError {
  type?: string;
}

export function errorHandler(
  err: unknown,
  _req: Request,
  res: Response,
  _next: NextFunction
): void {
  if (err instanceof ApiError) {
    res.status(err.statusCode).json({
      error: err.message,
      ...(err.details !== undefined ? { details: err.details } : {}),
    });
    return;
  }

  const bodyParserError = err as BodyParserError;
  if (bodyParserError?.type === 'entity.parse.failed') {
    res.status(400).json({ error: 'Invalid JSON payload.' });
    return;
  }

  console.error('Unhandled error:', err);

  res.status(500).json({
    error: 'Internal server error.',
    ...(env.nodeEnv === 'development' && err instanceof Error
      ? { message: err.message }
      : {}),
  });
}