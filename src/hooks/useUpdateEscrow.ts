import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useTrustlessWorkClient } from "../provider";
import { UpdateEscrowPayload } from "../types.payload";

/**
 * Use the useUpdateEscrow hook to update an escrow.
 * @returns A mutation function to update an escrow.
 */
export function useUpdateEscrow() {
  const client = useTrustlessWorkClient();
  const queryClient = useQueryClient();

  const mutation = useMutation({
    mutationFn: (payload: UpdateEscrowPayload) => client.updateEscrow(payload),
    onSuccess: (data) => {
      queryClient.invalidateQueries({ queryKey: ["escrows"] });
    },
  });

  return {
    updateEscrow: mutation.mutateAsync,
    isPending: mutation.isPending,
    isError: mutation.isError,
    isSuccess: mutation.isSuccess,
    error: mutation.error,
    unsignedTransaction: mutation.data?.unsignedTransaction,
  };
}
