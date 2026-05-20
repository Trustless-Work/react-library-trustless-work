import { useTrustlessWorkClient } from "../provider";
import {
  ManageMultiReleaseMilestonesPayload,
  ManageSingleReleaseMilestonesPayload,
} from "../types/types.payload";
import { EscrowType } from "../types/types";

/**
 * Use the useManageMilestones hook to add or update milestones (v2).
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
