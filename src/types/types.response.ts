import { Status } from "./types";
import { Escrow } from "./types.entity";

/**
 * Escrow's Response like fund, release, change, etc ...
 */
export type EscrowRequestResponse = {
  /**
   * Status of the request
   */
  status: Status;

  /**
   * Unsigned transaction
   */
  unsignedTransaction?: string;
};

/**
 * Send Transaction Response
 */
export type SendTransactionResponse = {
  /**
   * Status of the request
   */
  status: Status;

  /**
   * Message of the request
   */
  message: string;
};

/**
 * Initialize Escrow Response
 */
export type InitializeEscrowResponse = EscrowRequestResponse & {
  /**
   * ID (address) that identifies the escrow contract
   */
  contractId: string;

  /**
   * Escrow data
   */
  escrow: Escrow;

  /**
   * Message of the request
   */
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
  /**
   * Address of the escrow
   */
  address: string;

  /**
   * Balance of the escrow
   */
  balance: number;
};
