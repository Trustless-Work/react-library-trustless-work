import { useTrustlessWorkClient } from "../provider";
import { EscrowType, GetBalanceParams } from "../types";

/**
 * Use the useGetMultipleEscrowBalances hook to get multiple escrow balances.
 * @returns A function to get multiple escrow balances.
 */
export function useGetMultipleEscrowBalances() {
  const client = useTrustlessWorkClient();

  return {
    getMultipleBalances: (payload: GetBalanceParams, type: EscrowType) =>
      client.getMultipleEscrowBalances(payload, type),
  };
}
