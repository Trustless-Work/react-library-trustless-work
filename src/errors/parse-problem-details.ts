import axios from "axios";
import type { ApiProblemDetails } from "../types/types.error";
import { TrustlessWorkApiError } from "./trustless-work-api-error";

function isRecord(value: unknown): value is Record<string, unknown> {
  return typeof value === "object" && value !== null;
}

/**
 * Type guard for RFC 9457 payloads emitted by Trustless Work Core.
 */
export function isProblemDetails(value: unknown): value is ApiProblemDetails {
  if (!isRecord(value)) return false;
  return (
    typeof value.type === "string" &&
    typeof value.title === "string" &&
    typeof value.status === "number" &&
    typeof value.code === "string" &&
    typeof value.detail === "string" &&
    (value.instance === undefined || typeof value.instance === "string") &&
    (value.traceId === undefined || typeof value.traceId === "string") &&
    (value.extensions === undefined || isRecord(value.extensions))
  );
}

/**
 * Parses `unknown` (typically `AxiosError.response.data`) into Problem Details.
 */
export function parseProblemDetails(data: unknown): ApiProblemDetails | undefined {
  if (!isProblemDetails(data)) return undefined;
  return data;
}

/**
 * Extracts Problem Details from an Axios error, if present.
 */
export function parseProblemDetailsFromAxiosError(
  error: unknown,
): ApiProblemDetails | undefined {
  if (!axios.isAxiosError(error)) return undefined;
  return parseProblemDetails(error.response?.data);
}

/**
 * Normalizes any thrown value into a `TrustlessWorkApiError` when the response
 * body is Problem Details; otherwise returns the original error.
 */
export function toTrustlessWorkError(error: unknown): TrustlessWorkApiError | unknown {
  const problem = parseProblemDetailsFromAxiosError(error);
  if (problem) return new TrustlessWorkApiError(problem);
  return error;
}

/**
 * Human-readable one-liner for UI toasts/logs.
 */
export function formatApiErrorMessage(error: unknown): string {
  if (error instanceof TrustlessWorkApiError) {
    const parts = [error.message];
    if (error.code) parts.unshift(`[${error.code}]`);
    if (error.traceId) parts.push(`(trace: ${error.traceId})`);
    return parts.join(" ");
  }
  if (error instanceof Error) return error.message;
  return "Request failed";
}
