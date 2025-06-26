import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useTrustlessWorkClient } from "../provider";
import { GetEscrowsFromIndexerByRoleParams } from "../types/types.payload";

/**
 * Use the useGetEscrowsFromIndexerByRole hook to get multiple escrows from the database by role.
 * @returns A mutation function to get multiple escrows from the database by role.
 */
export function useGetEscrowsFromIndexerByRole() {
  const client = useTrustlessWorkClient();
  const queryClient = useQueryClient();

  const mutation = useMutation({
    mutationFn: ({ params }: { params: GetEscrowsFromIndexerByRoleParams }) =>
      client.getEscrowsFromIndexerByRole(params),
    onSuccess: (data) => {
      queryClient.invalidateQueries({ queryKey: ["escrows"] });
    },
  });

  return {
    getEscrowsByRole: mutation.mutateAsync,
    isPending: mutation.isPending,
    isError: mutation.isError,
    isSuccess: mutation.isSuccess,
    escrows: mutation.data,
  };
}
