import { useTrustlessWorkClient } from "../provider";
import { ChangeMilestoneStatusPayload, EscrowType } from "../types";

/**
 * Use the useChangeMilestoneStatus hook to change the status of a milestone.
 * @returns A function to change the status of a milestone.
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
