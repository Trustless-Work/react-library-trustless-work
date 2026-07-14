/**
 * REST surface — operate + `/escrows` reads.
 * Prefer this entry when you only need REST.
 */
export { EscrowRestService } from "./services/rest";
export { useEscrowRest } from "./provider";
export * from "./hooks/rest";
