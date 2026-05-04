---
title: "Data Model"
date: 2025-01-01
draft: false
summary: "Core entities, relationships, and field definitions used across the MyLib API."
weight: 20
toc: true
tags: ["data-model", "schema"]
---

## Entities

### User

Represents a human user in the system.

| Field | Type | Description |
|-------|------|-------------|
| `id` | `string` | Unique identifier. Prefix: `usr_`. |
| `name` | `string` | Full display name. |
| `email` | `string` | Unique email address. |
| `roles` | `string[]` | Assigned roles. |
| `status` | `enum` | `active` \| `suspended` \| `deleted` |
| `createdAt` | `ISO 8601` | Account creation timestamp. |
| `updatedAt` | `ISO 8601` | Last modification timestamp. |

```typescript
interface User {
  id:        string;
  name:      string;
  email:     string;
  roles:     Role[];
  status:    'active' | 'suspended' | 'deleted';
  createdAt: string;  // ISO 8601
  updatedAt: string;
}
```

### Token

Represents an API authentication token.

| Field | Type | Description |
|-------|------|-------------|
| `id` | `string` | Unique identifier. Prefix: `tok_`. |
| `name` | `string` | Human-readable label. |
| `scopes` | `string[]` | Permission scopes granted. |
| `lastUsedAt` | `ISO 8601 \| null` | When the token was last used. |
| `expiresAt` | `ISO 8601 \| null` | Expiry time, or `null` if permanent. |
| `createdAt` | `ISO 8601` | Creation timestamp. |

{{< callout type="warning" >}}
The token `secret` value is only returned once, at creation time. It is never returned again in subsequent API calls.
{{< /callout >}}

## ID Format

All entity IDs follow the pattern `{prefix}_{random}`:

- `usr_` — Users
- `tok_` — Tokens
- `org_` — Organizations

IDs are **opaque strings** — do not attempt to parse them. Their format may change between API versions.

## Pagination Envelope

All list endpoints return results wrapped in a standard envelope:

```typescript
interface PaginatedResponse<T> {
  data:  T[];
  meta: {
    page:    number;
    limit:   number;
    total:   number;
    hasMore: boolean;
  };
}
```

## Timestamps

All timestamps are returned in **ISO 8601 UTC** format:

```
2025-01-15T09:30:00.000Z
```

When filtering by timestamp, you may use any ISO 8601 date string:

```
?since=2025-01-01
?since=2025-01-01T00:00:00Z
```
