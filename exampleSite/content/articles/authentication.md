---
title: "Authentication"
date: 2025-01-01
draft: false
summary: "How to authenticate API requests using Bearer tokens and manage token scopes."
weight: 20
toc: true
tags: ["auth", "security", "tokens"]
---

## Overview

MyLib uses **Bearer Token** authentication via the `Authorization` HTTP header. All API endpoints require authentication unless stated otherwise.

## Obtaining a Token

Generate an API token from the [developer dashboard](https://dashboard.example.com/tokens):

1. Navigate to **Settings → API Tokens**
2. Click **New Token**
3. Give it a descriptive name (e.g. `production-backend`)
4. Select the required **scopes** (see below)
5. Click **Generate** and copy the token immediately — it won't be shown again

{{< callout type="danger" >}}
Tokens are shown only once at creation. Store them securely in a secrets manager (e.g., HashiCorp Vault, AWS Secrets Manager, or `.env` files that are **not** committed to source control).
{{< /callout >}}

## Using the Token

Pass the token in the `Authorization` header on every request:

```http
GET /api/v1/users HTTP/1.1
Host: api.example.com
Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
```

## Token Scopes

Tokens are scoped to minimize the blast radius if compromised.

| Scope | Description |
|-------|-------------|
| `users:read` | Read user data |
| `users:write` | Create and update users |
| `users:delete` | Delete users |
| `admin` | Full access (use with caution) |

{{< callout type="tip" >}}
Follow the **principle of least privilege**: grant only the scopes your application needs. Use separate tokens for read-only operations.
{{< /callout >}}

## Token Expiry

By default, tokens do not expire. You can configure expiry at creation time:

```json
{
  "name": "ci-token",
  "expiresIn": "30d",
  "scopes": ["users:read"]
}
```

## Revoking Tokens

Revoke tokens immediately if compromised:

```bash
curl -X DELETE "https://api.example.com/v1/tokens/tok_abc123" \
  -H "Authorization: Bearer YOUR_ADMIN_TOKEN"
```

Or from the dashboard at **Settings → API Tokens → Revoke**.

## Rate Limiting

Authenticated requests are limited to **1000 req/min** per token. The response includes rate limit headers:

```http
X-RateLimit-Limit: 1000
X-RateLimit-Remaining: 987
X-RateLimit-Reset: 1715000000
```

When the limit is exceeded, the API returns `429 Too Many Requests`.
