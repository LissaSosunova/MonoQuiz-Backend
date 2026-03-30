import { Request, Response, NextFunction } from 'express';
import { z } from 'zod';

export const validateTestProgress =
    (schema: z.ZodSchema) =>
        (req: Request, res: Response, next: NextFunction) => {
            try {
                schema.parse(req.body);
                next();
            } catch (e: any) {
                return res.status(400).json(e.errors);
            }
        };