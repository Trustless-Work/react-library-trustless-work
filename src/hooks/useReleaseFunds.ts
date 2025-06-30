import { useTrustlessWorkClient } from "../provider";
import {
  SingleReleaseReleaseFundsPayload,
  MultiReleaseReleaseFundsPayload,
} from "../types/types.payload";
import { EscrowType } from "../types/types";

/**
 * Use the useReleaseFunds hook to release funds from an escrow.
 * @returns A function to release funds from an escrow.
 */
export function useReleaseFunds() {
  const client = useTrustlessWorkClient();

  return {
    releaseFunds: (
      payload:
        | SingleReleaseReleaseFundsPayload
        | MultiReleaseReleaseFundsPayload,
      type: EscrowType
    ) => client.releaseFunds(payload, type),
  };
}
