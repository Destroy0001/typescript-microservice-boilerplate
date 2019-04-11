export class SerializerUtil {
  static requestSerializer(request: any) {
    return {
      headers: request.headers,
      ip: request.ip,
      method: request.method,
      path: request.path,
      protocol: request.protocol,
      query: request.query,
      url: request.url,
      body: request.body,
    };
  }

  static responseSerializer(response: any) {
    return {
      body: response.body,
      headers: response.headers,
      responseTime: response.responseTime,
      statusCode: response.statusCode,
      type: response.type,
    };
  }

}
