import { useEscrowRest } from "../../provider";
import { ApproveAndReleaseMilestonesPayload } from "../../types";

/**
 * Multi-release only. Atomic approve + release for the given milestone indexes.
 * Payload: `{ contractId, signer, milestoneIndexes }` — `signer` must be in both
 * `roles.approvers` and `roles.releaseSigners`.
 */
export function useApproveAndReleaseMilestones() {
  const rest = useEscrowRest();

  return {
    approveAndReleaseMilestones: (payload: ApproveAndReleaseMilestonesPayload) =>
      rest.approveAndReleaseMilestones(payload),
  };
}
