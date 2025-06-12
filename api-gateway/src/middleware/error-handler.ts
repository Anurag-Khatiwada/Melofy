import {Request, Response, NextFunction} from 'express';
import logger from "../utils/logger.js";

interface CustomError extends Error{
    status?: number;
}

const errorHandler = (err: CustomError, req:Request, res:Response, next:NextFunction): void =>{
    logger.error(err.stack);

    res.status(err.status || 500).json({
        success: false,
        message: err.message || "Internal server error"
    });

    next();
}

export default errorHandler