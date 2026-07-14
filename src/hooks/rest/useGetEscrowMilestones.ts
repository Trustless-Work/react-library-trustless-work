import { useEscrowRest } from "../../provider";

/**
 * Milestones for one escrow (`GET /escrows/:contractId/milestones`).
 */
export function useGetEscrowMilestones() {
  const rest = useEscrowRest();

  return {
    getEscrowMilestones: (contractId: string) =>
      rest.getEscrowMilestones(contractId),
  };
}
