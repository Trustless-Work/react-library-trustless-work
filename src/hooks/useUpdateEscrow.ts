import { useTrustlessWorkClient } from "../provider";
import {
  UpdateMultiReleaseEscrowPayload,
  UpdateSingleReleaseEscrowPayload,
} from "../types/types.payload";
import { EscrowType } from "../types/types";

/**
 * Use the useUpdateEscrow hook to update an escrow.
 * @returns A function to update an escrow.
 */
export function useUpdateEscrow() {
  const client = useTrustlessWorkClient();

  return {
    updateEscrow: (
      payload:
        | UpdateSingleReleaseEscrowPayload
        | UpdateMultiReleaseEscrowPayload,
      type: EscrowType
    ) => client.updateEscrow(payload, type),
  };
}
