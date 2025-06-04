import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useTrustlessWorkClient } from "../provider";
import { ChangeMilestoneStatusPayload, EscrowType } from "../types";

/**
 * Use the useChangeMilestoneStatus hook to change the status of a milestone.
 * @returns A mutation function to change the status of a milestone.
 */
export function useChangeMilestoneStatus() {
  const client = useTrustlessWorkClient();
  const queryClient = useQueryClient();

  const mutation = useMutation({
    mutationFn: ({
      payload,
      type,
    }: {
      payload: ChangeMilestoneStatusPayload;
      type: EscrowType;
    }) => client.changeMilestoneStatus(payload, type),
    onSuccess: (data) => {
      queryClient.invalidateQueries({ queryKey: ["escrows"] });
    },
  });

  return {
    changeMilestoneStatus: mutation.mutateAsync,
    isPending: mutation.isPending,
    isError: mutation.isError,
    isSuccess: mutation.isSuccess,
    unsignedTransaction: mutation.data?.unsignedTransaction,
  };
}
