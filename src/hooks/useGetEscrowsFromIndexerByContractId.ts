import { useTrustlessWorkClient } from "../provider";
import {
  GetEscrowsFromIndexerByContractIdParams,
  GetEscrowsFromIndexerBySignerParams,
} from "../types/types.payload";

/**
 * Use the useGetEscrowsFromIndexerByContractId hook to get an escrow from the database by contractId.
 * @returns A function to get an escrow from the database by contractId.
 */
export function useGetEscrowsFromIndexerByContractId() {
  const client = useTrustlessWorkClient();

  return {
    getEscrowsByContractId: (params: GetEscrowsFromIndexerByContractIdParams) =>
      client.getEscrowsFromIndexerByContractId(params),
  };
}
