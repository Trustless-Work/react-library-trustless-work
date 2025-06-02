import { Escrow, MultiReleaseMilestone } from "./types.entity";

/**
 * Documentation: https://docs.trustlesswork.com/trustless-work/developer-resources/quickstart/integration-demo-project/entities
 */

// ----------------- Initialize Escrow -----------------
/**
 * Base Initialize Escrow Payload
 */
type BaseInitializeEscrowPayload = Omit<Escrow, "contractId" | "balance">;

/**
 * Single Release Initialize Escrow Payload
 */
export type SingleReleaseInitializeEscrowPayload = BaseInitializeEscrowPayload;

/**
 * Multi Release Initialize Escrow Payload
 */
export type MultiReleaseInitializeEscrowPayload = Omit<
  BaseInitializeEscrowPayload,
  "amount" | "flags"
> & {
  /**
   * Objectives to be completed to define the escrow as completed
   */
  milestones: MultiReleaseMilestone[];
};

/**
 * Initialize Escrow Payload, this can be a single-release or multi-release
 */
export type InitializeEscrowPayload =
  | SingleReleaseInitializeEscrowPayload
  | MultiReleaseInitializeEscrowPayload;

// ----------------- Update Escrow -----------------
/**
 * Base Update Escrow Payload
 */
type BaseUpdateEscrowPayload = {
  /**
   * ID (address) that identifies the escrow contract
   */
  contractId: string;

  /**
   * Escrow data
   */
  escrow: Omit<Escrow, "contractId" | "signer" | "balance">;

  /**
   * Address of the user signing the contract transaction
   */
  signer: string;
};

/**
 * Single Release Update Escrow Payload
 */
export type SingleReleaseUpdateEscrowPayload = BaseUpdateEscrowPayload;

/**
 * Multi Release Update Escrow Payload
 */
export type MultiReleaseUpdateEscrowPayload = BaseUpdateEscrowPayload & {
  /**
   * Index of the milestone to be updated
   */
  milestoneIndex: string;
};

/**
 * Update Escrow Payload, this can be a single-release or multi-release
 */
export type UpdateEscrowPayload =
  | SingleReleaseUpdateEscrowPayload
  | MultiReleaseUpdateEscrowPayload;

// ----------------- Change Milestone Status -----------------
/**
 * Change Milestone Status Payload, this can be a single-release or multi-release
 */
export type ChangeMilestoneStatusPayload = {
  /**
   * ID (address) that identifies the escrow contract
   */
  contractId: string;

  /**
   * Index of the milestone to be updated
   */
  milestoneIndex: string;

  /**
   * New status of the milestone
   */
  newStatus: string;

  /**
   * New evidence of work performed by the service provider.
   */
  newEvidence?: string;

  /**
   * Address of the entity providing the service.
   */
  serviceProvider: string;
};

// ----------------- Approve Milestone -----------------
/**
 * Approve Milestone Payload, this can be a single-release or multi-release
 */
export type ApproveMilestonePayload = Omit<
  ChangeMilestoneStatusPayload,
  "serviceProvider" | "newStatus"
> & {
  /**
   * Address of the entity requiring the service.
   */
  approver: string;

  /**
   * New flag value of the milestone
   */
  newFlag: boolean;
};

// ----------------- Start Dispute -----------------
/**
 * Base Start Dispute Payload
 */
type BaseStartDisputePayload = {
  /**
   * ID (address) that identifies the escrow contract
   */
  contractId: string;

  /**
   * Address of the user signing the contract transaction
   */
  signer: string;
};

/**
 * Single Release Start Dispute Payload. This starts a dispute for the entire escrow.
 */
export type SingleReleaseStartDisputePayload = BaseStartDisputePayload;

/**
 * Multi Release Start Dispute Payload. This starts a dispute for a specific milestone.
 */
export type MultiReleaseStartDisputePayload = BaseStartDisputePayload & {
  /**
   * Index of the milestone to be disputed
   */
  milestoneIndex: string;
};

/**
 * Start Dispute Payload, this can be a single-release or multi-release
 */
export type StartDisputePayload =
  | SingleReleaseStartDisputePayload
  | MultiReleaseStartDisputePayload;

// ----------------- Resolve Dispute -----------------
/**
 * Base Resolve Dispute Payload
 */
type BaseResolveDisputePayload = {
  /**
   * ID (address) that identifies the escrow contract
   */
  contractId: string;

  /**
   * Address in charge of resolving disputes within the escrow.
   */
  disputeResolver: string;

  /**
   * Amount of funds to be returned to the approver based on the global amount.
   */
  approverFunds: string;

  /**
   * Amount of funds to be returned to the receiver based on the global amount.
   */
  receiverFunds: string;
};

/**
 * Resolve Dispute Payload
 */
export type SingleReleaseResolveDisputePayload = BaseResolveDisputePayload;

/**
 * Multi Release Resolve Dispute Payload
 */
export type MultiReleaseResolveDisputePayload = BaseResolveDisputePayload & {
  /**
   * Index of the milestone to be resolved
   */
  milestoneIndex: string;
};

/**
 * Resolve Dispute Payload, this can be a single-release or multi-release
 */
export type ResolveDisputePayload =
  | SingleReleaseResolveDisputePayload
  | MultiReleaseResolveDisputePayload;

// ----------------- Fund Escrow -----------------
/**
 * Fund Escrow Payload, this can be a single-release or multi-release
 */
export type FundEscrowPayload = {
  /**
   * Amount to be transferred upon completion of escrow milestones
   */
  amount: string;

  /**
   * ID (address) that identifies the escrow contract
   */
  contractId: string;

  /**
   * Address of the user signing the contract transaction
   */
  signer: string;
};

// ----------------- Get Escrow -----------------
/**
 * Get Escrow Params
 */
export type GetEscrowParams = {
  /**
   * ID (address) that identifies the escrow contract
   */
  contractId: string;

  /**
   * Address of the user signing the contract transaction
   */
  signer: string;
};

// ----------------- Release Funds -----------------
/**
 * Base Release Funds Payload
 */
type BaseReleaseFundsPayload = {
  /**
   * ID (address) that identifies the escrow contract
   */
  contractId: string;

  /**
   * Address of the user in charge of releasing the escrow funds to the service provider.
   */
  releaseSigner: string;

  /**
   * Address of the user signing the contract transaction
   */
  signer: string;
};

/**
 * Single Release Release Funds Payload
 */
export type SingleReleaseReleaseFundsPayload = BaseReleaseFundsPayload;

/**
 * Multi Release Release Funds Payload
 */
export type MultiReleaseReleaseFundsPayload = BaseReleaseFundsPayload & {
  /**
   * Index of the milestone to be released
   */
  milestoneIndex: string;
};

/**
 * Release Funds Payload, this can be a single-release or multi-release
 */
export type ReleaseFundsPayload =
  | SingleReleaseReleaseFundsPayload
  | MultiReleaseReleaseFundsPayload;

// ----------------- Get Balance -----------------
/**
 * Get Balance Params
 */
export type GetBalanceParams = {
  /**
   * Address of the user signing the contract transaction
   */
  signer: string;

  /**
   * Addresses of the escrows to get the balance
   */
  addresses: string[];
};
