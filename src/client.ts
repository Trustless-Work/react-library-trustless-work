import axios, { AxiosInstance } from "axios";
import { baseURL } from "./types";
import {
  ChangeMilestoneApprovedFlagPayload,
  ChangeMilestoneStatusPayload,
  FundEscrowPayload,
  GetBalanceParams,
  GetEscrowPayload,
  InitializeEscrowPayload,
  ReleaseFundsPayload,
  ResolveDisputePayload,
  SendTransactionPayload,
  StartDisputePayload,
  UpdateEscrowPayload,
} from "./types.payload";
import {
  EscrowRequestResponse,
  GetBalancesResponse,
  InitializeEscrowResponse,
  SendTransactionResponse,
  UpdateEscrowResponse,
} from "./types.response";
import { Escrow } from "./types.entity";

export class TrustlessWorkClient {
  private axios: AxiosInstance;

  constructor(baseURL: baseURL, apiKey: string) {
    this.axios = axios.create({ baseURL });
    if (apiKey) this.setApiKey(apiKey);
  }

  /**
   * Set the API key for the client
   * @param apiKey - The API key to set
   */
  setApiKey(apiKey: string) {
    this.axios.interceptors.request.clear();
    this.axios.interceptors.request.use((config) => {
      config.headers = config.headers ?? {};
      config.headers["Authorization"] = `Bearer ${apiKey}`;
      return config;
    });
  }

  /**
   * Send a transaction
   * @param data - The data (SendTransactionPayload) to send
   * @returns The response from the API
   */
  sendTransaction(data: SendTransactionPayload) {
    return this.axios
      .post<SendTransactionResponse>("/helper/send-transaction", data)
      .then((r) => r.data);
  }

  /**
   * Initialize an escrow
   * @param data - The data (InitializeEscrowPayload) to initialize
   * @returns The response from the API
   */
  initializeEscrow(data: InitializeEscrowPayload) {
    return this.axios
      .post<EscrowRequestResponse>("/deployer/invoke-deployer-contract", data)
      .then((r) => r.data);
  }

  /**
   * Change the status of a milestone
   * @param data - The data (ChangeMilestoneStatusPayload) to change
   * @returns The response from the API
   */
  changeMilestoneStatus(data: ChangeMilestoneStatusPayload) {
    return this.axios
      .post<EscrowRequestResponse>("/escrow/change-milestone-status", data)
      .then((r) => r.data);
  }

  /**
   * Change the approved flag of a milestone
   * @param data - The data (ChangeMilestoneApprovedFlagPayload) to change
   * @returns The response from the API
   */
  changeMilestoneApprovedFlag(data: ChangeMilestoneApprovedFlagPayload) {
    return this.axios
      .post<EscrowRequestResponse>(
        "/escrow/change-milestone-approved-flag",
        data
      )
      .then((r) => r.data);
  }

  /**
   * Fund an escrow
   * @param data - The data (FundEscrowPayload) to fund
   * @returns The response from the API
   */
  fundEscrow(data: FundEscrowPayload) {
    return this.axios
      .post<EscrowRequestResponse>("/escrow/fund-escrow", data)
      .then((r) => r.data);
  }

  /**
   * Release funds from an escrow
   * @param data - The data (ReleaseFundsPayload) to release
   * @returns The response from the API
   */
  releaseFunds(data: ReleaseFundsPayload) {
    return this.axios
      .post<EscrowRequestResponse>("/escrow/release-funds", data)
      .then((r) => r.data);
  }

  /**
   * Resolve a dispute
   * @param data - The data (ResolveDisputePayload) to resolve
   * @returns The response from the API
   */
  resolveDispute(data: ResolveDisputePayload) {
    return this.axios
      .post<EscrowRequestResponse>("/escrow/resolving-disputes", data)
      .then((r) => r.data);
  }

  /**
   * Start a dispute
   * @param data - The data (StartDisputePayload) to start
   * @returns The response from the API
   */
  startDispute(data: StartDisputePayload) {
    return this.axios
      .post<EscrowRequestResponse>("/escrow/change-dispute-flag", data)
      .then((r) => r.data);
  }

  /**
   * Update an escrow
   * @param data - The data (UpdateEscrowPayload) to update
   * @returns The response from the API
   */
  updateEscrow(data: UpdateEscrowPayload) {
    return this.axios
      .put<EscrowRequestResponse>("/escrow/update-escrow-by-contract-id", data)
      .then((r) => r.data);
  }

  /**
   * Get an escrow
   * @param data - The data (GetEscrowPayload) to get
   * @returns The response from the API
   */
  getEscrow(data: GetEscrowPayload) {
    return this.axios
      .get<Escrow>("/escrow/get-escrow-by-contract-id", {
        params: data,
      })
      .then((r) => r.data);
  }

  /**
   * Get multiple balances
   * @param data - The data (GetBalanceParams) to get
   * @returns The response from the API
   */
  getMultipleBalances(data: GetBalanceParams) {
    return this.axios
      .get<GetBalancesResponse[]>("/escrow/get-multiple-balances", {
        params: data,
      })
      .then((r) => r.data);
  }
}
