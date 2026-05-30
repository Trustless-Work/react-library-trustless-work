import { useTrustlessWorkClient } from "../provider";
import {
  ManageMultiReleaseMilestonesPayload,
  ManageSingleReleaseMilestonesPayload,
} from "../types/types.payload";
import { EscrowType } from "../types/types";

/**
 * Add or update milestones (v2).
 * Payload: `{ contractId, admin, newMilestones[], milestoneUpdates: [{ index, ... }] }`.
 */
export function useManageMilestones() {
  const client = useTrustlessWorkClient();

  return {
    manageMilestones: (
      payload:
        | ManageSingleReleaseMilestonesPayload
        | ManageMultiReleaseMilestonesPayload,
      type: EscrowType
    ) => client.manageMilestones(payload, type),
  };
}
