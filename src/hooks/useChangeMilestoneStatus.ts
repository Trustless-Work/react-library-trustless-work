import { useTrustlessWorkClient } from "../provider";
import { ChangeMilestoneStatusPayload, EscrowType } from "../types";

/**
 * Batch change milestone status (v2). Works for single-release and multi-release.
 * Payload: `{ contractId, serviceProvider, updates: [{ milestoneIndex, newStatus, newEvidence? }] }`.
 */
export function useChangeMilestoneStatus() {
  const client = useTrustlessWorkClient();

  return {
    changeMilestoneStatus: (
      payload: ChangeMilestoneStatusPayload,
      type: EscrowType
    ) => client.changeMilestoneStatus(payload, type),
  };
}
