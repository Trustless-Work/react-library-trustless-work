import axios, { AxiosInstance } from "axios";
import { parseProblemDetails } from "./errors/parse-problem-details";
import { TrustlessWorkApiError } from "./errors/trustless-work-api-error";
import { baseURL, EscrowType } from "./types";
import {
  ApproveAndReleaseMilestonesPayload,
  ApproveMilestonesPayload,
  ChangeMilestoneStatusPayload,
  FundEscrowPayload,
  GetBalanceParams,
  GetEscrowFromIndexerByContractIdsParams,
  GetEscrowsFromIndexerByRoleParams,
  GetEscrowsFromIndexerBySignerParams,
  InitializeMultiReleaseEscrowPayload,
  InitializeSingleReleaseEscrowPayload,
  ManageMultiReleaseMilestonesPayload,
  ManageSingleReleaseMilestonesPayload,
  MultiReleaseReleaseFundsPayload,
  MultiReleaseResolveDisputePayload,
  MultiReleaseStartDisputePayload,
  MultiReleaseWithdrawRemainingFundsPayload,
  SingleReleaseReleaseFundsPayload,
  SingleReleaseResolveDisputePayload,
  SingleReleaseStartDisputePayload,
  SingleReleaseWithdrawRemainingFundsPayload,
  UpdateMultiReleaseEscrowPayload,
  UpdateSingleReleaseEscrowPayload,
} from "./types/types.payload";
import {
  EscrowRequestResponse,
  GetEscrowBalancesResponse,
  GetEscrowResponse,
  SendTransactionResponse,
} from "./types/types.response";

export class TrustlessWorkClient {
  private axios: AxiosInstance;

  constructor(baseURL: baseURL, apiKey: string) {
    this.axios = axios.create({ baseURL });
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
    if (apiKey) this.setApiKey(apiKey);
  }

  /**
   * Set the API key for the client
   */
  setApiKey(apiKey: string) {
    this.axios.interceptors.request.clear();
    this.axios.interceptors.request.use((config) => {
      config.headers = config.headers ?? {};
      config.headers["x-api-key"] = apiKey;
      return config;
    });
  }

  private v2Base(type: EscrowType) {
    return `/escrow/${type}/v2`;
  }

  /**
   * Submit a signed transaction to the Stellar network.
   */
  sendTransaction(signedXdr: string) {
    return this.axios
      .post<SendTransactionResponse>("/stellar/send-transaction", {
        signedXdr,
      })
      .then((r) => r.data);
  }

  /**
   * Build an unsigned deploy transaction for a new v2 escrow.
   */
  initializeEscrow(
    data:
      | InitializeSingleReleaseEscrowPayload
      | InitializeMultiReleaseEscrowPayload,
    type: EscrowType,
  ) {
    return this.axios
      .post<EscrowRequestResponse>(`${this.v2Base(type)}/deploy`, data)
      .then((r) => r.data);
  }

  /**
   * Build an unsigned update transaction for a v2 escrow.
   */
  updateEscrow(
    data: UpdateSingleReleaseEscrowPayload | UpdateMultiReleaseEscrowPayload,
    type: EscrowType,
  ) {
    return this.axios
      .put<EscrowRequestResponse>(`${this.v2Base(type)}/update`, data)
      .then((r) => r.data);
  }

  /**
   * Build an unsigned batch change-milestone-status transaction (single & multi).
   * Body: `{ contractId, serviceProvider, updates[] }` — up to 50 milestones per call.
   */
  changeMilestoneStatus(data: ChangeMilestoneStatusPayload, type: EscrowType) {
    return this.axios
      .post<EscrowRequestResponse>(
        `${this.v2Base(type)}/change-milestone-status`,
        data,
      )
      .then((r) => r.data);
  }

  /**
   * Build an unsigned batch approve-milestones transaction.
   */
  approveMilestones(data: ApproveMilestonesPayload, type: EscrowType) {
    return this.axios
      .post<EscrowRequestResponse>(
        `${this.v2Base(type)}/approve-milestones`,
        data,
      )
      .then((r) => r.data);
  }

  /**
   * Build an unsigned manage-milestones transaction (add / update milestones).
   */
  manageMilestones(
    data:
      | ManageSingleReleaseMilestonesPayload
      | ManageMultiReleaseMilestonesPayload,
    type: EscrowType,
  ) {
    return this.axios
      .post<EscrowRequestResponse>(
        `${this.v2Base(type)}/manage-milestones`,
        data,
      )
      .then((r) => r.data);
  }

