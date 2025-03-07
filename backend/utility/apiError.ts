class ApiError extends Error {
    public statusCode: number;
    public errors: any;
    constructor(
      statusCode: number = 500,
      name: string = "Api Error",
      errorMessage: string = "Resource not found!",
      errors: any = []
    ) {
      super(errorMessage);
      this.name = name;
      this.statusCode = statusCode;
      this.errors = errors;
    }
  }
  
  export default ApiError;