import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useTrustlessWorkClient } from "../provider";
import { GetEscrowParams } from "../types";

/**
 * Use the useGetEscrow hook to get an escrow.
 * @returns A mutation function to get an escrow.
 */
export function useGetEscrow() {
  const client = useTrustlessWorkClient();
  const queryClient = useQueryClient();

  const mutation = useMutation({
    mutationFn: (payload: GetEscrowParams) => client.getEscrow(payload),
    onSuccess: (data) => {
      queryClient.invalidateQueries({ queryKey: ["escrows"] });
    },
  });

  return {
    getEscrow: mutation.mutateAsync,
    isPending: mutation.isPending,
    isError: mutation.isError,
    isSuccess: mutation.isSuccess,
    escrow: mutation.data,
  };
}
