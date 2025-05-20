import { Status } from "./types";
import { EscrowPayload } from "./types.payload";

/**
 * Escrow's Response like fund, release, change, etc ...
 */
export type EscrowRequestResponse = {
  status: Status;
  unsignedTransaction?: string;
};

/**
 * Send Transaction Response
 */
export type SendTransactionResponse = {
  status: Status;
  message: string;
};

/**
 * Initialize Escrow Response
 */
export type InitializeEscrowResponse = EscrowRequestResponse & {
  contractId: string;
  escrow: EscrowPayload;
  message: string;
};

/**
 * Update Escrow Response
 */
export type UpdateEscrowResponse = InitializeEscrowResponse;

/**
 * Get Balances Response
 */
export type GetEscrowBalancesResponse = {
  address: string;
  balance: number;
};
