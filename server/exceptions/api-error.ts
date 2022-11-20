export default class ApiError extends Error {
  status;
  errors;

  constructor(status: number, message: string, errors = []) {
    super(message);
    this.status = status;
    this.errors = errors;
  }

  static UnauthorizedError() { // static func for using when don`t create child of class
    return new ApiError(401, 'User is not authorized');
  } 

  static BadRequest(message: string, errors = []) {
    return new ApiError(400, message, errors);
  }
};
