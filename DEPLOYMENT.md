# Deployment Guide

## Commands to Publish a New Version

```bash
# 1. Make your code changes in src/

# 2. Build
pnpm run build

# 3. Create a changeset
pnpm changeset
# Select: patch (bug fix), minor (new feature), or major (breaking change)
# Write a brief description

# 4. Version the package (this creates the git tag automatically)
pnpm changeset version

# 5. Commit and push
git add .
git commit -m "chore: release v1.X.X"
git push origin master
git push --tags

# Done! Your code is live on CDN within 2-3 minutes
```

## Webflow URLs

**For Development (auto-updates):**
```html
<script src="https://cdn.jsdelivr.net/gh/Granite-Marketing/pier-point-webflow@master/dist/index.js"></script>
```

**For Production (version-locked):**
```html
<script src="https://cdn.jsdelivr.net/gh/Granite-Marketing/pier-point-webflow@v1.0.29/dist/index.js"></script>
```
Update the version number when you release.

## Troubleshooting

**CDN returns 404:** Wait 2-3 minutes after pushing tags, jsDelivr needs time to index.

**CDN not updating:** Wait 5 minutes or purge cache at https://www.jsdelivr.com/tools/purge

**Forgot to push tags:** Run `git push --tags`
