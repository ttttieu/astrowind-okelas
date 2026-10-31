# Dark-Mode Swap Mechanism — BROKEN

## Current Status: ❌ NOT FUNCTIONAL

Dark-mode image swapping is **completely non-functional** due to Astro's hash-based image naming.

## Evidence

### 1. Image Storage Location
```
✓ All -dark images in: src/assets/images/insights/ (subdirectories)
✓ NOT in public/ directory
✓ Astro optimizes all images with hash naming during build
```

### 2. Hash Mismatch Problem

**Example article:** `nonconformance-iso-9001` (VI version)

Light version in HTML:
```
src="/_astro/anc-01-zero-ncr-vi.Bz_-h3W3_1IckGn.svg"
```

Dark version in dist/_astro:
```
/_astro/anc-01-zero-ncr-vi-dark.DxZsx37h.svg
```

**Hashes are DIFFERENT:**
- Light: `Bz_-h3W3_1IckGn`
- Dark: `DxZsx37h`

### 3. Deployed Site Test
✓ Checked https://www.okelas.com/insights/compliance/nonconformance-iso-9001/
- HTML references light versions only
- Dark versions NOT referenced
- **Conclusion: Dark-mode swap doesn't work on deployed site**

## Why Swap Fails

Current regex in Layout.astro (line 108):
```javascript
targetSrc = originalSrc.replace(/\.(svg|png)$/, '-dark.$1');
// Example:
// Input:  /_astro/anc-01-zero-ncr-vi.Bz_-h3W3_1IckGn.svg
// Output: /_astro/anc-01-zero-ncr-vi.Bz_-h3W3_1IckGn-dark.svg ❌
// Actual:  /_astro/anc-01-zero-ncr-vi-dark.DxZsx37h.svg (wrong hash!)
```

The regex can't handle:
1. **Different hashes** between light/dark versions
2. **Hash position** (before extension) that breaks string replacement
3. **Filename-to-filename mapping** where `-dark` goes in middle, not at end

## Proposed Solutions

### **Option A: CSS Display Toggle (Recommended)**

**Approach:** Keep both images, use CSS classes to toggle visibility

```html
<!-- Light version -->
<img src="anc-01.HASH1.svg" class="hidden dark:block" alt="...">
<!-- Dark version -->
<img src="anc-01-dark.HASH2.svg" class="dark:hidden" alt="...">
```

**Pros:**
- No JavaScript needed
- Astro plugins (remark/rehype) can automatically wrap images during build
- 0 runtime overhead
- Works immediately with Tailwind `dark:` classes

**Cons:**
- Doubles image tags in HTML (+10-20KB for ~50 articles with 5 images each)
- Both images loaded in browser (but only 1 displayed)
- Requires plugin to automatically generate both versions

**Files affected:** ~50 articles with dual-image images (220+ KB added to total HTML)

### **Option B: Static Asset Mapping (Complex)**

**Approach:** Generate manifest at build time mapping light→dark hashes

```javascript
// decap:
const imageMap = {
  'anc-01.Bz_-h3W3_1IckGn.svg': 'anc-01-dark.DxZsx37h.svg',
  'aia-02.HASH3.svg': 'aia-02-dark.HASH4.svg',
  // ... 100+ mappings
};

// Runtime:
targetSrc = imageMap[originalSrc.split('/').pop()] || originalSrc;
```

**Pros:**
- Single image in HTML
- Swap works correctly with correct hashes

**Cons:**
- Complex build setup (manifest generation)
- Fragile (breaks if file hashes change)
- Requires maintenance when images updated
- ~5-10KB manifest overhead per page

**Files affected:** Build pipeline modification needed

## Recommendation

**Use Option A (CSS Toggle):**
- Simpler to implement
- Works immediately
- Leverages existing Tailwind infrastructure
- No maintenance overhead
- ~220KB one-time HTML increase (acceptable for 50 articles)

## Decision on Prefix Expansion

**Revert commit b985a59** (added wf* prefixes):
- Expanding prefixes is meaningless if swap doesn't work
- wf* images were added but won't actually swap in dark mode
- Better to wait until mechanism is fixed, then add prefixes

Next step: Implement Option A with remark plugin to auto-wrap images in dual-display structure.
