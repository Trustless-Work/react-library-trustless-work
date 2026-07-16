import type { AxiosRequestConfig } from "axios";
import type { EscrowType } from "../../types";
import type { AttributionHeaders } from "../../types/types.payload";
import {
  ApproveAndReleaseMilestonesPayload,
  ApproveMilestonesPayload,
  BatchContractIdsParams,
  ChangeMilestoneStatusPayload,
  DeployMultiReleaseEscrowPayload,
  DeploySingleReleaseEscrowPayload,
  FundEscrowPayload,
  ListEscrowEventsParams,
  ListEscrowsParams,
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
} from "../../types/types.payload";
import {
  BatchEscrowDetailsResponse,
  BatchEscrowFinancialResponse,
  BatchEscrowMilestonesResponse,
  BuildTransactionResponse,
  DeployEscrowResponse,
  GetEscrowMilestonesResponse,
  GetEscrowResponse,
  ListEscrowEventsResponse,
  ListEscrowsResponse,
  SendTransactionResponse,
} from "../../types/types.response";
import type { HttpTransport } from "../../transport/http-transport";

function attributionAxiosHeaders(
  attribution?: AttributionHeaders,
): Record<string, string> | undefined {
  if (!attribution) return undefined;
  const headers: Record<string, string> = {};
  if (attribution.platformId) {
    headers["X-TW-Platform"] = attribution.platformId;
  }
  if (attribution.subjectId) {
    headers["X-TW-Subject"] = attribution.subjectId;
  }
  return Object.keys(headers).length > 0 ? headers : undefined;
}

function toContractIdsParams(contractIds: string[]): Record<string, string[]> {
  return { contractIds };
}

function serializeParams(params: Record<string, unknown>): string {
  const search = new URLSearchParams();
  for (const [key, value] of Object.entries(params)) {
    if (value === undefined || value === null) continue;
    if (Array.isArray(value)) {
      for (const item of value) {
        search.append(key, String(item));
      }
      continue;
    }
    search.append(key, String(value));
  }
  return search.toString();
}

/**
 * REST escrow API — operate (build XDR) + read endpoints under `/escrows` and `/escrow/:type/v2`.
 */
export class EscrowRestService {
  constructor(private readonly http: HttpTransport) {}

  private v2Base(type: EscrowType) {
    return `/escrow/${type}/v2`;
  }

  private withAttribution(
    attribution?: AttributionHeaders,
  ): AxiosRequestConfig | undefined {
    const headers = attributionAxiosHeaders(attribution);
    return headers ? { headers } : undefined;
  }

  sendTransaction(signedXdr: string) {
    return this.http.axios
      .post<SendTransactionResponse>("/stellar/send-transaction", {
        signedXdr,
      })
      .then((r) => r.data);
  }

  deployEscrow(
    data: DeploySingleReleaseEscrowPayload | DeployMultiReleaseEscrowPayload,
    type: EscrowType,
    attribution?: AttributionHeaders,
  ) {
    return this.http.axios
      .post<DeployEscrowResponse>(
        `${this.v2Base(type)}/deploy`,
        data,
        this.withAttribution(attribution),
      )
      .then((r) => r.data);
  }

  updateEscrow(
    data: UpdateSingleReleaseEscrowPayload | UpdateMultiReleaseEscrowPayload,
    type: EscrowType,
  ) {
    return this.http.axios
      .put<BuildTransactionResponse>(`${this.v2Base(type)}/update`, data)
      .then((r) => r.data);
  }

  changeMilestoneStatus(data: ChangeMilestoneStatusPayload, type: EscrowType) {
    return this.http.axios
      .post<BuildTransactionResponse>(
        `${this.v2Base(type)}/change-milestone-status`,
        data,
      )
      .then((r) => r.data);
  }

  approveMilestones(data: ApproveMilestonesPayload, type: EscrowType) {
    return this.http.axios
      .post<BuildTransactionResponse>(
        `${this.v2Base(type)}/approve-milestones`,
        data,
      )
      .then((r) => r.data);
  }

  manageMilestones(
    data:
      | ManageSingleReleaseMilestonesPayload
      | ManageMultiReleaseMilestonesPayload,
    type: EscrowType,
  ) {
    return this.http.axios
      .post<BuildTransactionResponse>(
        `${this.v2Base(type)}/manage-milestones`,
        data,
      )
      .then((r) => r.data);
  }

