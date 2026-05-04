---
title: "Get User"
date: 2024-01-01T00:00:00Z
draft: false
type: "api"
method: "GET"
endpoint: "/api/users/{id}"
deprecated: false
auth: "Bearer Token"
---

## Description

Retrieve a single user by ID.

## Parameters

**Path Parameters:**
- `id` (string, required) - The user ID

**Query Parameters:**
- `include` (string, optional) - Include related data (profile, permissions)

## Response

Returns a user object with basic information.

## Example

```bash
curl -X GET https://api.example.com/users/user123 \
  -H "Authorization: Bearer YOUR_TOKEN"
```
