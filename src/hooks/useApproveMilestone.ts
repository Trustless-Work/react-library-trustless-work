import { useTrustlessWorkClient } from "../provider";
import { ApproveMilestonePayload, EscrowType } from "../types";

/**
 * Use the useApproveMilestone hook to change the approved flag of a milestone.
 * @returns A function to change the approved flag of a milestone.
 */
export function useApproveMilestone() {
  const client = useTrustlessWorkClient();

  return {
    approveMilestone: (payload: ApproveMilestonePayload, type: EscrowType) =>
      client.approveMilestone(payload, type),
  };
}
