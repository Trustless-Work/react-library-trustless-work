import axios, {
  AxiosInstance,
  AxiosRequestConfig,
  InternalAxiosRequestConfig,
} from "axios";
import { parseProblemDetails } from "../errors/parse-problem-details";
import { TrustlessWorkApiError } from "../errors/trustless-work-api-error";
import type { baseURL } from "../types";

export type HttpTransportOptions = {
  baseURL: baseURL;
  apiKey?: string;
  getAccessToken?: () => string | undefined | null;
  defaultHeaders?: Record<string, string>;
};

/**
 * Shared Axios transport (auth + Problem Details). Used by REST and GraphQL services.
 */
export class HttpTransport {
  readonly axios: AxiosInstance;
  private apiKey: string | undefined;
  private getAccessToken: (() => string | undefined | null) | undefined;
  private defaultHeaders: Record<string, string>;

  constructor(options: HttpTransportOptions) {
    this.apiKey = options.apiKey;
    this.getAccessToken = options.getAccessToken;
    this.defaultHeaders = options.defaultHeaders ?? {};

    this.axios = axios.create({ baseURL: options.baseURL });
    this.axios.interceptors.request.use((config) => this.applyAuth(config));
    this.axios.interceptors.response.use(
      (response) => response,
      (error) => {
        const data = axios.isAxiosError(error)
          ? error.response?.data
          : undefined;
        const problem = parseProblemDetails(data);
        if (problem) {
          return Promise.reject(new TrustlessWorkApiError(problem));
        }
        return Promise.reject(error);
      },
    );
  }

  private applyAuth(
    config: InternalAxiosRequestConfig,
  ): InternalAxiosRequestConfig {
    config.headers = config.headers ?? {};
    for (const [key, value] of Object.entries(this.defaultHeaders)) {
      if (config.headers[key] === undefined) {
        config.headers[key] = value;
      }
    }
    if (this.apiKey) {
      config.headers["x-api-key"] = this.apiKey;
    }
    const token = this.getAccessToken?.();
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  }

  setApiKey(apiKey: string) {
    this.apiKey = apiKey;
  }

  setAccessTokenGetter(getAccessToken?: () => string | undefined | null) {
    this.getAccessToken = getAccessToken;
  }

  setDefaultHeaders(headers: Record<string, string>) {
    this.defaultHeaders = headers;
  }

  request<T>(config: AxiosRequestConfig) {
    return this.axios.request<T>(config).then((r) => r.data);
  }
}
