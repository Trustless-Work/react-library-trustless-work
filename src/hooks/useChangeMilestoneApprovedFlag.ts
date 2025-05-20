import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useTrustlessWorkClient } from "../provider";
import { ChangeMilestoneApprovedFlagPayload } from "../types.payload";

/**
 * Use the useChangeMilestoneApprovedFlag hook to change the approved flag of a milestone.
 * @returns A mutation function to change the approved flag of a milestone.
 */
export function useChangeMilestoneApprovedFlag() {
  const client = useTrustlessWorkClient();
  const queryClient = useQueryClient();

  const mutation = useMutation({
    mutationFn: (payload: ChangeMilestoneApprovedFlagPayload) =>
      client.changeMilestoneApprovedFlag(payload),
    onSuccess: (data) => {
      queryClient.invalidateQueries({ queryKey: ["escrows"] });
    },
  });

  return {
    changeMilestoneApprovedFlag: mutation.mutateAsync,
    isPending: mutation.isPending,
    isError: mutation.isError,
    isSuccess: mutation.isSuccess,
    error: mutation.error,
    unsignedTransaction: mutation.data?.unsignedTransaction,
  };
}
