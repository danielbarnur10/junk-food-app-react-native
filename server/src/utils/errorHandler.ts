import { Request, Response } from "express"

const globalError = (error: any, _req: Request, res: Response) => {
    const status = error.status || 400;

    res.status(status).json({ message: error.message || "ErrorHandler.globalError - some error accurd" })
    if (process.env.NODE_ENV !== 'PROD') console.log(error);
}
export default globalError;