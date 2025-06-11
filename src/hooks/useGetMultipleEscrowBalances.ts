import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useTrustlessWorkClient } from "../provider";
import { EscrowType, GetBalanceParams } from "../types";

/**
 * Use the useGetMultipleEscrowBalances hook to get multiple escrow balances.
 * @returns A mutation function to get multiple escrow balances.
 */
export function useGetMultipleEscrowBalances() {
  const client = useTrustlessWorkClient();
  const queryClient = useQueryClient();

  const mutation = useMutation({
    mutationFn: ({
      payload,
      type,
    }: {
      payload: GetBalanceParams;
      type: EscrowType;
    }) => client.getMultipleEscrowBalances(payload, type),
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
