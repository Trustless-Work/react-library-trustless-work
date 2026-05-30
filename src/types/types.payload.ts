import { EscrowType } from "./types";
import {
  DeployTrustline,
  MultiReleaseEscrow,
  MultiReleaseRoles,
  Role,
  Roles,
  SingleReleaseEscrow,
  Trustline,
} from "./types.entity";

// ----------------- Shared -----------------

/**
 * Address → amount distribution entry (v2 resolve / withdraw).
 */
export type Distribution = {
  address: string;
  amount: number;
};

// ----------------- Milestone payloads (deploy / manage) -----------------

/**
 * Single-release milestone at deploy or manage_milestones add.
 */
export type SingleReleaseMilestonePayload = {
  description: string;
  status?: string;
  approvalsTarget: number;
};

/**
 * Multi-release milestone at deploy or manage_milestones add.
 */
export type MultiReleaseMilestonePayload = SingleReleaseMilestonePayload & {
  amount: number;
  receiver: string;
};

// ----------------- Initialize Escrow -----------------

export type InitializeSingleReleaseEscrowPayload = Omit<
  SingleReleaseEscrow,
  | "type"
  | "contractId"
  | "contractBaseId"
  | "balance"
  | "dispute"
  | "released"
  | "transactionHash"
  | "receiverMemo"
  | "milestones"
  | "trustline"
> & {
  milestones: SingleReleaseMilestonePayload[];
  trustline: DeployTrustline;
};

export type InitializeMultiReleaseEscrowPayload = Omit<
  MultiReleaseEscrow,
  | "type"
  | "contractId"
  | "contractBaseId"
  | "balance"
  | "transactionHash"
  | "receiverMemo"
  | "milestones"
  | "trustline"
> & {
  milestones: MultiReleaseMilestonePayload[];
  trustline: DeployTrustline;
};

// ----------------- Update Escrow -----------------

/**
 * On-chain properties replacement for single-release v2 update.
 */
export type UpdateSingleReleaseEscrowProperties = {
  engagementId: string;
  title: string;
  description: string;
  amount: number;
  platformFee: number;
  roles: Roles;
  milestones: SingleReleaseMilestonePayload[];
  trustline: Trustline;
};

/**
 * On-chain properties replacement for multi-release v2 update.
 */
export type UpdateMultiReleaseEscrowProperties = Omit<
  UpdateSingleReleaseEscrowProperties,
  "amount" | "milestones" | "roles"
> & {
  roles: MultiReleaseRoles;
  milestones: MultiReleaseMilestonePayload[];
};

export type UpdateSingleReleaseEscrowPayload = {
  contractId: string;
  admin: string;
  escrow: UpdateSingleReleaseEscrowProperties;
};

export type UpdateMultiReleaseEscrowPayload = {
  contractId: string;
  admin: string;
  escrow: UpdateMultiReleaseEscrowProperties;
};

// ----------------- Batch milestone operations (v2) -----------------
//
// | Operation              | Single-release              | Multi-release                    |
// |------------------------|-----------------------------|----------------------------------|
// | change-milestone-status| updates[] (batch, ≤50)      | updates[] (batch, ≤50)           |
// | approve-milestones     | milestoneIndexes[]          | milestoneIndexes[]               |
// | release-funds          | whole escrow                | milestoneIndexes[] (batch)       |
// | dispute                | reason (whole escrow)       | dispute-milestones + indexes[]   |
// | resolve-dispute        | distributions[]             | milestoneIndexes[] + distributions |

/** One entry in a change-milestone-status batch (single & multi). */
export type MilestoneStatusUpdate = {
  index: number;
  newStatus: string;
  newEvidence?: string;
};

/** Batch change milestone status — same shape for single-release and multi-release. */
export type ChangeMilestoneStatusPayload = {
  contractId: string;
  serviceProvider: string;
  updates: MilestoneStatusUpdate[];
};

/** Alias emphasizing batch semantics (single & multi). */
export type ChangeMilestoneStatusBatchPayload = ChangeMilestoneStatusPayload;

