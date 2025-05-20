import { Escrow } from "./types.entity";

/**
 * Documentation: https://docs.trustlesswork.com/trustless-work/developer-resources/quickstart/integration-demo-project/entities
 */

/**
 * Escrow Payload
 */
export type EscrowPayload = Escrow;

/**
 * Initialize Escrow Payload
 */
export type InitializeEscrowPayload = Omit<EscrowPayload, "contractId"> & {};

/**
 * Change Milestone Status Payload
 */
export type ChangeMilestoneStatusPayload = {
  contractId?: string;
  milestoneIndex: string;
  newStatus: string;
  evidence?: string;
  serviceProvider?: string;
};

/**
 * Change Milestone Flag Payload
 */
export type ChangeMilestoneApprovedFlagPayload = Omit<
  ChangeMilestoneStatusPayload,
  "serviceProvider" | "newStatus"
> & {
  approver?: string;
  newFlag: boolean;
};

/**
 * Start Dispute Payload
 */
export type StartDisputePayload = {
  contractId: string;
  signer: string;
};

/**
 * Resolve Dispute Payload
 */
export type ResolveDisputePayload = {
  contractId: string;
  disputeResolver?: string;
  approverFunds: string;
  receiverFunds: string;
};

/**
 * Fund Escrow Payload
 */
export type FundEscrowPayload = {
  amount: string;
  contractId: string;
  signer: string;
};

/**
 * Get Escrow Payload
 */
export type GetEscrowPayload = {
  contractId: string;
  signer: string;
};

/**
 * Release Funds Payload
 */
export type ReleaseFundsPayload = {
  contractId: string;
  serviceProvider?: string;
  releaseSigner?: string;
  signer: string;
};

/**
 * Update Escrow Payload
 */
export type UpdateEscrowPayload = {
  contractId: string;
  escrow: EscrowPayload;
  signer: string;
};

/**
 * Get Balance Params
 */
export type GetBalanceParams = {
  signer: string;
  addresses: string[];
};

/**
 * Send Transaction Payload
 */
export interface SendTransactionPayload {
  signedXdr: string;
  returnEscrowDataIsRequired: boolean;
}