  fundEscrow(data: FundEscrowPayload, type: EscrowType) {
    return this.http.axios
      .post<BuildTransactionResponse>(`${this.v2Base(type)}/fund`, data)
      .then((r) => r.data);
  }

  releaseFunds(
    data: SingleReleaseReleaseFundsPayload | MultiReleaseReleaseFundsPayload,
    type: EscrowType,
  ) {
    return this.http.axios
      .post<BuildTransactionResponse>(
        `${this.v2Base(type)}/release-funds`,
        data,
      )
      .then((r) => r.data);
  }

  releaseMilestones(data: MultiReleaseReleaseFundsPayload) {
    return this.releaseFunds(data, "multi-release");
  }

  approveAndReleaseMilestones(data: ApproveAndReleaseMilestonesPayload) {
    return this.http.axios
      .post<BuildTransactionResponse>(
        `${this.v2Base("multi-release")}/approve-and-release-milestones`,
        data,
      )
      .then((r) => r.data);
  }

  resolveDispute(
    data:
      | SingleReleaseResolveDisputePayload
      | MultiReleaseResolveDisputePayload,
    type: EscrowType,
  ) {
    return this.http.axios
      .post<BuildTransactionResponse>(
        `${this.v2Base(type)}/resolve-dispute`,
        data,
      )
      .then((r) => r.data);
  }

  withdrawRemainingFunds(
    data:
      | SingleReleaseWithdrawRemainingFundsPayload
      | MultiReleaseWithdrawRemainingFundsPayload,
    type: EscrowType,
  ) {
    return this.http.axios
      .post<BuildTransactionResponse>(
        `${this.v2Base(type)}/withdraw-remaining-funds`,
        data,
      )
      .then((r) => r.data);
  }

  startDispute(
    data: SingleReleaseStartDisputePayload | MultiReleaseStartDisputePayload,
    type: EscrowType,
  ) {
    const path = type === "single-release" ? "dispute" : "dispute-milestones";
    return this.http.axios
      .post<BuildTransactionResponse>(`${this.v2Base(type)}/${path}`, data)
      .then((r) => r.data);
  }

  disputeMilestones(data: MultiReleaseStartDisputePayload) {
    return this.startDispute(data, "multi-release");
  }

  listEscrows(params: ListEscrowsParams = {}) {
    return this.http.axios
      .get<ListEscrowsResponse>("/escrows", {
        params,
        paramsSerializer: { serialize: serializeParams },
      })
      .then((r) => r.data);
  }

  getEscrow(contractId: string) {
    return this.http.axios
      .get<GetEscrowResponse>(`/escrows/${encodeURIComponent(contractId)}`)
      .then((r) => r.data);
  }

  getEscrowDetails(params: BatchContractIdsParams | string[]) {
    const contractIds = Array.isArray(params) ? params : params.contractIds;
    return this.http.axios
      .get<BatchEscrowDetailsResponse>("/escrows/details", {
        params: toContractIdsParams(contractIds),
        paramsSerializer: { serialize: serializeParams },
      })
      .then((r) => r.data);
  }

  listEscrowEvents(contractId: string, params: ListEscrowEventsParams = {}) {
    return this.http.axios
      .get<ListEscrowEventsResponse>(
        `/escrows/${encodeURIComponent(contractId)}/events`,
        {
          params,
          paramsSerializer: { serialize: serializeParams },
        },
      )
      .then((r) => r.data);
  }

  getEscrowMilestones(contractId: string) {
    return this.http.axios
      .get<GetEscrowMilestonesResponse>(
        `/escrows/${encodeURIComponent(contractId)}/milestones`,
      )
      .then((r) => r.data);
  }

  getEscrowsMilestones(params: BatchContractIdsParams | string[]) {
    const contractIds = Array.isArray(params) ? params : params.contractIds;
    return this.http.axios
      .get<BatchEscrowMilestonesResponse>("/escrows/milestones", {
        params: toContractIdsParams(contractIds),
        paramsSerializer: { serialize: serializeParams },
      })
      .then((r) => r.data);
  }

  getEscrowsFinancial(params: BatchContractIdsParams | string[]) {
    const contractIds = Array.isArray(params) ? params : params.contractIds;
    return this.http.axios
      .get<BatchEscrowFinancialResponse>("/escrows/financial", {
        params: toContractIdsParams(contractIds),
        paramsSerializer: { serialize: serializeParams },
      })
      .then((r) => r.data);
  }
}
