---
title: "Changelog"
date: 2025-06-01
draft: false
summary: "Release history and migration notes for MyLib."
weight: 100
toc: true
tags: ["changelog", "releases"]
---

## v2.3.1 — 2025-06-01

{{< badge color="green" >}}Latest{{< /badge >}}

**Bug fixes:**

- Fixed `users.list()` not respecting the `order` parameter when `sort` was omitted
- Fixed TypeScript type error in `client.users.create()` when `metadata` keys contain dots
- Improved error message when `apiKey` is an empty string

## v2.3.0 — 2025-04-15

**New features:**

- Added `users.search()` for full-text search across user profiles
- Added `metadata` field support to `users.create()` and `users.update()`
- Added `client.setToken()` helper for runtime token rotation

**Improvements:**

- `users.list()` now supports cursor-based pagination via `cursor` param
- Response parsing is now ~30% faster due to schema pre-compilation

{{< callout type="note" >}}
The `page`-based pagination in `users.list()` is still supported but deprecated. Migrate to `cursor`-based pagination before v3.0.
{{< /callout >}}

## v2.2.0 — 2025-02-10

**New features:**

- Added `DELETE /api/v1/users/{id}` endpoint
- Added `PATCH /api/v1/users/{id}` for partial updates
- Added `X-Request-ID` header to all responses for tracing

**Breaking changes (from v2.1):**

- `users.delete()` now returns `void` instead of the deleted user object

## v2.1.0 — 2024-11-20

**New features:**

- Initial public release of the REST API
- `GET /api/v1/users` — list users
- `POST /api/v1/users` — create user
- `GET /api/v1/users/{id}` — get user by ID

**Known issues:**

- Search endpoint not yet available (added in v2.3.0)
