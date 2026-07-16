import { useEscrowRest } from "../../provider";
import {
  MultiReleaseWithdrawRemainingFundsPayload,
  SingleReleaseWithdrawRemainingFundsPayload,
} from "../../types/types.payload";
import { EscrowType } from "../../types/types";

/**
 * Use the useWithdrawRemainingFunds hook to withdraw remaining funds (v2).
 */
export function useWithdrawRemainingFunds() {
  const rest = useEscrowRest();

  return {
    withdrawRemainingFunds: (
      payload:
        | SingleReleaseWithdrawRemainingFundsPayload
        | MultiReleaseWithdrawRemainingFundsPayload,
      type: EscrowType
    ) => rest.withdrawRemainingFunds(payload, type),
  };
}
