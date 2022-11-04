export class ControllerResponse {
  
  constructor(
    public readonly httpStatus: number, 
    public readonly body?: object
  ){

  }

  static success(body?: object): ControllerResponse {
    return new ControllerResponse(200, body);
  }

  static badRequest(body?: object): ControllerResponse {
    return new ControllerResponse(400, body);
  }

  static notFound(body?: object): ControllerResponse {
    return new ControllerResponse(404, body);
  }

  static serverError(body?: object): ControllerResponse {
    return new ControllerResponse(500, body);
  }

}
