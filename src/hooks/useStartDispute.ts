import { useTrustlessWorkClient } from "../provider";
import {
  MultiReleaseStartDisputePayload,
  SingleReleaseStartDisputePayload,
} from "../types/types.payload";
import { EscrowType } from "../types/types";

/**
 * Start a dispute (v2). Single-release: whole escrow + `reason`.
 * Multi-release: batch dispute milestones (`milestoneIndexes[]` + `reason`).
 */
export function useStartDispute() {
  const client = useTrustlessWorkClient();

  return {
    startDispute: (
      payload:
        | SingleReleaseStartDisputePayload
        | MultiReleaseStartDisputePayload,
      type: EscrowType
    ) => client.startDispute(payload, type),

    /** Multi-release only — batch dispute milestones. */
    disputeMilestones: (payload: MultiReleaseStartDisputePayload) =>
      client.disputeMilestones(payload),
  };
}
