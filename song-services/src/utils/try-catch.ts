import { NextFunction, Request, RequestHandler, Response } from "express";
import logger from "./logger.js";

const TryCatch = (handler: (req: Request, res: Response, next: NextFunction) => Promise<any>): RequestHandler => {
  return async (req, res, next) => {
    try {
      await handler(req, res, next);
    } catch (error: any) {
      logger.error(error);
      res.status(500).json({
        message: error.message || "Internal Server Error"
      });
    }
  };
};

export default TryCatch