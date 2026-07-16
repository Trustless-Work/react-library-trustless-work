import { useEscrowGraphql } from "../../provider";
import type { GraphqlGetEscrowVariables } from "../../services/graphql";

/**
 * GraphQL `escrow(contractId:)` — detail with financial, deposits, events.
 */
export function useGraphqlGetEscrow() {
  const graphql = useEscrowGraphql();

  return {
    getEscrow: (variables: GraphqlGetEscrowVariables) =>
      graphql.getEscrow(variables),
  };
}
