import { EscrowType, SingleReleaseEscrowStatus } from "./types";
import { MultiReleaseEscrow, Role, SingleReleaseEscrow } from "./types.entity";

/**
 * Documentation: https://docs.trustlesswork.com/trustless-work/developer-resources/quickstart/integration-demo-project/entities
 */

// ----------------- Milestone Payloads -----------------
/**
 * Single Release Milestone Payload
 */
export type SingleReleaseMilestonePayload = {
  /**
   * Text describing the function of the milestone
   */
  description: string;
};

/**
 * Multi Release Milestone Payload
 */
export type MultiReleaseMilestonePayload = {
  /**
   * Text describing the function of the milestone
   */
  description: string;
  /**
   * Amount to be transferred upon completion of this milestone
   */
  amount: number;
};

// ----------------- Initialize Escrow -----------------
/**
 * Single Release Initialize Escrow Payload
 */
export type InitializeSingleReleaseEscrowPayload = Omit<
  SingleReleaseEscrow,
  "contractId" | "balance" | "milestones"
> & {
  /**
   * Objectives to be completed to define the escrow as completed
   */
  milestones: SingleReleaseMilestonePayload[];
};

/**
 * Multi Release Initialize Escrow Payload
 */
export type InitializeMultiReleaseEscrowPayload = Omit<
  MultiReleaseEscrow,
  "contractId" | "balance" | "milestones"
> & {
  /**
   * Objectives to be completed to define the escrow as completed
   */
  milestones: MultiReleaseMilestonePayload[];
};

// ----------------- Update Escrow -----------------
/**
 * Single Release Update Escrow Payload
 */
export type UpdateSingleReleaseEscrowPayload = {
  /**
   * ID (address) that identifies the escrow contract
   */
  contractId: string;

  /**
   * Escrow data
   */
  escrow: Omit<SingleReleaseEscrow, "contractId" | "signer" | "balance"> & {
    /**
     * Whether the escrow is active. This comes from DB, not from the blockchain.
     */
    isActive?: boolean;
  };

  /**
   * Address of the user signing the contract transaction
   */
  signer: string;
};

/**
 * Multi Release Update Escrow Payload
 */
export type UpdateMultiReleaseEscrowPayload = {
  /**
   * ID (address) that identifies the escrow contract
   */
  contractId: string;

  /**
   * Escrow data
   */
  escrow: Omit<MultiReleaseEscrow, "contractId" | "signer" | "balance"> & {
    /**
     * Whether the escrow is active. This comes from DB, not from the blockchain.
     */
    isActive?: boolean;
  };

  /**
   * Address of the user signing the contract transaction
   */
  signer: string;
};

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
};

// ----------------- Start Dispute -----------------
/**
 * Single Release Start Dispute Payload. This starts a dispute for the entire escrow.
 */
