---
title: "MyLib Documentation"
---

## What is MyLib?

**MyLib** is a fast, type-safe, zero-dependency utility library for modern applications written in TypeScript. It provides a rich set of helpers for common tasks: data validation, async utilities, functional programming primitives, and more.

Whether you're building a Node.js backend, a browser app, or a CLI tool, MyLib gives you the building blocks you need — without bloating your bundle.

## Key Features

| Feature | Description |
|---------|-------------|
| 🔒 **Type-safe** | Full TypeScript support with strict generics |
| ⚡ **Fast** | Zero runtime overhead, tree-shakable ESM |
| 🧩 **Zero deps** | No external runtime dependencies |
| 🌐 **Universal** | Works in Node.js, Deno, Bun, and modern browsers |
| 🧪 **Tested** | 100% code coverage with Vitest |

## Quick Example

```typescript
import { MyLib } from 'mylib';

const client = new MyLib({ apiKey: process.env.MYLIB_API_KEY });

// Fetch all users
const { data: users } = await client.users.list({ limit: 10 });

// Create a new user
const newUser = await client.users.create({
  name: 'Alice',
  email: 'alice@example.com',
  role: 'member',
});

console.log(`Created user: ${newUser.id}`);
```

