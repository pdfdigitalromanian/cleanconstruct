# Tina CMS Integration Plan — CleanConstruct

## Overview

Add Tina CMS as a visual content editor for the blog, allowing a writer to
create and manage posts through a browser-based admin panel. Content stays as
JSON files in the Git repo — no database changes, no new SQL, no data migration.

The writer logs in with GitHub via TinaCloud and edits posts at `/admin`.

---

## Architecture

```
Writer → /admin (TinaCloud UI) → edits JSON → commits to Git → Vercel deploys
                                                              ↓
                                              import.meta.glob reads JSON
                                                              ↓
                                              React app renders posts
```

Tina is an **editorial tool only** — it is not called at runtime. The app reads
content from `content/posts/*.json` exactly as it does today.

### Why This Approach

The project was migrated from WordPress to React (Vite + React 19 + React Router 7).
Posts were originally exported from WordPress as JSON files into `content/posts/`.
A Supabase database was added as a runtime fallback for content delivery.

Tina CMS replaces the WordPress editing experience. The writer gets a visual
editor at `/admin` that writes directly to the same JSON files the app already
reads. No new data pipeline, no new database tables, no migration scripts.

This pattern is the same one used in the `digitalromanian` project — Tina as
editor-only, content loaded at build time by Vite's `import.meta.glob`.

---

## Decisions Log

| Decision | Choice | Why This Choice | What Was Rejected | Why Rejected |
|----------|--------|-----------------|-------------------|--------------|
| Content format | JSON (unchanged) | Existing 9 posts are already JSON. `import.meta.glob` reads them. No migration needed. | Markdown with frontmatter | Would require converting all 9 posts and changing the data loading pipeline |
| Auth provider | TinaCloud (managed) | Free tier covers this use case. Writer just needs a GitHub account. No server/auth code to maintain. | Self-hosted auth (Auth.js, Clerk) | Requires database for sessions, serverless function for backend, GitHub OAuth app setup — overkill for a single writer |
| Login method | GitHub OAuth | Default TinaCloud login. Writer authenticates via GitHub. Developer manages access from TinaCloud dashboard. | Email/password, magic links | TinaCloud doesn't support these natively — GitHub OAuth is the built-in option |
| Categories field | `list` type | Writer adds/removes category tags via click UI. No typos possible. Cleaner than free-text. | `string` type (comma-separated) | Risk of typos creating duplicate categories ("Sfaturi" vs "sfaturi") |
| Image handling | `image` field (upload) | Writer uploads images through Tina's media browser. No typing file paths. Images committed to Git automatically. | String path field | Writing paths like `/assets/posts/image.webp` is tedious and error-prone for non-technical users |
| Image optimization | None (accept any format) | Start simple. Writer uploads `.jpg`, `.png`, `.webp` — all work. Page speed is acceptable for a blog. | Auto-convert to `.webp` via `sharp` script | Adds build complexity. Can be added later if performance becomes an issue |
| `contentHtml` field | textarea (raw HTML) | Content came from WordPress as HTML. Writer is familiar with HTML in WordPress classic editor. Direct match. | Rich-text (Markdown) | Would require converting all 9 existing posts from HTML to Markdown. Breaks existing content. |
| Supabase | Untouched | Existing runtime fallback. Posts table still works. No reason to remove it. | Remove Supabase | Would break the runtime fallback if Tina has issues |
| Visual editing | Not included (phase 1) | Tina admin at `/admin` is sufficient for a writer. Visual editing requires wrapping React components with `useTina()` — more invasive changes. | Contextual/visual editing | Would require modifying `PostPage.tsx`, `BlogPage.tsx`, and adding Tina provider wrappers |

---

## Prerequisites (Manual — Developer Must Do First)

### 1. Create TinaCloud Account
- Go to https://app.tina.io
- Sign up with email: `pdf@digitalromanian.com`
- Create a new project, link it to the cleanconstruct GitHub repo

### 2. Get Credentials
- From the TinaCloud dashboard, copy:
  - `TINA_CLIENT_ID`
  - `TINA_TOKEN`
- Add them to `.env`:
  ```
  TINA_CLIENT_ID=your_client_id
  TINA_TOKEN=your_token
  ```

### 3. Invite the Writer
- From TinaCloud dashboard → Project Collaborators
- Add the writer's GitHub account
- Writer logs in at `https://cleanconstruct.ro/admin` using GitHub OAuth

---

## Files Created

### `tina/config.ts`

