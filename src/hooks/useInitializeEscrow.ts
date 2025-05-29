import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useTrustlessWorkClient } from "../provider";
import { InitializeEscrowPayload } from "../types";
import { EscrowType } from "../types/types";

/**
 * Use the useInitializeEscrow hook to initialize an escrow.
 * @returns A mutation function to initialize an escrow.
 */
export function useInitializeEscrow() {
  const client = useTrustlessWorkClient();
  const queryClient = useQueryClient();

  const mutation = useMutation({
    mutationFn: ({
      payload,
      type,
    }: {
      payload: InitializeEscrowPayload;
      type: EscrowType;
    }) => client.initializeEscrow(payload, type),
    onSuccess: (data) => {
      queryClient.invalidateQueries({ queryKey: ["escrows"] });
    },
  });

  return {
    deployEscrow: mutation.mutateAsync,
    isPending: mutation.isPending,
    isError: mutation.isError,
    isSuccess: mutation.isSuccess,
    unsignedTransaction: mutation.data?.unsignedTransaction,
  };
}
