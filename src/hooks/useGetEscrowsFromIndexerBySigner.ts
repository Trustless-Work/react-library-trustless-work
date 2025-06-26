import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useTrustlessWorkClient } from "../provider";
import { GetEscrowsFromIndexerBySignerParams } from "../types/types.payload";

/**
 * Use the useGetEscrowsFromIndexerBySigner hook to get multiple escrows from the database by signer.
 * @returns A mutation function to get multiple escrows from the database by signer.
 */
export function useGetEscrowsFromIndexerBySigner() {
  const client = useTrustlessWorkClient();
  const queryClient = useQueryClient();

  const mutation = useMutation({
    mutationFn: ({ params }: { params: GetEscrowsFromIndexerBySignerParams }) =>
      client.getEscrowsFromIndexerBySigner(params),
    onSuccess: (data) => {
      queryClient.invalidateQueries({ queryKey: ["escrows"] });
    },
  });

  return {
    getEscrowsBySigner: mutation.mutateAsync,
    isPending: mutation.isPending,
    isError: mutation.isError,
    isSuccess: mutation.isSuccess,
    escrows: mutation.data,
  };
}
