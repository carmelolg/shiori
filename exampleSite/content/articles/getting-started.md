---
title: "Getting Started"
date: 2025-01-01
draft: false
summary: "Install MyLib and make your first API call in under 5 minutes."
weight: 10
toc: true
tags: ["quickstart", "install"]
---

## Prerequisites

Before you begin, ensure you have:

- **Node.js** 18+ (or Python 3.9+, Java 17+)
- An API key — get one from the [dashboard](https://dashboard.example.com)

## Installation

{{< code-tabs >}}
{{< code-tab name="npm" >}}
```bash
npm install mylib
```
{{< /code-tab >}}
{{< code-tab name="yarn" >}}
```bash
yarn add mylib
```
{{< /code-tab >}}
{{< code-tab name="pip" >}}
```bash
pip install mylib
```
{{< /code-tab >}}
{{< /code-tabs >}}

## Configuration

Create a client instance with your API key:

```typescript
import { MyLib } from 'mylib';

const client = new MyLib({
  apiKey: process.env.MYLIB_API_KEY,
  baseURL: 'https://api.example.com/v1', // optional
});
```

{{< callout type="warning" >}}
Never hardcode API keys in your source code. Use environment variables or a secrets manager.
{{< /callout >}}

## Your First Request

Fetch the list of users in your organization:

```typescript
const users = await client.users.list({ limit: 10 });
console.log(users.data);
```

Expected response:

```json
{
  "data": [
    { "id": "usr_abc123", "name": "Alice", "email": "alice@example.com" }
  ],
  "meta": { "page": 1, "limit": 10, "total": 1 }
}
```

## Error Handling

MyLib throws typed errors for API failures:

```typescript
import { MyLib, NotFoundError, AuthError } from 'mylib';

try {
  const user = await client.users.get('nonexistent');
} catch (err) {
  if (err instanceof NotFoundError) {
    console.error('User not found:', err.message);
  } else if (err instanceof AuthError) {
    console.error('Check your API key');
  } else {
    throw err;
  }
}
```

## Next Steps

- Read the [Authentication guide](/articles/authentication/) to understand token scopes
- Browse the [API Reference](/api/) for a full list of endpoints
- Explore the [Architecture](/design/architecture/) to understand how MyLib works internally
