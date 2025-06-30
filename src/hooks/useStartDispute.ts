import { useTrustlessWorkClient } from "../provider";
import {
  MultiReleaseStartDisputePayload,
  SingleReleaseStartDisputePayload,
} from "../types/types.payload";
import { EscrowType } from "../types/types";

/**
 * Use the useStartDispute hook to start a dispute.
 * @returns A function to start a dispute.
 */
export function useStartDispute() {
  const client = useTrustlessWorkClient();

  return {
    startDispute: (
      payload:
        | SingleReleaseStartDisputePayload
        | MultiReleaseStartDisputePayload,
      type: EscrowType
    ) => client.startDispute(payload, type),
  };
}
