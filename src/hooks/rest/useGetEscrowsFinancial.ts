import { useEscrowRest } from "../../provider";
import type { BatchContractIdsParams } from "../../types/types.payload";

/**
 * Batch financial summaries (`GET /escrows/financial`).
 */
export function useGetEscrowsFinancial() {
  const rest = useEscrowRest();

  return {
    getEscrowsFinancial: (params: BatchContractIdsParams | string[]) =>
      rest.getEscrowsFinancial(params),
  };
}
