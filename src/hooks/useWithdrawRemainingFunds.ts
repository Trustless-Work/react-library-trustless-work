import { useTrustlessWorkClient } from "../provider";
import { WithdrawRemainingFundsPayload } from "../types/types.payload";

/**
 * Use the useWithdrawRemainingFunds hook to withdraw remaining funds.
 * @returns A function to withdraw remaining funds.
 */
export function useWithdrawRemainingFunds() {
  const client = useTrustlessWorkClient();

  return {
    withdrawRemainingFunds: (payload: WithdrawRemainingFundsPayload) =>
      client.withdrawRemainingFunds(payload),
  };
}
