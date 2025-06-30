import { useTrustlessWorkClient } from "../provider";
import { EscrowType, FundEscrowPayload } from "../types";

/**
 * Use the useFundEscrow hook to fund an escrow.
 * @returns A function to fund an escrow.
 */
export function useFundEscrow() {
  const client = useTrustlessWorkClient();

  return {
    fundEscrow: (payload: FundEscrowPayload, type: EscrowType) =>
      client.fundEscrow(payload, type),
  };
}
