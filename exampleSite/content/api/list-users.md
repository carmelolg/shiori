---
title: "List Users"
date: 2025-01-01
draft: false
summary: "Returns a paginated list of all users in the organization."
type: "api"
weight: 10
method: "GET"
endpoint: "/api/v1/users"
section: "Users"
version: "v1"
auth: "Bearer Token"
tags: ["users", "list"]

parameters:
  query:
    - name: "page"
      type: "integer"
      required: false
      description: "Page number, starting from `1`. Default: `1`."
    - name: "limit"
      type: "integer"
      required: false
      description: "Number of results per page. Max: `100`. Default: `20`."
    - name: "sort"
      type: "string"
      required: false
      description: "Sort field. Allowed values: `name`, `email`, `createdAt`."
    - name: "order"
      type: "string"
      required: false
      description: "Sort direction. Allowed values: `asc`, `desc`. Default: `asc`."
  headers:
    - name: "Authorization"
      type: "string"
      required: true
      description: "Bearer token. Format: `Bearer <token>`."
    - name: "Accept"
      type: "string"
      required: false
      description: "Response format. Default: `application/json`."

responses:
  - code: "200"
    description: "List of users retrieved successfully."
    body: |
      {
        "data": [
          { "id": "usr_abc123", "name": "Alice", "email": "alice@example.com" }
        ],
        "meta": { "page": 1, "limit": 20, "total": 84 }
      }
  - code: "401"
    description: "Unauthorized. Missing or invalid Bearer token."
  - code: "403"
    description: "Forbidden. The token does not have the required `users:read` scope."

examples:
  - lang: "curl"
    code: |
      curl -X GET "https://api.example.com/v1/users?page=1&limit=20" \
        -H "Authorization: Bearer YOUR_TOKEN" \
        -H "Accept: application/json"
  - lang: "JavaScript"
    code: |
      const res = await fetch('/api/v1/users?page=1&limit=20', {
        headers: {
          'Authorization': 'Bearer YOUR_TOKEN'
        }
      });
      const { data, meta } = await res.json();
      console.log(`Found ${meta.total} users`);
  - lang: "Python"
    code: |
      import requests

      r = requests.get(
          'https://api.example.com/v1/users',
          params={'page': 1, 'limit': 20},
          headers={'Authorization': 'Bearer YOUR_TOKEN'}
      )
      payload = r.json()
      print(f"Found {payload['meta']['total']} users")
  - lang: "Java"
    code: |
      HttpClient client = HttpClient.newHttpClient();
      HttpRequest request = HttpRequest.newBuilder()
          .uri(URI.create("https://api.example.com/v1/users?page=1&limit=20"))
          .header("Authorization", "Bearer YOUR_TOKEN")
          .GET()
          .build();
      HttpResponse<String> response = client.send(request,
          HttpResponse.BodyHandlers.ofString());
---

Returns a paginated list of users belonging to your organization. Results are sorted by `createdAt` descending by default.

{{< callout type="tip" >}}
Use the `limit` parameter to control page size. For large organizations, keep the limit below `50` for best performance.
{{< /callout >}}
