import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useTrustlessWorkClient } from "../provider";
import { GetBalanceParams } from "../types.payload";

/**
 * Use the useGetMultipleEscrowBalances hook to get multiple escrow balances.
 * @returns A mutation function to get multiple escrow balances.
 */
export function useGetMultipleEscrowBalances() {
  const client = useTrustlessWorkClient();
  const queryClient = useQueryClient();

  const mutation = useMutation({
    mutationFn: (payload: GetBalanceParams) =>
      client.getMultipleBalances(payload),
    onSuccess: (data) => {
      queryClient.invalidateQueries({ queryKey: ["escrows"] });
    },
  });

  return {
    getMultipleBalances: mutation.mutateAsync,
    isPending: mutation.isPending,
    isError: mutation.isError,
    isSuccess: mutation.isSuccess,
    balances: mutation.data,
  };
}
