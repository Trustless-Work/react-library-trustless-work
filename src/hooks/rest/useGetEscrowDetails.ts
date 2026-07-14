import { useEscrowRest } from "../../provider";
import type { BatchContractIdsParams } from "../../types/types.payload";

/**
 * Batch escrow details (`GET /escrows/details`).
 */
export function useGetEscrowDetails() {
  const rest = useEscrowRest();

  return {
    getEscrowDetails: (params: BatchContractIdsParams | string[]) =>
      rest.getEscrowDetails(params),
  };
}
