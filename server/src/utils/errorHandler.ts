import { Request, Response, NextFunction } from "express";

const globalError = (error: any, _req: Request, res: Response, _next: NextFunction) => {
    const status = error.status || 400;
    console.log("ErrorHandler.globalError", error.status)
    res.status(status).json({
        message: error.message || "ErrorHandler.globalError - some error occurred"
    });

    if (process.env.NODE_ENV !== "PROD") console.error(error);
};

export default globalError;