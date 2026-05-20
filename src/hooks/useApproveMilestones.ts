import { useTrustlessWorkClient } from "../provider";
import { ApproveMilestonesPayload, EscrowType } from "../types";

/**
 * Use the useApproveMilestones hook to approve one or more milestones (v2 batch).
 */
export function useApproveMilestones() {
  const client = useTrustlessWorkClient();

  return {
    approveMilestones: (payload: ApproveMilestonesPayload, type: EscrowType) =>
      client.approveMilestones(payload, type),
  };
}
