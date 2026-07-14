import type { EscrowNetwork, EscrowStatus, EscrowType } from "./types";
import type {
  MultiReleaseMilestone,
  SingleReleaseMilestone,
} from "./types.entity";
import type { EscrowSnapshot } from "./escrow.snapshot";

/**
 * Escrow read-model row (list + detail). Identified only by `contractId`.
 */
export type EscrowSummary = {
  network: EscrowNetwork;
  contractId: string;
  type: EscrowType;
  engagementId: string;
  status: EscrowStatus;
  /** Multi-release only (sum of milestones). Null for single-release. */
  totalAmount: number | null;
  lastLedgerSeq: string;
  createdAt: string;
  updatedAt: string;
  snapshot: EscrowSnapshot;
  /** Populated on detail / confirmed deploys (may be null for historical rows). */
  createdByUserId?: string | null;
  creatorAddress?: string | null;
};

/**
 * Indexed escrow event — `topics` + camelCased `payload` (no event `id`).
 */
export type EscrowEvent = {
  kind: string;
  actor: string | null;
  ledgerSeq: string;
  txHash: string;
  ledgerClosedAt: string;
  topics: string[];
  payload: Record<string, unknown>;
};

/**
 * Deposit recorded against an escrow (no deposit `id`).
 */
export type EscrowDeposit = {
  fromAddress: string;
  amount: number | string;
  asset: string;
  txHash?: string;
  ledgerSeq?: string;
  ledgerClosedAt?: string;
};

/**
 * Next release hint on financial batch rows.
 */
export type EscrowNextRelease = {
  milestoneIndex: number;
  amount: number | string;
};

/**
 * Batch financial summary (`GET /escrows/financial`).
 * `balance` is deposited − released (was `balanceProjected`).
 */
export type EscrowFinancial = {
  contractId: string;
  type: EscrowType;
  asset: string;
  platformFee: number | string;
  totalAmount: number | string;
  totalDeposited: number | string;
  totalReleased: number | string;
  pendingRelease: number | string;
  nextRelease: EscrowNextRelease | null;
  balance: number | string;
};

/**
 * Keyset page envelope used by list + events endpoints.
 */
export type KeysetPage<T> = {
  data: T[];
  hasMore: boolean;
  nextCursor: string | null;
};

/**
 * One entry from `GET /escrows/details`.
 */
export type EscrowDetailsItem = {
  escrow: EscrowSummary;
  deposits: EscrowDeposit[];
};

/**
 * `GET /escrows/:contractId` body.
 */
export type EscrowDetail = {
  escrow: EscrowSummary;
  events: EscrowEvent[];
  deposits: EscrowDeposit[];
};

/**
 * `GET /escrows/:contractId/milestones` body.
 */
export type EscrowMilestones = {
  contractId: string;
  type: EscrowType;
  milestones: SingleReleaseMilestone[] | MultiReleaseMilestone[];
};
