import { useTrustlessWorkClient } from "../provider";
import {
  InitializeSingleReleaseEscrowPayload,
  InitializeMultiReleaseEscrowPayload,
} from "../types/types.payload";
import { EscrowType } from "../types/types";

/**
 * Use the useInitializeEscrow hook to initialize an escrow.
 * @returns A function to initialize an escrow.
 */
export function useInitializeEscrow() {
  const client = useTrustlessWorkClient();

  return {
    deployEscrow: (
      payload:
        | InitializeSingleReleaseEscrowPayload
        | InitializeMultiReleaseEscrowPayload,
      type: EscrowType
    ) => client.initializeEscrow(payload, type),
  };
}