  /**
   * Build an unsigned fund transaction.
   */
  fundEscrow(data: FundEscrowPayload, type: EscrowType) {
    return this.axios
      .post<EscrowRequestResponse>(`${this.v2Base(type)}/fund`, data)
      .then((r) => r.data);
  }

  /**
   * Build an unsigned release-funds transaction.
   * Single-release: releases the whole escrow. Multi-release: batch via `milestoneIndexes[]`.
   */
  releaseFunds(
    data: SingleReleaseReleaseFundsPayload | MultiReleaseReleaseFundsPayload,
    type: EscrowType,
  ) {
    return this.axios
      .post<EscrowRequestResponse>(`${this.v2Base(type)}/release-funds`, data)
      .then((r) => r.data);
  }

  /**
   * Build an unsigned batch release-milestones transaction (multi-release only).
   */
  releaseMilestones(data: MultiReleaseReleaseFundsPayload) {
    return this.releaseFunds(data, "multi-release");
  }

  /**
   * Multi-release only. Approve AND release the same milestone indexes atomically.
   */
  approveAndReleaseMilestones(data: ApproveAndReleaseMilestonesPayload) {
    return this.axios
      .post<EscrowRequestResponse>(
        `${this.v2Base("multi-release")}/approve-and-release-milestones`,
        data,
      )
      .then((r) => r.data);
  }

  /**
   * Build an unsigned resolve-dispute transaction.
   */
  resolveDispute(
    data:
      | SingleReleaseResolveDisputePayload
      | MultiReleaseResolveDisputePayload,
    type: EscrowType,
  ) {
    return this.axios
      .post<EscrowRequestResponse>(`${this.v2Base(type)}/resolve-dispute`, data)
      .then((r) => r.data);
  }

  /**
   * Build an unsigned withdraw-remaining-funds transaction.
   */
  withdrawRemainingFunds(
    data:
      | SingleReleaseWithdrawRemainingFundsPayload
      | MultiReleaseWithdrawRemainingFundsPayload,
    type: EscrowType,
  ) {
    return this.axios
      .post<EscrowRequestResponse>(
        `${this.v2Base(type)}/withdraw-remaining-funds`,
        data,
      )
      .then((r) => r.data);
  }

  /**
   * Build an unsigned dispute transaction.
   * Single-release: `POST .../dispute` (whole escrow + `reason`).
   * Multi-release: `POST .../dispute-milestones` (batch `milestoneIndexes[]` + `reason`).
   */
  startDispute(
    data: SingleReleaseStartDisputePayload | MultiReleaseStartDisputePayload,
    type: EscrowType,
  ) {
    const path = type === "single-release" ? "dispute" : "dispute-milestones";
    return this.axios
      .post<EscrowRequestResponse>(`${this.v2Base(type)}/${path}`, data)
      .then((r) => r.data);
  }

  /**
   * Build an unsigned batch dispute-milestones transaction (multi-release only).
   */
  disputeMilestones(data: MultiReleaseStartDisputePayload) {
    return this.startDispute(data, "multi-release");
  }

  /**
   * Get multiple balances (helper — unchanged)
   */
  getMultipleEscrowBalances(data: GetBalanceParams) {
    return this.axios
      .get<GetEscrowBalancesResponse[]>(`/helper/get-multiple-escrow-balance`, {
        params: data,
      })
      .then((r) => r.data);
  }

  /**
   * Get escrows from the indexer by signer (helper — unchanged)
   */
  getEscrowsFromIndexerBySigner(data: GetEscrowsFromIndexerBySignerParams) {
    return this.axios
      .get<GetEscrowResponse[]>(`/helper/get-escrows-by-signer`, {
        params: data,
      })
      .then((r) => r.data);
  }

  /**
   * Get escrows from the indexer by role (helper — unchanged)
   */
  getEscrowsFromIndexerByRole(data: GetEscrowsFromIndexerByRoleParams) {
    return this.axios
      .get<GetEscrowResponse[]>(`/helper/get-escrows-by-role`, {
        params: data,
      })
      .then((r) => r.data);
  }

  /**
   * Get escrows from the indexer by contract ids (helper — unchanged)
   */
  getEscrowFromIndexerByContractIds(
    data: GetEscrowFromIndexerByContractIdsParams,
  ) {
    return this.axios
      .get<GetEscrowResponse[]>(`/helper/get-escrow-by-contract-ids`, {
        params: data,
      })
      .then((r) => r.data);
  }
}
