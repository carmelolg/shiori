---
title: "Getting Started"
date: 2024-01-01T00:00:00Z
draft: false
toc: true
---

## Installation

v1.0.0 Installation:

```bash
npm install mylib@1.0.0
```

## Quick Start

Basic usage example for MyLib v1.0.0.

```typescript
import { MyLib } from 'mylib';

const client = new MyLib({ apiKey: process.env.MYLIB_API_KEY });
const users = await client.users.list();
```

## Next Steps

- Read the API Reference
- Check out Design Decisions
