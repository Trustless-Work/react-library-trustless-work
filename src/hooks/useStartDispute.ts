import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useTrustlessWorkClient } from "../provider";
import {
  MultiReleaseStartDisputePayload,
  SingleReleaseStartDisputePayload,
} from "../types/types.payload";
import { EscrowType } from "../types/types";

/**
 * Use the useStartDispute hook to start a dispute.
 * @returns A mutation function to start a dispute.
 */
export function useStartDispute() {
  const client = useTrustlessWorkClient();
  const queryClient = useQueryClient();

  const mutation = useMutation({
    mutationFn: ({
      payload,
      type,
    }: {
      payload:
        | SingleReleaseStartDisputePayload
        | MultiReleaseStartDisputePayload;
      type: EscrowType;
    }) => client.startDispute(payload, type),
    onSuccess: (data) => {
      queryClient.invalidateQueries({ queryKey: ["escrows"] });
    },
  });

  return {
    startDispute: mutation.mutateAsync,
    isPending: mutation.isPending,
    isError: mutation.isError,
    isSuccess: mutation.isSuccess,
    unsignedTransaction: mutation.data?.unsignedTransaction,
  };
}
