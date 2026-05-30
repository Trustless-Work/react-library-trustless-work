import { useTrustlessWorkClient } from "../provider";
import { ApproveAndReleaseMilestonesPayload } from "../types";

/**
 * Multi-release only. Atomic approve + release for the given milestone indexes.
 * Payload: `{ contractId, signer, milestoneIndexes }` — `signer` must be in both
 * `roles.approvers` and `roles.releaseSigners`.
 */
export function useApproveAndReleaseMilestones() {
  const client = useTrustlessWorkClient();

  return {
    approveAndReleaseMilestones: (payload: ApproveAndReleaseMilestonesPayload) =>
      client.approveAndReleaseMilestones(payload),
  };
}
