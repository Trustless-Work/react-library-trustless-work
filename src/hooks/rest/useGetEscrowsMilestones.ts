import { useEscrowRest } from "../../provider";
import type { BatchContractIdsParams } from "../../types/types.payload";

/**
 * Batch milestones (`GET /escrows/milestones`).
 */
export function useGetEscrowsMilestones() {
  const rest = useEscrowRest();

  return {
    getEscrowsMilestones: (params: BatchContractIdsParams | string[]) =>
      rest.getEscrowsMilestones(params),
  };
}
