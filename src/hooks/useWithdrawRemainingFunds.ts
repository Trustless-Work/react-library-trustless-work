import { useTrustlessWorkClient } from "../provider";
import {
  MultiReleaseWithdrawRemainingFundsPayload,
  SingleReleaseWithdrawRemainingFundsPayload,
} from "../types/types.payload";
import { EscrowType } from "../types/types";

/**
 * Use the useWithdrawRemainingFunds hook to withdraw remaining funds (v2).
 */
export function useWithdrawRemainingFunds() {
  const client = useTrustlessWorkClient();

  return {
    withdrawRemainingFunds: (
      payload:
        | SingleReleaseWithdrawRemainingFundsPayload
        | MultiReleaseWithdrawRemainingFundsPayload,
      type: EscrowType
    ) => client.withdrawRemainingFunds(payload, type),
  };
}
