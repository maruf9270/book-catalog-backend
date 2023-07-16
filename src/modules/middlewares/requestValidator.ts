import { NextFunction, Request, Response } from "express";
import { AnyZodObject, z } from "zod";

const requestValidator =
  (schema: AnyZodObject) =>
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      await schema.parseAsync({
        body: req.body,
        param: req.params,
        querry: req.query,
        cookies: req.cookies,
      });
      next();
    } catch (error) {
      next(error);
    }
  };

export const RequestValidator = { requestValidator };
