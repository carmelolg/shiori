---
title: "System Architecture"
date: 2025-01-01
draft: false
summary: "High-level overview of MyLib's architecture, components, and design principles."
weight: 10
toc: true
tags: ["architecture", "overview"]
---

## Overview

MyLib is designed around three core principles:

1. **Type safety** — All public APIs expose rich TypeScript types
2. **Zero dependencies** — No runtime dependencies beyond the standard library
3. **Tree-shakable** — Import only what you use

## Component Diagram

```
┌────────────────────────────────────────────────┐
│                   MyLib Client                  │
│                                                  │
│  ┌─────────────┐  ┌─────────────┐  ┌─────────┐ │
│  │  Users API  │  │  Auth API   │  │ ... API │ │
│  └──────┬──────┘  └──────┬──────┘  └────┬────┘ │
│         └────────────────┴───────────────┘      │
│                          │                       │
│              ┌───────────▼──────────┐            │
│              │    HTTP Transport    │            │
│              │  (fetch / axios)     │            │
│              └───────────┬──────────┘            │
│                          │                       │
│              ┌───────────▼──────────┐            │
│              │  Retry / Rate Limit  │            │
│              │     Middleware       │            │
│              └───────────┬──────────┘            │
│                          │                       │
│              ┌───────────▼──────────┐            │
│              │  Response Parser &  │            │
│              │  Error Normalizer   │            │
│              └──────────────────────┘            │
└────────────────────────────────────────────────┘
                           │
                  HTTP ────▼──── REST API
```

## Layers

### Client Layer

The top-level `MyLib` class acts as a **service locator**, providing scoped sub-clients for each resource type (`users`, `auth`, etc.). Each sub-client is lazy-initialized.

### HTTP Transport

The transport layer is pluggable. By default, MyLib uses the global `fetch` API. You can inject a custom transport for testing:

```typescript
const client = new MyLib({
  apiKey: 'test-key',
  transport: mockTransport,
});
```

### Middleware Pipeline

Requests pass through a composable middleware pipeline before being sent:

1. **Auth Middleware** — Injects the `Authorization` header
2. **Retry Middleware** — Retries `5xx` and `429` with exponential backoff
3. **Rate Limit Middleware** — Queues requests to stay within the rate limit

### Response Parsing

All responses are deserialized and validated against strict Zod schemas. If the server returns an unexpected shape, MyLib throws a `ParseError` with details, rather than silently returning malformed data.

## Design Decisions

### Why no dependencies?

External dependencies introduce supply chain risk. By building on the standard library and Web Platform APIs, MyLib can be audited entirely in-house and bundled without version conflicts.

### Why Zod for validation?

Zod provides schema-first TypeScript type inference. The same schema used for runtime validation also generates the TypeScript types, eliminating drift between types and runtime behaviour.

{{< callout type="note" >}}
Zod is a **dev** dependency used to generate types at build time. It is not included in the runtime bundle.
{{< /callout >}}
