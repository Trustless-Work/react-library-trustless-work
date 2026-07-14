import { useEscrowRest } from "../../provider";
import type { ListEscrowsParams } from "../../types/types.payload";

/**
 * List escrows (`GET /escrows`) with keyset pagination and filters.
 */
export function useListEscrows() {
  const rest = useEscrowRest();

  return {
    listEscrows: (params?: ListEscrowsParams) => rest.listEscrows(params),
  };
}
