export class HttpError extends Error {
  statusCode: number;
  error: string;

  constructor(error: { code: number; message: string }, message: string) {
    super(message);
    this.statusCode = error.code;
    this.error = error.message;
  }
}

export const HttpStatus = {
  OK: { code: 200, message: 'OK' },
  BAD_REQUEST: { code: 400, message: 'Bad Request' },
  UNAUTHORIZED: { code: 401, message: 'Unauthorized' },
  FORBIDDEN: { code: 403, message: 'Forbidden' },
  NOT_FOUND: { code: 404, message: 'Not Found' },
  INTERNAL_SERVER_ERROR: { code: 500, message: 'Internal Server Error' },
};
