---
title: "Update User"
date: 2025-01-01
draft: false
summary: "Update an existing user's profile fields."
type: "api"
weight: 35
method: "PATCH"
endpoint: "/api/v1/users/{id}"
section: "Users"
version: "v1"
auth: "Bearer Token"
tags: ["users", "write"]

parameters:
  path:
    - name: "id"
      type: "string"
      required: true
      description: "The unique identifier of the user (e.g. `usr_abc123`)."
  headers:
    - name: "Authorization"
      type: "string"
      required: true
      description: "Bearer token. Format: `Bearer <token>`. Requires `users:write` scope."
    - name: "Content-Type"
      type: "string"
      required: true
      description: "Must be `application/json`."

requestBody:
  contentType: "application/json"
  description: "All fields are optional. Only provided fields will be updated."
  fields:
    - name: "name"
      type: "string"
      required: false
      description: "Full display name of the user."
    - name: "email"
      type: "string"
      required: false
      description: "Primary email address. Must be unique within the organization."
    - name: "role"
      type: "string"
      required: false
      description: "User role. Allowed values: `member`, `admin`, `viewer`."
    - name: "metadata"
      type: "object"
      required: false
      description: "Arbitrary key-value pairs for application use. Max 16 keys."
  example: |
    {
      "name": "Alice Smith",
      "role": "admin",
      "metadata": { "department": "engineering" }
    }

responses:
  - code: "200"
    description: "User updated successfully. Returns the updated user object."
    body: |
      {
        "id": "usr_abc123",
        "name": "Alice Smith",
        "email": "alice@example.com",
        "role": "admin",
        "createdAt": "2024-01-15T10:30:00Z",
        "updatedAt": "2024-06-01T08:00:00Z"
      }
  - code: "400"
    description: "Validation error. Check the `errors` array for field details."
  - code: "401"
    description: "Unauthorized. Missing or invalid token."
  - code: "403"
    description: "Forbidden. Token does not have `users:write` scope."
  - code: "404"
    description: "User not found."
  - code: "409"
    description: "Conflict. The new email address is already used by another user."

examples:
  - lang: "curl"
    code: |
      curl -X PATCH "https://api.example.com/v1/users/usr_abc123" \
        -H "Authorization: Bearer YOUR_TOKEN" \
        -H "Content-Type: application/json" \
        -d '{"name": "Alice Smith", "role": "admin"}'
  - lang: "JavaScript"
    code: |
      const updated = await fetch('/api/v1/users/usr_abc123', {
        method: 'PATCH',
        headers: {
          'Authorization': 'Bearer YOUR_TOKEN',
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ name: 'Alice Smith', role: 'admin' }),
      }).then(r => r.json());
      console.log(updated.updatedAt);
  - lang: "Python"
    code: |
      import requests

      r = requests.patch(
          'https://api.example.com/v1/users/usr_abc123',
          headers={'Authorization': 'Bearer YOUR_TOKEN'},
          json={'name': 'Alice Smith', 'role': 'admin'}
      )
      print(r.json()['updatedAt'])
---

Updates one or more fields of an existing user. This is a **partial update** (PATCH semantics) — only the fields included in the request body are modified; omitted fields retain their current values.

{{< callout type="note" >}}
To replace a user entirely, use `PUT /api/v1/users/{id}` (coming in v2).
{{< /callout >}}

## Immutable Fields

The following fields **cannot** be changed after creation:

- `id` — system-assigned, globally unique
- `createdAt` — set at creation time

## Email Uniqueness

If you update `email`, the new address must not be in use by any other user in your organization. A `409 Conflict` is returned otherwise.
