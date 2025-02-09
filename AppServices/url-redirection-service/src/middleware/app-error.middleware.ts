import { Request, Response, NextFunction } from 'express';
import { AppError } from '../utils/app-error.util';


export const globalErrorHandler = (err: AppError, req: Request, res: Response, next: NextFunction) => {
    // Set a default status code and message
    const statusCode = err.statusCode || 500;
    const message = err.message || 'Internal Server Error';

    // Log the error (optional: can be improved by logging to a file or logging service)
    console.error(err);

    res.status(statusCode).json({
        status: 'error',
        message: message,
        stack: process.env.NODE_ENV === 'development' ? err.stack : undefined
    });
};