The Tina collection schema. Maps 1:1 to the existing `Post` type in `src/types.ts`.

```ts
import { defineConfig } from "tinacms";

const branch =
  process.env.TINA_BRANCH ||
  process.env.GITHUB_BRANCH ||
  process.env.VERCEL_GIT_COMMIT_REF ||
  process.env.HEAD ||
  "main";

export default defineConfig({
  branch,
  clientId: process.env.TINA_CLIENT_ID || process.env.NEXT_PUBLIC_TINA_CLIENT_ID,
  token: process.env.TINA_TOKEN || process.env.NEXT_PUBLIC_TINA_TOKEN,

  build: {
    outputFolder: "admin",
    publicFolder: "public",
  },

  media: {
    tina: {
      mediaRoot: "assets/posts",
      publicFolder: "public",
    },
  },

  schema: {
    collections: [
      {
        name: "post",
        label: "Blog Posts",
        path: "content/posts",
        format: "json",
        fields: [
          {
            type: "string",
            name: "title",
            label: "Title",
            isTitle: true,
            required: true,
          },
          {
            type: "string",
            name: "slug",
            label: "Slug",
            required: true,
          },
          {
            type: "string",
            name: "excerpt",
            label: "Excerpt",
            required: true,
            ui: { component: "textarea" },
          },
          {
            type: "string",
            name: "contentHtml",
            label: "Content (HTML)",
            required: true,
            ui: { component: "textarea" },
          },
          {
            type: "datetime",
            name: "publishedAt",
            label: "Published At",
            required: true,
          },
          {
            type: "datetime",
            name: "modifiedAt",
            label: "Modified At",
            required: true,
          },
          {
            type: "string",
            name: "author",
            label: "Author",
            required: true,
          },
          {
            type: "list",
            name: "categories",
            label: "Categories",
            required: true,
            config: {
              allowCustom: true,
            },
          },
          {
            type: "image",
            name: "featuredImage",
            label: "Featured Image",
            required: true,
          },
          {
            type: "string",
            name: "featuredImageAlt",
            label: "Featured Image Alt Text",
            required: true,
          },
          {
            type: "number",
            name: "wordpressId",
            label: "WordPress ID",
          },
          {
            type: "string",
            name: "seoTitle",
            label: "SEO Title",
          },
          {
            type: "string",
            name: "seoDescription",
            label: "SEO Description",
            ui: { component: "textarea" },
          },
        ],
      },
    ],
  },
});
```

**Key decisions in this schema:**
- `format: "json"` — Tina writes the same JSON format the app already reads
- `categories` as `list` with `allowCustom: true` — writer can add new categories or pick existing ones
- `featuredImage` as `image` — opens Tina's media browser for file upload
- `contentHtml` as `string` with `textarea` — raw HTML, matching WordPress classic editor
- `wordpressId` as `number` — legacy field from WordPress migration, kept for reference
- No `seoTitle`/`seoDescription` required — optional SEO fields the writer can fill in

### `tina/.gitignore`

```
__generated__
```

Prevents auto-generated Tina schema lock files from being committed.

---

## Files Modified

### `package.json`

```diff
  "dependencies": {
+   "tinacms": "^3.7.4",
    ...
  },
  "devDependencies": {
+   "@tinacms/cli": "^2.2.4",
    ...
  },
  "scripts": {
+   "dev:tina": "tinacms dev -c \"vite\"",
    ...
  }
```

