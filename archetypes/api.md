---
title: "{{ replace .File.ContentBaseName "-" " " | title }}"
date: {{ .Date }}
draft: false
summary: ""
type: "api"
method: "GET"
endpoint: "/api/v1/resource"
section: ""
version: "v1"
deprecated: false
auth: "Bearer Token"
tags: []

parameters:
  path: []
  query: []
  headers: []

responses:
  - code: "200"
    description: "Success"
  - code: "401"
    description: "Unauthorized"

examples:
  - lang: "curl"
    code: |
      curl -X GET https://api.example.com/v1/resource \
        -H "Authorization: Bearer YOUR_TOKEN"
  - lang: "JavaScript"
    code: |
      const res = await fetch('/api/v1/resource', {
        headers: { 'Authorization': 'Bearer YOUR_TOKEN' }
      });
      const data = await res.json();
  - lang: "Python"
    code: |
      import requests
      r = requests.get(
          'https://api.example.com/v1/resource',
          headers={'Authorization': 'Bearer YOUR_TOKEN'}
      )
      data = r.json()
---

<!-- VERSIONING NOTE: Place this file in content/{VERSION}/api/{endpoint}.md -->
<!-- Example: content/v2.3.1/api/get-user.md -->

Describe this endpoint here.
