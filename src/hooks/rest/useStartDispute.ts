import { useEscrowRest } from "../../provider";
import {
  MultiReleaseStartDisputePayload,
  SingleReleaseStartDisputePayload,
} from "../../types/types.payload";
import { EscrowType } from "../../types/types";

/**
 * Start a dispute (v2). Single-release: whole escrow + `reason`.
 * Multi-release: batch dispute milestones (`milestoneIndexes[]` + `reason`).
 */
export function useStartDispute() {
  const rest = useEscrowRest();

  return {
    startDispute: (
      payload:
        | SingleReleaseStartDisputePayload
        | MultiReleaseStartDisputePayload,
      type: EscrowType
    ) => rest.startDispute(payload, type),

    /** Multi-release only — batch dispute milestones. */
    disputeMilestones: (payload: MultiReleaseStartDisputePayload) =>
      rest.disputeMilestones(payload),
  };
}
