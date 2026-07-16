import { useEscrowRest } from "../../provider";
import type { AttributionHeaders } from "../../types/types.payload";
import type {
  DeployMultiReleaseEscrowPayload,
  DeploySingleReleaseEscrowPayload,
} from "../../types/types.payload";
import type { EscrowType } from "../../types/types";

/**
 * Build an unsigned deploy transaction for a new v2 escrow.
 */
export function useDeployEscrow() {
  const rest = useEscrowRest();

  return {
    deployEscrow: (
      payload:
        | DeploySingleReleaseEscrowPayload
        | DeployMultiReleaseEscrowPayload,
      type: EscrowType,
      attribution?: AttributionHeaders,
    ) => rest.deployEscrow(payload, type, attribution),
  };
}
