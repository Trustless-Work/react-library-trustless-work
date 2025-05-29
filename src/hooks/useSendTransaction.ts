import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useTrustlessWorkClient } from "../provider";

/**
 * Use the useSendTransaction hook to send a transaction by signing it with the user's private key.
 * @returns A mutation function to send a transaction.
 */
export function useSendTransaction() {
  const client = useTrustlessWorkClient();
  const queryClient = useQueryClient();

  const mutation = useMutation({
    mutationFn: (signedXdr: string) => client.sendTransaction(signedXdr),
    onSuccess: (data) => {
      queryClient.invalidateQueries({ queryKey: ["sendTransaction"] });
    },
  });

  return {
    sendTransaction: mutation.mutateAsync,
    isPending: mutation.isPending,
    isError: mutation.isError,
    isSuccess: mutation.isSuccess,
  };
}