export type SingleReleaseStartDisputePayload = {
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
 * Multi Release Start Dispute Payload. This starts a dispute for a specific milestone.
 */
export type MultiReleaseStartDisputePayload =
  SingleReleaseStartDisputePayload & {
    /**
     * Index of the milestone to be disputed
     */
    milestoneIndex: string;
  };

// ----------------- Resolve Dispute -----------------
/**
 * Resolve Dispute Payload
 */
export type SingleReleaseResolveDisputePayload = {
  /**
   * ID (address) that identifies the escrow contract
   */
  contractId: string;

  /**
   * Address in charge of resolving disputes within the escrow.
   */
  disputeResolver: string;

  /**
   * Distributions of the escrow amount to the receivers.
   */
  distributions: [
    {
      /**
       * Address of the receiver
       */
      address: string;
      /**
       * Amount to be transferred to the receiver. All the amount must be equal to the total amount of the escrow.
       */
      amount: number;
    },
  ];
};

/**
 * Multi Release Resolve Dispute Payload
 */
export type MultiReleaseResolveDisputePayload =
  SingleReleaseResolveDisputePayload & {
    /**
     * Index of the milestone to be resolved
     */
    milestoneIndex: string;
  };

// ----------------- Withdraw Remaining Funds -----------------
/**
 * Withdraw remaining funds
 */
export type WithdrawRemainingFundsPayload = SingleReleaseResolveDisputePayload;

// ----------------- Fund Escrow -----------------
/**
 * Fund Escrow Payload, this can be a single-release or multi-release
 */
export type FundEscrowPayload = {
  /**
   * Amount to be transferred upon completion of escrow milestones
   */
  amount: number;

  /**
   * ID (address) that identifies the escrow contract
   */
  contractId: string;

  /**
   * Address of the user signing the contract transaction
   */
  signer: string;
};

// ----------------- Get Escrows From Indexer -----------------
/**
 * Get Escrows From Indexer Params
 */
export type GetEscrowsFromIndexerParams = {
  /**
   * Page number. Pagination
   */
  page?: number;

  /**
   * Sorting direction. Sorting
   */
  orderDirection?: "asc" | "desc";

  /**
   * Order by property. Sorting
   */
  orderBy?: "createdAt" | "updatedAt" | "amount";

  /**
   * Created at = start date. Filtering
   */
  startDate?: string;

  /**
   * Created at = end date. Filtering
   */
  endDate?: string;

  /**
   * Max amount. Filtering
   */
  maxAmount?: number;

  /**
   * Min amount. Filtering
   */
  minAmount?: number;

  /**
   * Is active. Filtering
   */
  isActive?: boolean;

  /**
   * Escrow that you are looking for. Filtering
   */
  title?: string;

  /**
   * Engagement ID. Filtering
   */
  engagementId?: string;

  /**
   * Status of the single-release escrow. Filtering
   */
  status?: SingleReleaseEscrowStatus;

  /**
   * Type of the escrow. Filtering
   */
  type?: EscrowType;

  /**
   * If true, the escrows will be validated on the blockchain to ensure data consistency.
   * This performs an additional verification step to confirm that the escrow data
   * returned from the indexer matches the current state on the blockchain.
   * Use this when you need to ensure the most up-to-date and accurate escrow information.
   * If you active this param, your request will take longer to complete.
   */
  validateOnChain?: boolean;
};

export type GetEscrowsFromIndexerBySignerParams =
  GetEscrowsFromIndexerParams & {
    /**
     * Address of the user signing the contract transaction.
     */
    signer: string;
  };

export type GetEscrowsFromIndexerByRoleParams = GetEscrowsFromIndexerParams & {
  /**
   * Role of the user. Required
   */
  role: Role;

  /**
   * Address of the owner of the escrows. If you want to get all escrows from a specific role, you can use this parameter. But with this parameter, you can't use the signer parameter.
   */
  roleAddress: string;
};

export type GetEscrowFromIndexerByContractIdsParams = {
  /**
   * IDs (addresses) that identifies the escrow contracts.
   */
  contractIds: string[];

  /**
   * Address of the user signing the contract transaction.
   */
  signer: string;

  /**
   * If true, the escrows will be validated on the blockchain to ensure data consistency.
   * This performs an additional verification step to confirm that the escrow data
   * returned from the indexer matches the current state on the blockchain.
   * Use this when you need to ensure the most up-to-date and accurate escrow information.
   * If you active this param, your request will take longer to complete.
   */
  validateOnChain?: boolean;
};

// ----------------- Release Funds -----------------
/**
 * Single Release Release Funds Payload
 */
export type SingleReleaseReleaseFundsPayload = {
  /**
   * ID (address) that identifies the escrow contract
   */
  contractId: string;

  /**
   * Address of the user in charge of releasing the escrow funds to the service provider.
   */
  releaseSigner: string;
};

/**
 * Multi Release Release Funds Payload
 */
export type MultiReleaseReleaseFundsPayload =
  SingleReleaseReleaseFundsPayload & {
    /**
     * Index of the milestone to be released
     */
    milestoneIndex: string;
  };

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

// ----------------- Update From Transaction Hash -----------------
/**
 * Payload for updating escrow data from a transaction hash.
 */
export type UpdateFromTxHashPayload = {
  /**
   * Transaction hash to be used for the update.
   */
  txHash: string;
};
