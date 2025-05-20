import axios, { AxiosInstance } from "axios";
import { baseURL } from "./types";
import {
  InitializeEscrowPayload,
  SendTransactionPayload,
} from "./types.payload";
import {
  EscrowRequestResponse,
  SendTransactionResponse,
} from "./types.response";

export class TrustlessWorkClient {
  private axios: AxiosInstance;

  constructor(baseURL: baseURL, apiKey: string) {
    this.axios = axios.create({ baseURL });
    if (apiKey) this.setApiKey(apiKey);
  }

  setApiKey(apiKey: string) {
    this.axios.interceptors.request.clear();
    this.axios.interceptors.request.use((config) => {
      config.headers = config.headers ?? {};
      config.headers["Authorization"] = `Bearer ${apiKey}`;
      return config;
    });
  }

  sendTransaction(data: SendTransactionPayload) {
    return this.axios
      .post<SendTransactionResponse>("/helper/send-transaction", data)
      .then((r) => r.data);
  }

  initializeEscrow(data: InitializeEscrowPayload) {
    return this.axios
      .post<EscrowRequestResponse>("/deployer/invoke-deployer-contract", data)
      .then((r) => r.data);
  }
}
