import type { Request, Response, NextFunction } from 'express';
import type { ZodType } from 'zod';
import { ApiError } from '../utils/ApiError';

export function validateBody<T>(schema: ZodType<T>) {
  return (req: Request, _res: Response, next: NextFunction): void => {
    const result = schema.safeParse(req.body);

    if (!result.success) {
      const fieldErrors: Record<string, string> = {};
      for (const issue of result.error.issues) {
        const key = issue.path[0]?.toString() ?? '_';
        if (!fieldErrors[key]) {
          fieldErrors[key] = issue.message;
        }
      }
      next(new ApiError(400, 'Validation failed.', fieldErrors));
      return;
    }

    req.body = result.data;
    next();
  };
}