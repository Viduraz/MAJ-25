export const errorHandler = (statusCode, message) => {
    const error = new Error();
    error.statusCode = statusCode;
    return error;
}