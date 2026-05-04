---
title: "List Users"
date: 2024-01-01T00:00:00Z
draft: false
type: "api"
method: "GET"
endpoint: "/api/users"
deprecated: false
auth: "Bearer Token"
---

## Description

List all users with pagination support.

## Parameters

- `limit` (integer, optional) - Results per page (default: 20)
- `offset` (integer, optional) - Pagination offset (default: 0)

## Response

Returns an array of user objects.
