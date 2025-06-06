import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useTrustlessWorkClient } from "../provider";
import {
  UpdateMultiReleaseEscrowPayload,
  UpdateSingleReleaseEscrowPayload,
} from "../types/types.payload";
import { EscrowType } from "../types/types";

/**
 * Use the useUpdateEscrow hook to update an escrow.
 * @returns A mutation function to update an escrow.
 */
export function useUpdateEscrow() {
  const client = useTrustlessWorkClient();
  const queryClient = useQueryClient();

  const mutation = useMutation({
    mutationFn: ({
      payload,
      type,
    }: {
      payload:
        | UpdateSingleReleaseEscrowPayload
        | UpdateMultiReleaseEscrowPayload;
      type: EscrowType;
    }) => client.updateEscrow(payload, type),
    onSuccess: (data) => {
      queryClient.invalidateQueries({ queryKey: ["escrows"] });
    },
  });

  return {
    updateEscrow: mutation.mutateAsync,
    isPending: mutation.isPending,
    isError: mutation.isError,
    isSuccess: mutation.isSuccess,
    unsignedTransaction: mutation.data?.unsignedTransaction,
  };
}
