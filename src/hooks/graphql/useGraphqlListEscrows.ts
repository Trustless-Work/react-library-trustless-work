import { useEscrowGraphql } from "../../provider";
import type { GraphqlListEscrowsVariables } from "../../services/graphql";

/**
 * GraphQL `escrows(...)` — keyset list (twin of REST `GET /escrows`).
 */
export function useGraphqlListEscrows() {
  const graphql = useEscrowGraphql();

  return {
    listEscrows: (variables?: GraphqlListEscrowsVariables) =>
      graphql.listEscrows(variables),
  };
}
