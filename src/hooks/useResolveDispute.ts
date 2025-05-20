import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useTrustlessWorkClient } from "../provider";
import { ResolveDisputePayload } from "../types.payload";

/**
 * Use the useResolveDispute hook to resolve a dispute.
 * @returns A mutation function to resolve a dispute.
 */
export function useResolveDispute() {
  const client = useTrustlessWorkClient();
  const queryClient = useQueryClient();

  const mutation = useMutation({
    mutationFn: (payload: ResolveDisputePayload) =>
      client.resolveDispute(payload),
    onSuccess: (data) => {
      queryClient.invalidateQueries({ queryKey: ["escrows"] });
    },
  });

  return {
    resolveDispute: mutation.mutateAsync,
    isPending: mutation.isPending,
    isError: mutation.isError,
    isSuccess: mutation.isSuccess,
    error: mutation.error,
    unsignedTransaction: mutation.data?.unsignedTransaction,
  };
}
