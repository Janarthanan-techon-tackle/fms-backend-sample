class ApiResponse {
  statusCode: number;
  message: string;
  data: any;

  constructor(statusCode: number, message: string, data: any = null) {
    this.statusCode = statusCode;
    this.message = message;
    this.data = data;
  }

  static send(res: any, statusCode: number, message: string, data: any = null) {
    res.status(statusCode).json(new ApiResponse(statusCode, message, data));
  }
}

export default ApiResponse;
