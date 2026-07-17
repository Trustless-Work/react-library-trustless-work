---
description: Payload, response, read-model, and entity types for @trustless-work/escrow v5.
---

# Types

Import from `@trustless-work/escrow/types` (or the root package).

### Operate payloads

| Area | Examples |
| --- | --- |
| Deploy | `DeploySingleReleaseEscrowPayload`, `DeployMultiReleaseEscrowPayload`, `DeployTrustline`, `AttributionHeaders` |
| Update | `UpdateSingleReleaseEscrowPayload`, `UpdateMultiReleaseEscrowPayload` |
| Fund / release | `FundEscrowPayload`, `SingleReleaseReleaseFundsPayload`, `MultiReleaseReleaseFundsPayload` |
| Milestones | `ChangeMilestoneStatusPayload`, `ApproveMilestonesPayload`, `ApproveAndReleaseMilestonesPayload`, `ManageSingleReleaseMilestonesPayload`, `ManageMultiReleaseMilestonesPayload` |
| Dispute | `SingleReleaseStartDisputePayload`, `MultiReleaseStartDisputePayload`, `SingleReleaseResolveDisputePayload`, `MultiReleaseResolveDisputePayload`, `Distribution` |
| Withdraw | `SingleReleaseWithdrawRemainingFundsPayload`, `MultiReleaseWithdrawRemainingFundsPayload` |

### Responses

| Type | Shape |
| --- | --- |
| `DeployEscrowResponse` | `{ unsignedXdr, txHash, contractId }` |
| `BuildTransactionResponse` | `{ unsignedXdr, txHash }` |
| `SendTransactionResponse` | `{ txHash, ledger, contractId?, escrow?, code?, message? }` |
| `ListEscrowsResponse` | `KeysetPage<EscrowSummary>` |
| `GetEscrowResponse` | `EscrowDetail` |
| Batch responses | `BatchEscrowDetailsResponse`, `BatchEscrowMilestonesResponse`, `BatchEscrowFinancialResponse` |
| `ListEscrowEventsResponse` | `KeysetPage<EscrowEvent>` |

### Reads

| Type | Notes |
| --- | --- |
| `EscrowSummary` | Root `balance` (string), `asset { name, address, contractId }`, camelCased `snapshot` |
| `EscrowDetail` | `{ escrow, events, deposits }` |
| `EscrowFinancial` | Deposited / released / pending / `balance` |
| `EscrowEvent` / `EscrowDeposit` | No UUID `id` |
| `KeysetPage<T>` | `{ data, hasMore, nextCursor }` |
| `ListEscrowsParams` | Filters for list |
| `BatchContractIdsParams` | `{ contractIds: string[] }` |

### Entities

`Escrow`, `SingleReleaseEscrow`, `MultiReleaseEscrow`, `Roles`, `MultiReleaseRoles`, `SingleReleaseMilestone`, `MultiReleaseMilestone`, `Trustline`, `DeployTrustline`, `Dispute`, …

### Primitives

`EscrowType` = `"single-release" | "multi-release"` · `EscrowStatus` = `"active" | "released" | "disputed"` · `baseURL` = `string`

### Errors

`ApiProblemDetails`, `EscrowErrorCode`, `ESCROW_ERROR_CODES` — see [Errors](/escrow-react-sdk/errors).

{% hint style="warning" %}
Read amounts are **decimal strings**. Operate payloads use human **numbers**. There is no UUID `id` / `escrowId` — use `contractId`.
{% endhint %}
