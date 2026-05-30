import { useTrustlessWorkClient } from "../provider";
import {
  UpdateMultiReleaseEscrowPayload,
  UpdateSingleReleaseEscrowPayload,
} from "../types/types.payload";
import { EscrowType } from "../types/types";

/**
 * Update escrow on-chain properties (v2). Payload: `{ contractId, admin, escrow }`.
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
