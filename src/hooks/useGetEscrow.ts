import { useTrustlessWorkClient } from "../provider";
import { EscrowType, GetEscrowParams } from "../types";

/**
 * Use the useGetEscrow hook to get an escrow.
 * @returns A function to get an escrow.
 */
export function useGetEscrow() {
  const client = useTrustlessWorkClient();

  return {
    getEscrow: (payload: GetEscrowParams, type: EscrowType) =>
      client.getEscrow(payload, type),
  };
}
