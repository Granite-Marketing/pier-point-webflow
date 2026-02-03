# Deployment Guide

This project uses **jsDelivr CDN** with **GitHub Releases** for automatic deployment to Webflow.

## Quick Start

1. Make code changes
2. Build locally: `pnpm run build`
3. Create a changeset: `pnpm changeset`
4. Version and release: `pnpm changeset version`
5. Push to GitHub
6. Your code is automatically available via CDN!

---

## Deployment Process

### Step 1: Make Your Code Changes

Edit files in the `src/` directory as needed.

### Step 2: Build Locally (Optional but Recommended)

```bash
pnpm run build
```

This creates the `dist/index.js` file that will be served via CDN.

### Step 3: Create a Changeset

A changeset describes what changed and determines the version bump:

```bash
pnpm changeset
```

You'll be prompted to:
- **Select version bump type:**
  - `patch` (1.0.28 → 1.0.29) - Bug fixes, small changes
  - `minor` (1.0.28 → 1.1.0) - New features, backward compatible
  - `major` (1.0.28 → 2.0.0) - Breaking changes
- **Write a description:** What changed in this release

This creates a file in `.changeset/` directory.

### Step 4: Version Your Package

When ready to release, run:

```bash
pnpm changeset version
```

This will:
- Bump the version in `package.json`
- Update `CHANGELOG.md`
- Delete the changeset file

### Step 5: Commit and Push

```bash
git add .
git commit -m "chore: release v1.0.29"
git push origin master
```

### Step 6: GitHub Actions Takes Over

Once pushed, GitHub Actions automatically:
1. Creates a "Version Packages" pull request (if changesets exist)
2. When you merge that PR, it creates a GitHub Release
3. Builds your project
4. Uploads `dist/index.js` to the release

---

## CDN URLs

### Format Options

**Latest version (auto-updates):**
```
https://cdn.jsdelivr.net/gh/Granite-Marketing/pier-point-webflow@master/dist/index.js
```
✅ Always uses the most recent code from master branch
⚠️ May cause unexpected changes if you forget to test

**Specific version (recommended for production):**
```
https://cdn.jsdelivr.net/gh/Granite-Marketing/pier-point-webflow@v1.0.29/dist/index.js
```
✅ Locked to a specific version
✅ More stable and predictable
✅ You control when to update

**Specific commit (for testing):**
```
https://cdn.jsdelivr.net/gh/Granite-Marketing/pier-point-webflow@a1b2c3d/dist/index.js
```

---

## Updating Webflow

### For Development/Staging (Auto-updates)

Use the `@master` branch URL in Webflow's custom code:

```html
<!-- Project Settings → Custom Code → Footer Code -->
<script src="https://cdn.jsdelivr.net/gh/Granite-Marketing/pier-point-webflow@master/dist/index.js"></script>
```

Every time you push to master, Webflow will get the latest code (within ~5 minutes due to CDN caching).

### For Production (Version-locked)

Use a specific version tag:

```html
<script src="https://cdn.jsdelivr.net/gh/Granite-Marketing/pier-point-webflow@v1.0.29/dist/index.js"></script>
```

**When you release a new version:**
1. Test it with the new version URL in staging
2. Update the version number in Webflow's production site
3. Publish the Webflow site

---

## Common Workflows

### Hot Fix (Quick Bug Fix)

```bash
# Fix the bug in your code
pnpm run build

# Create a patch changeset
pnpm changeset
# Select: patch
# Describe: "Fix button click handler"

# Version and release
pnpm changeset version
git add .
git commit -m "chore: release v1.0.29"
git push origin master
```

Your fix will be live via CDN within 5 minutes.

### New Feature

```bash
# Build your feature
pnpm run build

# Create a minor changeset
pnpm changeset
# Select: minor
# Describe: "Add new gallery animation"

# Version and release
pnpm changeset version
git add .
git commit -m "chore: release v1.1.0"
git push origin master
```

### Multiple Changes Before Release

You can create multiple changesets before releasing:

```bash
# After first change
pnpm changeset
git add .changeset
git commit -m "Add changeset for feature A"
git push

# After second change
pnpm changeset
git add .changeset
git commit -m "Add changeset for feature B"
git push

# When ready to release everything
pnpm changeset version
git add .
git commit -m "chore: release v1.2.0"
git push
```

---

## Troubleshooting

### CDN Not Updating

**Issue:** You pushed code but jsDelivr still serves old version.

**Solutions:**
1. **Wait 5 minutes** - jsDelivr has a cache that takes time to update
2. **Purge the cache manually:** Visit https://www.jsdelivr.com/tools/purge and enter your URL
3. **Use version tags** instead of `@master` to avoid cache issues

### 404 Error on CDN URL

**Issue:** CDN returns "Not Found"

**Check:**
1. Is the repo public? (jsDelivr only works with public repos)
2. Does the file exist at that path in GitHub?
3. Did you wait 2-3 minutes after making the repo public?

### GitHub Actions Failing

**Issue:** Workflow fails with "changesets not found"

**Solution:**
1. Make sure you created a changeset: `pnpm changeset`
2. Make sure changeset files exist in `.changeset/` directory
3. Commit and push the changeset files before running `changeset version`

### Wrong Version in Webflow

**Issue:** Webflow is using an old version

**Solution:**
1. Check the version number in your script tag
2. Update to the new version: `@v1.0.29` → `@v1.0.30`
3. Publish the Webflow site (changes aren't live until you publish)

---

## Version History

Check `CHANGELOG.md` for a complete version history.

Check GitHub Releases for downloadable assets: https://github.com/Granite-Marketing/pier-point-webflow/releases

---

## No More npm!

This project **no longer publishes to npm**. We use jsDelivr + GitHub instead because:
- ✅ No token management
- ✅ No 2FA headaches
- ✅ No 90-day token expiration
- ✅ Works with private repos (via GitHub Releases)
- ✅ Free, fast, globally distributed CDN
- ✅ Zero maintenance

All deployment happens through Git commits and GitHub Actions.
