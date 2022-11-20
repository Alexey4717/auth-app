import { Request, Response, NextFunction } from 'express';

import ApiError from "../exceptions/api-error";


export default function (
  err: typeof ApiError | Error, 
  req: Request | any, 
  res: Response, 
  next: NextFunction
) {
  console.log(err);
  if (err instanceof ApiError) {
    return res.status(err.status).json({ message: err.message, errors: err.errors });
  }
  return res.status(500).json({ message: "Some unexpected error in server is occured" });
};
