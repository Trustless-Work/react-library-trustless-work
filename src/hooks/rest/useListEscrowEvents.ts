import { useEscrowRest } from "../../provider";
import type { ListEscrowEventsParams } from "../../types/types.payload";

/**
 * Paginated escrow event timeline (`GET /escrows/:contractId/events`).
 */
export function useListEscrowEvents() {
  const rest = useEscrowRest();

  return {
    listEscrowEvents: (
      contractId: string,
      params?: ListEscrowEventsParams,
    ) => rest.listEscrowEvents(contractId, params),
  };
}
