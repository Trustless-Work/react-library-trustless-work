import { Date } from "./types";
import { MultiReleaseEscrow, SingleReleaseEscrow } from "./types.entity";

/**
 * Build-step response for all escrow v2 operations (unsigned XDR).
 */
export type EscrowRequestResponse = {
  unsignedXdr: string;
  txHash: string;
};

/**
 * Stable machine-readable codes from POST /stellar/send-transaction.
 */
export type SendTransactionCode =
  | "STELLAR_TX_SUBMITTED"
  | "STELLAR_TX_SUBMITTED_INDEXER_LAGGING";

/**
 * @deprecated Use `SendTransactionCode` instead.
 */
export type SubmitTransactionCode = SendTransactionCode;

/**
 * Submit-step response after signing and posting a transaction.
 */
export type SendTransactionResponse = {
  txHash: string;
  ledger: number;
  contractId?: string;
  escrow?: SingleReleaseEscrow | MultiReleaseEscrow;
  code?: SendTransactionCode;
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
 * Indexer metadata appended to v2 escrow records from helper GET endpoints.
 */
type IndexerEscrowMetadata = {
  signer?: string;
  isActive?: boolean;
  approverFunds?: string;
  receiverFunds?: string;
  user: string;
  createdAt: Date;
  updatedAt: Date;
};

/**
 * Get Escrow Response (helper — v2 escrow shape + metadata).
 */
export type GetEscrowResponse = IndexerEscrowMetadata &
  (SingleReleaseEscrow | MultiReleaseEscrow);
