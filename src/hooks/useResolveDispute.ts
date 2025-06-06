import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useTrustlessWorkClient } from "../provider";
import {
  MultiReleaseResolveDisputePayload,
  SingleReleaseResolveDisputePayload,
} from "../types/types.payload";
import { EscrowType } from "../types/types";

/**
 * Use the useResolveDispute hook to resolve a dispute.
 * @returns A mutation function to resolve a dispute.
 */
export function useResolveDispute() {
  const client = useTrustlessWorkClient();
  const queryClient = useQueryClient();

  const mutation = useMutation({
    mutationFn: ({
      payload,
      type,
    }: {
      payload:
        | SingleReleaseResolveDisputePayload
        | MultiReleaseResolveDisputePayload;
      type: EscrowType;
    }) => client.resolveDispute(payload, type),
    onSuccess: (data) => {
      queryClient.invalidateQueries({ queryKey: ["escrows"] });
    },
  });

  return {
    resolveDispute: mutation.mutateAsync,
    isPending: mutation.isPending,
    isError: mutation.isError,
    isSuccess: mutation.isSuccess,
    unsignedTransaction: mutation.data?.unsignedTransaction,
  };
}
