---
title: "Create User"
date: 2025-01-01
draft: false
summary: "Create a new user account in the organization."
type: "api"
weight: 30
method: "POST"
endpoint: "/api/v1/users"
section: "Users"
version: "v1"
auth: "Bearer Token"
tags: ["users", "write"]

parameters:
  headers:
    - name: "Authorization"
      type: "string"
      required: true
      description: "Bearer token with `users:write` scope."
    - name: "Content-Type"
      type: "string"
      required: true
      description: "Must be `application/json`."

requestBody:
  contentType: "application/json"
  description: "User creation payload."
  fields:
    - name: "name"
      type: "string"
      required: true
      description: "Full name of the user."
    - name: "email"
      type: "string"
      required: true
      description: "Valid email address. Must be unique within the organization."
    - name: "roles"
      type: "array[string]"
      required: false
      description: "Initial roles to assign. Defaults to `[\"viewer\"]`."
    - name: "sendInvite"
      type: "boolean"
      required: false
      description: "Whether to send a welcome email. Default: `true`."
  example: |
    {
      "name": "Bob Johnson",
      "email": "bob@example.com",
      "roles": ["editor"],
      "sendInvite": true
    }

responses:
  - code: "201"
    description: "User created successfully."
    body: |
      {
        "id": "usr_xyz789",
        "name": "Bob Johnson",
        "email": "bob@example.com",
        "roles": ["editor"],
        "createdAt": "2025-01-15T09:00:00Z"
      }
  - code: "400"
    description: "Validation error — check `errors` in response body."
  - code: "409"
    description: "A user with this email already exists."

examples:
  - lang: "curl"
    code: |
      curl -X POST "https://api.example.com/v1/users" \
        -H "Authorization: Bearer YOUR_TOKEN" \
        -H "Content-Type: application/json" \
        -d '{
          "name": "Bob Johnson",
          "email": "bob@example.com",
          "roles": ["editor"]
        }'
  - lang: "JavaScript"
    code: |
      const res = await fetch('/api/v1/users', {
        method: 'POST',
        headers: {
          'Authorization': 'Bearer YOUR_TOKEN',
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          name: 'Bob Johnson',
          email: 'bob@example.com',
          roles: ['editor']
        })
      });
      const newUser = await res.json();
  - lang: "Python"
    code: |
      import requests

      r = requests.post(
          'https://api.example.com/v1/users',
          headers={'Authorization': 'Bearer YOUR_TOKEN'},
          json={
              'name': 'Bob Johnson',
              'email': 'bob@example.com',
              'roles': ['editor']
          }
      )
      new_user = r.json()
---

Create a new user within your organization. The new user will receive a welcome email (unless `sendInvite` is set to `false`).

{{< callout type="note" >}}
Email addresses must be unique per organization. If you try to create a user with an existing email, you will receive a `409 Conflict` response.
{{< /callout >}}
