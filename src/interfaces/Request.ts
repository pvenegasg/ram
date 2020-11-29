import axios, { AxiosInstance, AxiosResponse } from 'axios';
import { LooseObject } from '../types';

class Request {
  public instance: AxiosInstance;

  constructor(url: string, options?: Record<string, string>) {
    this.instance = axios.create({
      baseURL: url,
      ...options,
    });
  }

  get<T>(url: string, headers?: LooseObject): Promise<AxiosResponse> {
    return this.instance.get<T>(url, headers);
  }

  post(
    url: string,
    body: LooseObject,
    headers: LooseObject
  ): Promise<AxiosResponse> {
    return this.instance.post(url, body, headers);
  }
}

export default Request;
