import { useTrustlessWorkClient } from "../provider";
import { UpdateFromTxHashPayload } from "../types/types.payload";
import { UpdateFromTxHashResponse } from "../types/types.response";

/**
 * Hook to update escrow information from a transaction hash
 * @returns A function to call the update-from-tx-hash endpoint
 */
export function useUpdateFromTxHash() {
  const client = useTrustlessWorkClient();

  return {
    updateFromTxHash: (
      payload: UpdateFromTxHashPayload
    ): Promise<UpdateFromTxHashResponse> => client.updateFromTxHash(payload),
  };
}
