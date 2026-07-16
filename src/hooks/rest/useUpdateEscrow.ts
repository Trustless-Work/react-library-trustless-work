import { useEscrowRest } from "../../provider";
import {
  UpdateMultiReleaseEscrowPayload,
  UpdateSingleReleaseEscrowPayload,
} from "../../types/types.payload";
import { EscrowType } from "../../types/types";

/**
 * Update escrow on-chain properties (v2). Payload: `{ contractId, admin, escrow }`.
 */
export function useUpdateEscrow() {
  const rest = useEscrowRest();

  return {
    updateEscrow: (
      payload:
        | UpdateSingleReleaseEscrowPayload
        | UpdateMultiReleaseEscrowPayload,
      type: EscrowType
    ) => rest.updateEscrow(payload, type),
  };
}
