---
title: "Error Handling"
date: 2025-01-01
draft: false
summary: "Understand the error format and how to handle API errors gracefully."
weight: 30
toc: true
tags: ["errors", "debugging"]
---

## Error Response Format

All API errors return a consistent JSON body:

```json
{
  "error": {
    "code": "USER_NOT_FOUND",
    "message": "No user found with id usr_abc123",
    "status": 404,
    "requestId": "req_xyz456"
  }
}
```

| Field | Type | Description |
|-------|------|-------------|
| `code` | string | Machine-readable error code |
| `message` | string | Human-readable description |
| `status` | integer | HTTP status code |
| `requestId` | string | Use this when contacting support |

## HTTP Status Codes

| Code | Meaning |
|------|---------|
| `200 OK` | Request succeeded |
| `201 Created` | Resource created |
| `204 No Content` | Deleted successfully |
| `400 Bad Request` | Validation error |
| `401 Unauthorized` | Missing or invalid token |
| `403 Forbidden` | Insufficient permissions |
| `404 Not Found` | Resource does not exist |
| `409 Conflict` | Duplicate resource |
| `429 Too Many Requests` | Rate limit exceeded |
| `500 Internal Server Error` | Server-side failure |

## Validation Errors

`400` responses include field-level details in `errors`:

```json
{
  "error": {
    "code": "VALIDATION_ERROR",
    "message": "Request body is invalid",
    "status": 400,
    "errors": [
      { "field": "email", "message": "Must be a valid email address" },
      { "field": "name",  "message": "Required" }
    ]
  }
}
```

## Retrying Requests

{{< callout type="warning" >}}
Only retry on `5xx` errors and `429 Too Many Requests`. Never retry `4xx` errors — they indicate a problem with your request that won't resolve on retry.
{{< /callout >}}

Use **exponential backoff** for retries:

```typescript
async function fetchWithRetry(url: string, options: RequestInit, retries = 3) {
  for (let i = 0; i < retries; i++) {
    const res = await fetch(url, options);
    if (res.ok) return res;
    if (res.status < 500 && res.status !== 429) throw new Error(`HTTP ${res.status}`);
    await new Promise(r => setTimeout(r, 2 ** i * 500)); // 500ms, 1s, 2s
  }
  throw new Error('Max retries exceeded');
}
```
