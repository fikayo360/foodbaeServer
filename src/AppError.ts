interface AppError {
    errorCode: number;
    message: string;
    statusCode: number;
}

class AppError extends Error implements AppError{
    constructor(errorCode:number,message:string,statusCode:number){
        super(message);
        this.errorCode = errorCode;
        this.statusCode = statusCode;
    }
}

module.exports = AppError;