**Why these versions:** `tinacms@3.7.4` and `@tinacms/cli@2.2.4` are the latest
stable releases compatible with Node 22 (the project's minimum). The `dev:tina`
script runs Tina's dev server alongside Vite, making the admin panel available
at `localhost:3000/admin`.

### `.gitignore`

```diff
  node_modules
  dist
  .prerender
  .env
  .env.local
  .vercel
+ tina/__generated__
+ public/admin/index.html
+ public/admin/assets/
  *.log
  .DS_Store
  coverage
```

**Why ignore `public/admin/*`:** The Tina admin panel build output (`admin/index.html`
and `admin/assets/`) is generated by `tinacms build`. It should not be committed
to Git — it's rebuilt on each deployment.

### `.env.example`

```diff
  # Public browser credentials from Supabase Project Settings > API.
  VITE_SUPABASE_URL=https://YOUR_PROJECT.supabase.co
  VITE_SUPABASE_ANON_KEY=YOUR_SUPABASE_ANON_KEY
  ...
+ # TinaCMS (TinaCloud) – get these from https://app.tina.io
+ TINA_CLIENT_ID=YOUR_TINA_CLIENT_ID
+ TINA_TOKEN=YOUR_TINA_TOKEN
```

### `vercel.json`

```diff
  "redirects": [
    ...
+ ],
+ "rewrites": [
+   { "source": "/admin", "destination": "/admin/index.html" },
+   { "source": "/admin/(.*)", "destination": "/admin/index.html" }
  ],
  "headers": [
    ...
  ]
```

**Why rewrites:** The Tina admin panel is a single-page app served from
`public/admin/index.html`. Vercel needs rewrites to route `/admin/*` requests
to that file, otherwise refreshing the admin page returns a 404.

---

## Files NOT Changed

| File | Why No Change |
|------|--------------|
| `src/lib/posts.ts` | `import.meta.glob('../../content/posts/*.json', { eager: true })` already reads every JSON file in the directory. Tina writes to the same path and format. No code change needed. |
| `src/types.ts` | The `Post` type already matches the Tina schema fields exactly. |
| `content/posts/*.json` | Same 9 files, same format. Tina detects them automatically. |
| `src/lib/supabase.ts` | Untouched. Supabase remains as a runtime fallback for posts. |
| `src/lib/internalLinks.ts` | Untouched. Uses `localPosts` which comes from the same glob import. |
| `scripts/push-posts-to-supabase.mjs` | Untouched. Existing WordPress → JSON → Supabase pipeline preserved. |
| `scripts/export-wordpress-posts.mjs` | Untouched. One-time migration script, no longer actively used. |
| `src/pages/PostPage.tsx` | Untouched. Renders posts from the same data source. |
| `src/pages/BlogPage.tsx` | Untouched. Lists posts from the same data source. |
| `vercel.json` redirects | All existing redirects preserved. |

---

## Content Migration

**None required.** The 9 existing JSON files already match the Tina schema.

Verification: every JSON file in `content/posts/` must have these keys at the
top level:

```
wordpressId, slug, title, excerpt, contentHtml, publishedAt, modifiedAt,
author, categories, featuredImage, featuredImageAlt, seoTitle, seoDescription
```

If any key is missing, Tina will show a validation error when opening that post.
The existing `Post` type in `src/types.ts` enforces the same contract.

---

## Writer Workflow

### Accessing the Editor

**Local development:**
```bash
npm run dev:tina
# Opens at http://localhost:3000/admin
```

**Production (deployed):**
```
https://cleanconstruct.ro/admin
# Login with GitHub → see all posts → edit → save → auto-deploy
```

### Editing a Post
1. Click a post in the list
2. Edit any field: title, excerpt, categories (add/remove tags), featured image (upload)
3. Click **Save** — Tina writes the JSON file and commits to Git
4. Vercel detects the push and auto-deploys

### Creating a New Post
1. Click **+ Create** in the Tina sidebar
2. Fill in required fields (title, slug, excerpt, contentHtml, dates, author, categories, featured image)
3. Save — new JSON file created in `content/posts/`

### Uploading an Image
1. Click the "Featured Image" field
2. Tina opens the media browser
3. Drag & drop an image or pick from existing files in `public/assets/posts/`
4. Image file is committed to the Git repo
5. Any format accepted: `.jpg`, `.png`, `.webp`

---

## Rollback Plan

If Tina doesn't work out:

1. Remove `tinacms` and `@tinacms/cli` from `package.json`
2. Delete the `tina/` folder
3. Remove `dev:tina` script from `package.json`
4. Remove `/admin` rewrites from `vercel.json`
5. Remove `TINA_CLIENT_ID` and `TINA_TOKEN` from `.env` and `.env.example`
6. Remove `tina/__generated__` and `public/admin/*` from `.gitignore`

The blog continues working exactly as before — `import.meta.glob` reads JSON
files regardless of how they were created.

---

## Summary

| Metric | Value |
|--------|-------|
| Files created | 2 (`tina/config.ts`, `tina/.gitignore`) |
| Files modified | 4 (`package.json`, `.gitignore`, `.env.example`, `vercel.json`) |
| Files unchanged | 12 (all source code, content, scripts) |
| SQL changes | 0 |
| Data migration | 0 |
| Supabase changes | 0 |
| Dependencies added | 2 (`tinacms`, `@tinacms/cli`) |
| New npm scripts | 1 (`dev:tina`) |
| Writer access | GitHub OAuth via TinaCloud at `/admin` |
