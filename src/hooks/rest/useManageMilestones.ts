import { useEscrowRest } from "../../provider";
import {
  ManageMultiReleaseMilestonesPayload,
  ManageSingleReleaseMilestonesPayload,
} from "../../types/types.payload";
import { EscrowType } from "../../types/types";

/**
 * Add or update milestones (v2).
 * Payload: `{ contractId, admin, newMilestones[], milestoneUpdates: [{ index, ... }] }`.
 */
export function useManageMilestones() {
  const rest = useEscrowRest();

  return {
    manageMilestones: (
      payload:
        | ManageSingleReleaseMilestonesPayload
        | ManageMultiReleaseMilestonesPayload,
      type: EscrowType
    ) => rest.manageMilestones(payload, type),
  };
}
