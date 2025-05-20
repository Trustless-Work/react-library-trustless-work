import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useTrustlessWorkClient } from "../provider";
import { ChangeMilestoneStatusPayload } from "../types.payload";

/**
 * Use the useChangeMilestoneStatus hook to change the status of a milestone.
 * @returns A mutation function to change the status of a milestone.
 */
export function useChangeMilestoneStatus() {
  const client = useTrustlessWorkClient();
  const queryClient = useQueryClient();

  const mutation = useMutation({
    mutationFn: (payload: ChangeMilestoneStatusPayload) =>
      client.changeMilestoneStatus(payload),
    onSuccess: (data) => {
      queryClient.invalidateQueries({ queryKey: ["escrows"] });
    },
  });

  return {
    changeMilestoneStatus: mutation.mutateAsync,
    isPending: mutation.isPending,
    isError: mutation.isError,
    isSuccess: mutation.isSuccess,
    error: mutation.error,
    unsignedTransaction: mutation.data?.unsignedTransaction,
  };
}
