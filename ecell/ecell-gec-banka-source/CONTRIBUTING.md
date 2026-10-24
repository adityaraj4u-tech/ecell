# Contributing to GEC Banka E-Cell Website

Thanks for helping improve the campus Entrepreneurship Cell site.

## Branch naming

- `feat/<short-description>` — new features or sections
- `fix/<short-description>` — bug fixes
- `docs/<short-description>` — documentation only
- `chore/<short-description>` — tooling, deps, CI

## Commit style

Use [Conventional Commits](https://www.conventionalcommits.org/):

```
feat: add events calendar filters
fix: restore focus after modal close
docs: document Supabase table schemas
chore: bump eslint-config-next
```

## Workflow

1. Fork (or branch from `main` if you have write access).
2. Create a feature branch from an up-to-date `main`.
3. Make focused changes; keep content edits in `/data` when possible.
4. Run locally:
   ```bash
   npm install
   npm run lint
   npm run typecheck
   npm run build
   ```
5. Open a pull request against `main`.

## Pull request checklist

- [ ] `npm run lint` passes
- [ ] `npm run typecheck` passes
- [ ] `npm run build` passes
- [ ] No secrets or `.env` files committed
- [ ] Placeholder content still clearly marked where data is unverified
- [ ] UI checked at ~360px and ~1280px widths
- [ ] Keyboard access works for new interactive controls

## Content updates

Prefer editing files under `/data` (stats, events, mentors, gallery, etc.) rather than hard-coding copy in components. Mark unverified data with the existing `// PLACEHOLDER` comments.
