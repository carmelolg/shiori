# Shiori — Hugo Documentation Theme

[![Hugo Version](https://img.shields.io/badge/Hugo-0.100.0+-blue)](https://gohugo.io/)
[![License](https://img.shields.io/badge/License-CC%20BY--NC--SA%204.0-blue)](LICENSE)

**Shiori** (栞) means *bookmark* or *page marker* in Japanese — a fitting name for a technical documentation theme.

A clean, professional Hugo theme for documenting software libraries, APIs, and technical systems. Built for developers who care about clarity.

**[Live Demo →](https://carmelolg.github.io/shiori/)**

---

## ✨ Features

- 📖 **API Reference** — Dedicated layout for HTTP endpoints with method badges, parameter tables, response codes, and multi-language code examples
- 🎨 **Dark Mode** — Auto-detect system preference with manual toggle, persisted in localStorage
- 🔍 **Client-side Search** — Fast in-page search powered by Hugo's JSON output, no external dependencies
- 🗂️ **Three Content Types** — `api`, `articles`, and `design` with purpose-built layouts
- 💡 **Callout Shortcodes** — Note, Warning, Danger, Tip boxes for better communication
- 📑 **Table of Contents** — Sticky right-sidebar TOC with active section tracking
- 🌍 **i18n Ready** — English and Italian built-in, easy to extend
- 📋 **Code Copy** — One-click copy button on all code blocks
- ⬅️ **Prev/Next Navigation** — Automatic navigation between pages in the same section
- 📱 **Responsive** — Mobile-first, collapsible sidebar

---

## 🚀 Quick Start

### 1. Install as Git Submodule

```bash
git submodule add https://github.com/carmelolg/shiori themes/shiori
```

### 2. Configure your site

Create or update `hugo.toml`:

```toml
baseURL      = "https://yourusername.github.io/your-lib/"
title        = "MyLib Docs"
theme        = "shiori"
languageCode = "en"

[params]
  description    = "Official documentation for MyLib"
  author         = "Your Name"
  version        = "1.0.0"
  github         = "https://github.com/yourusername/your-lib"
  editBaseURL    = "https://github.com/yourusername/your-lib/edit/main/docs/content"
  logoText       = "MyLib"

[markup]
  [markup.highlight]
    noClasses    = false
    lineNos      = true
    codeFences   = true

[outputs]
  home    = ["HTML", "RSS", "JSON"]
  section = ["HTML", "RSS"]
  page    = ["HTML"]
```

### 3. Create content

```
content/
├── _index.md            ← Home page
├── api/
│   ├── _index.md        ← API section index
│   ├── get-users.md     ← type: api
│   └── create-user.md   ← type: api
├── articles/
│   ├── _index.md
│   └── getting-started.md
└── design/
    ├── _index.md
    └── architecture.md
```

### 4. Preview locally

```bash
cd exampleSite
hugo server --themesDir ../..
```

---

## 📝 Content Types

### API Endpoints (`type: api`)

```yaml
---
title:       "Get User"
date:        2025-01-01
draft:       false
summary:     "Retrieve a user by their unique ID"
type:        "api"
method:      "GET"           # GET POST PUT PATCH DELETE
endpoint:    "/api/v1/users/{id}"
section:     "Users"
version:     "v1"
deprecated:  false
auth:        "Bearer Token"
tags:        ["users"]

parameters:
  path:
    - name: "id"
      type: "string"
      required: true
      description: "The user's unique identifier"
  query:
    - name: "include"
      type: "string"
      required: false
      description: "Related resources to include (e.g. `profile,roles`)"

responses:
  - code: "200"
    description: "User retrieved successfully"
  - code: "401"
    description: "Unauthorized"
  - code: "404"
    description: "User not found"

examples:
  curl: |
    curl -X GET https://api.example.com/v1/users/abc123 \
      -H "Authorization: Bearer YOUR_TOKEN"
  javascript: |
    const res = await fetch('/api/v1/users/abc123', {
      headers: { 'Authorization': 'Bearer YOUR_TOKEN' }
    });
    const user = await res.json();
  python: |
    import requests
    r = requests.get(
        'https://api.example.com/v1/users/abc123',
        headers={'Authorization': 'Bearer YOUR_TOKEN'}
    )
    user = r.json()
---
```

### Articles (`articles/`)

Standard markdown. Supports `toc: true` for right-sidebar table of contents.

### Design Documents (`design/`)

Architecture, data models, and system design docs. Supports `toc: true` and diagrams.

---

## 🎨 Shortcodes

### Callout

```markdown
{{< callout type="note" >}}
This is an informational note.
{{< /callout >}}

{{< callout type="warning" >}}
Watch out for this edge case.
{{< /callout >}}

{{< callout type="danger" >}}
Breaking change in v2.0.
{{< /callout >}}

{{< callout type="tip" >}}
Pro tip: use caching to speed things up.
{{< /callout >}}
```

### Badge

```markdown
{{< badge color="blue" >}}v2.0{{< /badge >}}
{{< badge color="green" >}}stable{{< /badge >}}
{{< badge color="red" >}}deprecated{{< /badge >}}
```

### Code Tabs

```markdown
{{< code-tabs >}}
{{< code-tab name="curl" >}}
curl -X GET https://api.example.com/v1/users
{{< /code-tab >}}
{{< code-tab name="JavaScript" >}}
const users = await fetch('/api/v1/users').then(r => r.json());
{{< /code-tab >}}
{{< /code-tabs >}}
```

---

## ⚙️ Configuration Reference

| Parameter | Type | Default | Description |
|-----------|------|---------|-------------|
| `params.description` | string | — | Site description for meta tags |
| `params.author` | string | — | Author name |
| `params.version` | string | — | Library version (shown in sidebar) |
| `params.github` | string | — | GitHub repository URL |
| `params.editBaseURL` | string | — | Base URL for "Edit on GitHub" links |
| `params.logoText` | string | site title | Text shown in sidebar header |
| `params.dateFormat` | string | `January 2, 2006` | Date format for articles |

---

## 🧪 Testing the Example Site

```bash
cd exampleSite
hugo server --themesDir ../..
# open http://localhost:1313
```

## 📦 Building for Production

```bash
hugo --minify
```

---

## 📄 License

Licensed under [CC BY-NC-SA 4.0](LICENSE) © carmelolg.
