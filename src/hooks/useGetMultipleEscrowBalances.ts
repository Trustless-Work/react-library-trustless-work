import { useTrustlessWorkClient } from "../provider";
import { GetBalanceParams } from "../types";

/**
 * Use the useGetMultipleEscrowBalances hook to get multiple escrow balances.
 * @returns A function to get multiple escrow balances.
 */
export function useGetMultipleEscrowBalances() {
  const client = useTrustlessWorkClient();

  return {
    getMultipleBalances: (payload: GetBalanceParams) =>
      client.getMultipleEscrowBalances(payload),
  };
}
