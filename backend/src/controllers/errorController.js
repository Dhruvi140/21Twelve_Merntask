const CustomError = require("../utills/CustomError");

const devErrors = (res, error) => {
    res.status(error.statusCode).json({
        status: error.statusCode,
        message: error.message,
        stackTrace: error.stack,
        error: error
    });
}

const castErrorHandler = (err) => {
    const msg = `Invalid value for ${err.path} : ${err.value}!`;
    return new CustomError(msg, 400);
}

const duplicateKeyErrorHandler = (err) => {
    const msg = `This ${Object.keys(err.keyValue)} is already Registered. Please enter another`;
    console.log(msg);
    return new CustomError(msg, 400);
}

const validationErrorHnadler = (err) => {
    const errors = Object.values(err.errors).map(val => val.message);
    const errorMessages = errors.join(" ");
    const msg = `Invalid input data : ${errorMessages}`;
    return new CustomError(msg, 400);
}

const prodErrors = (res, error) => {
    if (error.isOperational) {
        res.status(error.statusCode).json({
            status: error.statusCode,
            message: error.message
        });
    }
    else {
        res.status(500).json({
            status: "error",
            message: "Something went wrong! Please try again later."
        })
    }
}

module.exports = (error, req, res, next) => {
    error.statusCode = error.statusCode || 500;
    error.status = error.status || "error";
    if (error.name === "CastError") error = castErrorHandler(error);
    if (error.code === 11000) error = duplicateKeyErrorHandler(error);
    if (error.name === "ValidationError") error = validationErrorHnadler(error);
    if (process.env.NODE_ENV === "development") {
        devErrors(res, error);
    }
    else if (process.env.NODE_ENV === "production") {
        prodErrors(res, error);
    }
};