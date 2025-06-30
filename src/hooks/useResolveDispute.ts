import { useTrustlessWorkClient } from "../provider";
import {
  MultiReleaseResolveDisputePayload,
  SingleReleaseResolveDisputePayload,
} from "../types/types.payload";
import { EscrowType } from "../types/types";

/**
 * Use the useResolveDispute hook to resolve a dispute.
 * @returns A function to resolve a dispute.
 */
export function useResolveDispute() {
  const client = useTrustlessWorkClient();

  return {
    resolveDispute: (
      payload:
        | SingleReleaseResolveDisputePayload
        | MultiReleaseResolveDisputePayload,
      type: EscrowType
    ) => client.resolveDispute(payload, type),
  };
}
