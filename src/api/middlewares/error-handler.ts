import { Request, Response,NextFunction } from 'express';
const AppError = require('../../AppError')

const ErrorHandler = (err:any,req:Request,res:Response,next:NextFunction) => {
    if (err.name === "ValidationError") {
        return res.status(400).send({
          type: "ValidationError",
          details: err.details,
        });
      }
    
      if (err instanceof AppError) {
        return res.status(err.statusCode).json({
          errorCode: err.errorCode,
        });
      }
    
      return res.status(500).send("Something went wrong");
}

module.exports = ErrorHandler