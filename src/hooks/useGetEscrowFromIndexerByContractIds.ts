import { useTrustlessWorkClient } from "../provider";
import { GetEscrowFromIndexerByContractIdsParams } from "../types/types.payload";

/**
 * Use the useGetEscrowFromIndexerByContractId hook to get an escrow from the database by contractId.
 * @returns A function to get an escrow from the database by contractId.
 */
export function useGetEscrowFromIndexerByContractIds() {
  const client = useTrustlessWorkClient();

  return {
    getEscrowByContractIds: (params: GetEscrowFromIndexerByContractIdsParams) =>
      client.getEscrowFromIndexerByContractIds(params),
  };
}
