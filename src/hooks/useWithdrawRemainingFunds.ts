import { useTrustlessWorkClient } from "../provider";
import { WithdrawRemainingFundsPayload } from "../types/types.payload";

/**
 * Multi-release only. Withdraw remaining escrow balance after disputes.
 * Payload: `{ contractId, disputeResolver, distributions[] }`.
 */
export function useWithdrawRemainingFunds() {
  const client = useTrustlessWorkClient();

  return {
    withdrawRemainingFunds: (payload: WithdrawRemainingFundsPayload) =>
      client.withdrawRemainingFunds(payload),
  };
}