// ----------------- Approve Milestones (batch) -----------------

export type ApproveMilestonesPayload = {
  contractId: string;
  approver: string;
  milestoneIndexes: number[];
};

/** Multi-release only — atomic approve + release per milestone index. */
export type ApproveAndReleaseMilestonesPayload = {
  contractId: string;
  signer: string;
  milestoneIndexes: number[];
};

// ----------------- Manage Milestones -----------------

export type SingleReleaseMilestoneDescriptionUpdate = {
  index: number;
  newDescription?: string;
};

export type MultiReleaseMilestoneDescriptionUpdate =
  SingleReleaseMilestoneDescriptionUpdate & {
    newAmount?: number;
  };

export type ManageSingleReleaseMilestonesPayload = {
  contractId: string;
  admin: string;
  newMilestones: SingleReleaseMilestonePayload[];
  milestoneUpdates: SingleReleaseMilestoneDescriptionUpdate[];
};

export type ManageMultiReleaseMilestonesPayload = {
  contractId: string;
  admin: string;
  newMilestones: MultiReleaseMilestonePayload[];
  milestoneUpdates: MultiReleaseMilestoneDescriptionUpdate[];
};

// ----------------- Start Dispute -----------------

export type SingleReleaseStartDisputePayload = {
  contractId: string;
  signer: string;
  reason: string;
};

/** Batch dispute milestones (multi-release only) → POST .../dispute-milestones */
export type MultiReleaseStartDisputePayload = SingleReleaseStartDisputePayload & {
  milestoneIndexes: number[];
};

/** Alias for multi-release batch dispute. */
export type DisputeMilestonesPayload = MultiReleaseStartDisputePayload;

// ----------------- Resolve Dispute -----------------

export type SingleReleaseResolveDisputePayload = {
  contractId: string;
  disputeResolver: string;
  distributions: Distribution[];
};

export type MultiReleaseResolveDisputePayload =
  SingleReleaseResolveDisputePayload & {
    milestoneIndexes: number[];
  };

// ----------------- Withdraw Remaining Funds -----------------

export type SingleReleaseWithdrawRemainingFundsPayload =
  SingleReleaseResolveDisputePayload;

/** Withdraw remaining balance (multi-release). No milestoneIndexes — escrow-level sweep. */
export type MultiReleaseWithdrawRemainingFundsPayload =
  SingleReleaseWithdrawRemainingFundsPayload;

// ----------------- Fund Escrow -----------------

export type FundEscrowPayload = {
  amount: number;
  contractId: string;
  signer: string;
};

// ----------------- Release Funds -----------------

export type SingleReleaseReleaseFundsPayload = {
  contractId: string;
  releaseSigner: string;
};

/** Batch release milestones (multi-release only) → POST .../release-funds */
export type MultiReleaseReleaseFundsPayload =
  SingleReleaseReleaseFundsPayload & {
    milestoneIndexes: number[];
  };

/** Alias for multi-release batch release. */
export type ReleaseMilestonesPayload = MultiReleaseReleaseFundsPayload;

// ----------------- Get Escrows From Indexer (v2 shape) -----------------

export type GetEscrowsFromIndexerParams = {
  page?: number;
  orderDirection?: "asc" | "desc";
  orderBy?: "createdAt" | "updatedAt" | "amount";
  startDate?: string;
  endDate?: string;
  maxAmount?: number;
  minAmount?: number;
  isActive?: boolean;
  title?: string;
  engagementId?: string;
  type?: EscrowType;
  validateOnChain?: boolean;
};

export type GetEscrowsFromIndexerBySignerParams =
  GetEscrowsFromIndexerParams & {
    signer: string;
  };

export type GetEscrowsFromIndexerByRoleParams = GetEscrowsFromIndexerParams & {
  role: Role;
  roleAddress: string;
};

export type GetEscrowFromIndexerByContractIdsParams = {
  contractIds: string[];
  validateOnChain?: boolean;
};

// ----------------- Get Balance -----------------

export type GetBalanceParams = {
  addresses: string[];
};
