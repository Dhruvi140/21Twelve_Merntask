class CustomError extends Error {
    constructor(message, statusCode) {
        super(message);     // Calling constructor of the base/parent class which is Error here.
        this.statusCode = statusCode;
        this.status = statusCode >= 400 && statusCode <= 500 ? "Fail" : "Error";
        this.isOperational = true;

        Error.captureStackTrace(this, this.constructor);
    }
}

module.exports = CustomError;