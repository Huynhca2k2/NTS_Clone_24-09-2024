// src/interceptors/request.interceptor.ts
import { InternalAxiosRequestConfig } from "axios";

export function RequestInterceptorFulfilled(
  config: InternalAxiosRequestConfig<any>
): InternalAxiosRequestConfig<any> | Promise<InternalAxiosRequestConfig<any>> {
  return config;
}

export function RequestInterceptorRejected(error: any): any {
  return Promise.reject(error);
}
