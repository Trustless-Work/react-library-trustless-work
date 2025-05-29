import axios, { AxiosInstance } from "axios";
import {
  baseURL,
  InitializeEscrowResponse,
  UpdateEscrowResponse,
} from "./types";
import {
  ChangeMilestoneStatusPayload,
  FundEscrowPayload,
  GetBalanceParams,
  GetEscrowParams,
  InitializeEscrowPayload,
  ReleaseFundsPayload,
  ResolveDisputePayload,
  SendTransactionPayload,
  StartDisputePayload,
  UpdateEscrowPayload,
} from "./types";
import {
  EscrowRequestResponse,
  GetEscrowBalancesResponse,
  SendTransactionResponse,
} from "./types";
import { Escrow } from "./types";
import { EscrowType } from "./types/types";
import { ApproveMilestonePayload } from "./types/types.payload";

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
   * @returns The response from the API SendTransactionResponse | InitializeEscrowResponse | UpdateEscrowResponse
   */
  sendTransaction(data: SendTransactionPayload) {
    return this.axios
      .post<
        | SendTransactionResponse
        | InitializeEscrowResponse
        | UpdateEscrowResponse
      >("/helper/send-transaction", data)
      .then((r) => r.data);
  }

  /**
   * Initialize an escrow
   * @param data - The data (InitializeEscrowPayload, this can be a single-release or multi-release) to initialize
   * @param type - The type of escrow (single-release or multi-release) to initialize
   * @returns The response from the API EscrowRequestResponse, but you can set as InitializeEscrowResponse
   */
  initializeEscrow(data: InitializeEscrowPayload, type: EscrowType) {
    return this.axios
      .post<EscrowRequestResponse>(`/deployer/${type}`, data)
      .then((r) => r.data);
  }

  /**
   * Update an escrow
   * @param data - The data (UpdateEscrowPayload, this can be a single-release or multi-release) to update
   * @param type - The type of escrow (single-release or multi-release) to update
   * @returns The response from the API EscrowRequestResponse, but you can set as UpdateEscrowResponse
   */
  updateEscrow(data: UpdateEscrowPayload, type: EscrowType) {
    return this.axios
      .put<EscrowRequestResponse>(`/escrow/${type}/update-escrow`, data)
      .then((r) => r.data);
  }

  /**
   * Change the status of a milestone
   * @param data - The data (ChangeMilestoneStatusPayload, this can be a single-release or multi-release) to change
   * @param type - The type of escrow (single-release or multi-release) to change
   * @returns The response from the API EscrowRequestResponse
   */
  changeMilestoneStatus(data: ChangeMilestoneStatusPayload, type: EscrowType) {
    return this.axios
      .post<EscrowRequestResponse>(
        `/escrow/${type}/change-milestone-status`,
        data
      )
      .then((r) => r.data);
  }

  /**
   * Approve a milestone
   * @param data - The data (ApproveMilestonePayload) to approve
   * @param type - The type of escrow (single-release or multi-release) to approve
   * @returns The response from the API EscrowRequestResponse
   */
  approveMilestone(data: ApproveMilestonePayload, type: EscrowType) {
    return this.axios
      .post<EscrowRequestResponse>(`/escrow/${type}/approve-milestone`, data)
      .then((r) => r.data);
  }

  /**
   * Fund an escrow
   * @param data - The data (FundEscrowPayload) to fund
   * @param type - The type of escrow (single-release or multi-release) to fund
   * @returns The response from the API EscrowRequestResponse
   */
  fundEscrow(data: FundEscrowPayload, type: EscrowType) {
    return this.axios
      .post<EscrowRequestResponse>(`/escrow/${type}/fund-escrow`, data)
      .then((r) => r.data);
  }

  /**
   * Release funds from an escrow
   * @param data - The data (ReleaseFundsPayload) to release
   * @param type - The type of escrow (single-release or multi-release) to release
   * @returns The response from the API EscrowRequestResponse
   */
  releaseFunds(data: ReleaseFundsPayload, type: EscrowType) {
    const endpoint =
      type === "single-release" ? "release-funds" : "release-milestone-funds";
    return this.axios
      .post<EscrowRequestResponse>(`/escrow/${type}/${endpoint}`, data)
      .then((r) => r.data);
  }

  /**
   * Resolve a dispute
   * @param data - The data (ResolveDisputePayload) to resolve
   * @param type - The type of escrow (single-release or multi-release) to resolve
   * @returns The response from the API EscrowRequestResponse
   */
  resolveDispute(data: ResolveDisputePayload, type: EscrowType) {
    const endpoint =
      type === "single-release"
        ? "resolve-dispute"
        : "resolve-milestone-dispute";
    return this.axios
      .post<EscrowRequestResponse>(`/escrow/${type}/${endpoint}`, data)
      .then((r) => r.data);
  }

  /**
   * Start a dispute
   * @param data - The data (StartDisputePayload) to start
   * @param type - The type of escrow (single-release or multi-release) to start
   * @returns The response from the API EscrowRequestResponse
   */
  startDispute(data: StartDisputePayload, type: EscrowType) {
    const endpoint =
      type === "single-release" ? "dispute-escrow" : "dispute-milestone";
    return this.axios
      .post<EscrowRequestResponse>(`/escrow/${type}/${endpoint}`, data)
      .then((r) => r.data);
  }

  /**
   * Get an escrow
   * @param data - The data (GetEscrowParams) to get
   * @returns The response from the API Escrow
   */
  getEscrow(data: GetEscrowParams) {
    return this.axios
      .get<Escrow>("/escrow/get-escrow", {
        params: data,
      })
      .then((r) => r.data);
  }

  /**
   * Get multiple balances
   * @param data - The data (GetBalanceParams) to get
   * @returns The response from the API GetEscrowBalancesResponse
   */
  getMultipleEscrowBalances(data: GetBalanceParams) {
    return this.axios
      .get<GetEscrowBalancesResponse[]>("/helper/get-multiple-escrow-balance", {
        params: data,
      })
      .then((r) => r.data);
  }
}
