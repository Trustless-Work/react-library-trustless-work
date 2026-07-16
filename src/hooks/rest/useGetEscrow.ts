import { useEscrowRest } from "../../provider";

/**
 * Get a single escrow detail (`GET /escrows/:contractId`).
 */
export function useGetEscrow() {
  const rest = useEscrowRest();

  return {
    getEscrow: (contractId: string) => rest.getEscrow(contractId),
  };
}
