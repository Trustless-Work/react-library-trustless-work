import { useEscrowRest } from "../../provider";
import { ApproveMilestonesPayload, EscrowType } from "../../types";

/**
 * Use the useApproveMilestones hook to approve one or more milestones (v2 batch).
 */
export function useApproveMilestones() {
  const rest = useEscrowRest();

  return {
    approveMilestones: (payload: ApproveMilestonesPayload, type: EscrowType) =>
      rest.approveMilestones(payload, type),
  };
}
