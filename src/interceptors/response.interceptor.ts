// src/interceptors/response.interceptor.ts
import { AxiosResponse } from "axios";

export function ResponseInterceptorFulfilled(
  response: AxiosResponse<any>
): AxiosResponse<any> | Promise<AxiosResponse<any>> {
  return response;
}

export function ResponseInterceptorRejected(error: any): any {

  if (error.response) {
    error.response.data = {
      ...error.response.data,
      digest: error.response.headers["x-digest-header"] || "default-digest",
    };
  }
  return Promise.reject(error);
}
