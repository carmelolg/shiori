---
title: "Search Users"
date: 2025-01-01
draft: false
summary: "Full-text search across users by name, email, or metadata."
type: "api"
weight: 50
method: "GET"
endpoint: "/api/v1/users/search"
section: "Users"
version: "v1"
auth: "Bearer Token"
tags: ["users", "list"]

parameters:
  query:
    - name: "q"
      type: "string"
      required: true
      description: "Search query. Matched against `name`, `email`, and `metadata` values. Minimum 2 characters."
    - name: "limit"
      type: "integer"
      required: false
      description: "Maximum number of results to return. Default: `10`. Max: `50`."
    - name: "role"
      type: "string"
      required: false
      description: "Filter results by role. Allowed: `member`, `admin`, `viewer`."
  headers:
    - name: "Authorization"
      type: "string"
      required: true
      description: "Bearer token. Requires `users:read` scope."

responses:
  - code: "200"
    description: "Search results."
    body: |
      {
        "results": [
          {
            "id": "usr_abc123",
            "name": "Alice",
            "email": "alice@example.com",
            "role": "admin",
            "score": 0.95
          }
        ],
        "total": 1,
        "query": "alice"
      }
  - code: "400"
    description: "Query too short (less than 2 characters) or invalid filter value."
  - code: "401"
    description: "Unauthorized."

examples:
  - lang: "curl"
    code: |
      curl "https://api.example.com/v1/users/search?q=alice&role=admin" \
        -H "Authorization: Bearer YOUR_TOKEN"
  - lang: "JavaScript"
    code: |
      const params = new URLSearchParams({ q: 'alice', role: 'admin' });
      const { results } = await fetch(`/api/v1/users/search?${params}`, {
        headers: { 'Authorization': 'Bearer YOUR_TOKEN' },
      }).then(r => r.json());
      console.log(`${results.length} results`);
  - lang: "Python"
    code: |
      import requests

      r = requests.get(
          'https://api.example.com/v1/users/search',
          params={'q': 'alice', 'role': 'admin'},
          headers={'Authorization': 'Bearer YOUR_TOKEN'}
      )
      print(r.json()['results'])
---

Performs a full-text search across all users in your organization. Results are ranked by relevance score.

{{< callout type="tip" >}}
Search is case-insensitive and supports partial matches. `"ali"` will match `"Alice"`.
{{< /callout >}}

## Relevance Scoring

Results include a `score` field (0–1) indicating match quality. Matches on `email` are weighted higher than `name`, which is higher than `metadata`.

## Rate Limiting

Search endpoints are subject to a stricter rate limit of **100 req/min** per token to protect query performance.
