import { Date, EscrowType } from "./types";
import { MultiReleaseEscrow, SingleReleaseEscrow } from "./types.entity";

/**
 * Build-step response for all escrow v2 operations (unsigned XDR).
 */
export type EscrowRequestResponse = {
  unsignedXdr: string;
  txHash: string;
};

/**
 * Stable machine-readable codes from POST /stellar/submit-transaction.
 */
export type SubmitTransactionCode =
  | "STELLAR_TX_SUBMITTED"
  | "STELLAR_TX_SUBMITTED_INDEXER_LAGGING";

/**
 * Submit-step response after signing and posting a transaction.
 */
export type SendTransactionResponse = {
  txHash: string;
  ledger: number;
  contractId?: string;
  escrow?: SingleReleaseEscrow | MultiReleaseEscrow;
  code?: SubmitTransactionCode;
  message?: string;
};

/**
 * Get Balances Response (helper — unchanged)
 */
export type GetEscrowBalancesResponse = {
  address: string;
  balance: number;
};

/**
 * Legacy v1-flavored roles returned by indexer helpers (unchanged endpoints).
 */
export type IndexerRoles = {
  approver: string;
  serviceProvider: string;
  platformAddress: string;
  releaseSigner: string;
  disputeResolver: string;
  receiver: string;
};

/**
 * Legacy flags returned by indexer helpers.
 */
export type IndexerFlags = {
  disputed?: boolean;
  released?: boolean;
  resolved?: boolean;
  approved?: boolean;
};

/**
 * Legacy v1-flavored milestone in indexer responses.
 */
export type IndexerSingleReleaseMilestone = {
  description: string;
  status?: string;
  evidence?: string;
  approved?: boolean;
};

export type IndexerMultiReleaseMilestone = IndexerSingleReleaseMilestone & {
  amount: number;
  receiver: string;
  flags?: IndexerFlags;
};

/**
 * Get Escrows From Indexer Response (helper — v1-flavored shape)
 */
export type GetEscrowsFromIndexerResponse = {
  signer?: string;
  contractId?: string;
  engagementId: string;
  title: string;
  roles: IndexerRoles | Omit<IndexerRoles, "receiver">;
  description: string;
  amount: number;
  platformFee: number;
  balance?: number;
  milestones: IndexerSingleReleaseMilestone[] | IndexerMultiReleaseMilestone[];
  flags?: IndexerFlags;
  trustline: {
    symbol: string;
    address: string;
    contractId?: string;
  };
  isActive?: boolean;
  approverFunds?: string;
  receiverFunds?: string;
  user: string;
  createdAt: Date;
  updatedAt: Date;
  type: EscrowType;
};
