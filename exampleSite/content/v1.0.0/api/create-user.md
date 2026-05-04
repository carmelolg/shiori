---
title: "Create User"
date: 2024-01-01T00:00:00Z
draft: false
type: "api"
method: "POST"
endpoint: "/api/users"
deprecated: false
auth: "Bearer Token"
---

## Description

Create a new user.

## Request Body

- `name` (string, required)
- `email` (string, required)
- `role` (string, optional)

## Response

Returns the created user object.
