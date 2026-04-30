---
title: "Delete User"
date: 2025-01-01
draft: false
summary: "Permanently delete a user and all their associated data."
type: "api"
weight: 50
method: "DELETE"
endpoint: "/api/v1/users/{id}"
section: "Users"
version: "v1"
auth: "Bearer Token"
tags: ["users", "delete"]

parameters:
  path:
    - name: "id"
      type: "string"
      required: true
      description: "The unique identifier of the user to delete."
  headers:
    - name: "Authorization"
      type: "string"
      required: true
      description: "Bearer token with `users:delete` scope."

responses:
  - code: "204"
    description: "User deleted successfully. No body returned."
  - code: "401"
    description: "Unauthorized."
  - code: "403"
    description: "Forbidden. Insufficient permissions."
  - code: "404"
    description: "User not found."

examples:
  - lang: "curl"
    code: |
      curl -X DELETE "https://api.example.com/v1/users/usr_abc123" \
        -H "Authorization: Bearer YOUR_TOKEN"
  - lang: "JavaScript"
    code: |
      const res = await fetch('/api/v1/users/usr_abc123', {
        method: 'DELETE',
        headers: { 'Authorization': 'Bearer YOUR_TOKEN' }
      });
      if (res.status === 204) {
        console.log('User deleted');
      }
  - lang: "Python"
    code: |
      import requests

      r = requests.delete(
          'https://api.example.com/v1/users/usr_abc123',
          headers={'Authorization': 'Bearer YOUR_TOKEN'}
      )
      assert r.status_code == 204
---

Permanently deletes a user and all their associated resources. **This action cannot be undone.**

{{< callout type="danger" >}}
Deletion is **permanent and irreversible**. All user data, sessions, and owned resources will be removed. Consider deactivating the user instead if you need to preserve their data.
{{< /callout >}}
