/**
 * Hooks — pick REST or GraphQL explicitly.
 *
 * Prefer:
 * - `@trustless-work/escrow/hooks/rest`
 * - `@trustless-work/escrow/hooks/graphql`
 *
 * Or import accessors: `useEscrowRest` / `useEscrowGraphql` from the main package.
 */

export * from "./rest";
export * from "./graphql";
