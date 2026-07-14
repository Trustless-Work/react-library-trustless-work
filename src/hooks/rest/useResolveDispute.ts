import { useEscrowRest } from "../../provider";
import {
  MultiReleaseResolveDisputePayload,
  SingleReleaseResolveDisputePayload,
} from "../../types/types.payload";
import { EscrowType } from "../../types/types";

/**
 * Use the useResolveDispute hook to resolve a dispute.
 * @returns A function to resolve a dispute.
 */
export function useResolveDispute() {
  const rest = useEscrowRest();

  return {
    resolveDispute: (
      payload:
        | SingleReleaseResolveDisputePayload
        | MultiReleaseResolveDisputePayload,
      type: EscrowType
    ) => rest.resolveDispute(payload, type),
  };
}
