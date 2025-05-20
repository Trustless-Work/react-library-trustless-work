import { Status } from "./types";
import { Escrow } from "./types.entity";
import { EscrowPayload } from "./types.payload";

// Escrow's Response like fund, release, change, etc ...
export type EscrowRequestResponse = {
  status: Status;
  unsignedTransaction?: string;
};

// Send Transaction Response
export type SendTransactionResponse = {
  status: Status;
  message: string;
  contractId: string;
  escrow: Escrow;
};

// Initialize Escrow Response
export type InitializeEscrowResponse = {
  contractId: string;
  escrow: EscrowPayload;
  message: string;
  status: Status;
};

// Update Escrow Response
export type UpdateEscrowResponse = InitializeEscrowResponse;
