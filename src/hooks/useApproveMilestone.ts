import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useTrustlessWorkClient } from "../provider";
import { ApproveMilestonePayload, EscrowType } from "../types";

/**
 * Use the useApproveMilestone hook to change the approved flag of a milestone.
 * @returns A mutation function to change the approved flag of a milestone.
 */
export function useApproveMilestone() {
  const client = useTrustlessWorkClient();
  const queryClient = useQueryClient();

  const mutation = useMutation({
    mutationFn: ({
      payload,
      type,
    }: {
      payload: ApproveMilestonePayload;
      type: EscrowType;
    }) => client.approveMilestone(payload, type),
    onSuccess: (data) => {
      queryClient.invalidateQueries({ queryKey: ["escrows"] });
    },
  });

  return {
    approveMilestone: mutation.mutateAsync,
    isPending: mutation.isPending,
    isError: mutation.isError,
    isSuccess: mutation.isSuccess,
    unsignedTransaction: mutation.data?.unsignedTransaction,
  };
}
