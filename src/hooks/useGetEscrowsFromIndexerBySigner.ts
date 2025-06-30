import { useTrustlessWorkClient } from "../provider";
import { GetEscrowsFromIndexerBySignerParams } from "../types/types.payload";

/**
 * Use the useGetEscrowsFromIndexerBySigner hook to get multiple escrows from the database by signer.
 * @returns A function to get multiple escrows from the database by signer.
 */
export function useGetEscrowsFromIndexerBySigner() {
  const client = useTrustlessWorkClient();

  return {
    getEscrowsBySigner: (params: GetEscrowsFromIndexerBySignerParams) =>
      client.getEscrowsFromIndexerBySigner(params),
  };
}
