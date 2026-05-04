---
title: "Get User"
date: 2025-01-01
draft: false
summary: "Retrieve a single user by their unique ID."
type: "api"
weight: 20
method: "GET"
endpoint: "/api/v1/users/{id}"
section: "Users"
version: "v1"
auth: "Bearer Token"
tags: ["users", "read"]

parameters:
  path:
    - name: "id"
      type: "string"
      required: true
      description: "The user's unique identifier (e.g. `usr_abc123`)."
  query:
    - name: "include"
      type: "string"
      required: false
      description: "Comma-separated list of related resources to embed. Allowed: `profile`, `roles`."
  headers:
    - name: "Authorization"
      type: "string"
      required: true
      description: "Bearer token. Format: `Bearer <token>`."

responses:
  - code: "200"
    description: "User found and returned."
    body: |
      {
        "id": "usr_abc123",
        "name": "Alice Smith",
        "email": "alice@example.com",
        "createdAt": "2024-03-15T10:30:00Z",
        "roles": ["admin", "editor"]
      }
  - code: "401"
    description: "Unauthorized."
  - code: "404"
    description: "User not found."

examples:
  - lang: "curl"
    code: |
      curl -X GET "https://api.example.com/v1/users/usr_abc123" \
        -H "Authorization: Bearer YOUR_TOKEN"
  - lang: "JavaScript"
    code: |
      const res = await fetch('/api/v1/users/usr_abc123', {
        headers: { 'Authorization': 'Bearer YOUR_TOKEN' }
      });
      if (!res.ok) throw new Error(`HTTP ${res.status}`);
      const user = await res.json();
  - lang: "Python"
    code: |
      import requests

      r = requests.get(
          'https://api.example.com/v1/users/usr_abc123',
          headers={'Authorization': 'Bearer YOUR_TOKEN'}
      )
      r.raise_for_status()
      user = r.json()
---

Retrieve the full details of a single user identified by `{id}`.
