import { Request, Response, NextFunction } from 'express';

export const getUserId = (req: Request) => {
  if (!req.user) {
    throw new Error('Unauthorized');
  }
  return req.user.id;
};
