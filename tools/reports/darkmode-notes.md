# Dark-Mode Swap Mechanism Notes

## Prefixes Updated
✅ Updated `src/layouts/Layout.astro` swapDarkModeImages() function with 28 total prefixes (was 9):

**eQMS Series (9):**
- anc-, aia-, aet-, aoe-, amr-, arm-, asq-, atrc-, akos-

**Workflow Series (19):**
- wfa-, wfb-, wfc-, wfd-, wfe-, wfg-, wfh-, wfi-, wfj-, wfk-, wfl-, wfm-, wfn-, wfp-, wfq-, wfr-, wft-, wfv-, wfx-

## Technical Issue: Hash-Based Image Names

### Problem
Images in dist/ are compiled with Astro's hash suffix:
- **Light version**: `wfb-01-same-data-different-meaning-vi.BLAw6xy6_1hXqKS.svg`
- **Dark version**: `wfb-01-same-data-different-meaning-vi-dark.BLAw6xy6_1hXqKS.svg`

The current swap mechanism uses:
```javascript
targetSrc = originalSrc.replace(/\.(svg|png)$/, '-dark.$1');
// Input:  wfb-01-...vi.BLAw6xy6_1hXqKS.svg
// Would produce: wfb-01-...vi.BLAw6xy6_1hXqKS-dark.svg (WRONG!)
```

### Expected vs Actual
- **Expected light→dark**: `wfb-01-...vi.HASH.svg` → `wfb-01-...vi-dark.HASH.svg`
- **Current regex would produce**: `wfb-01-...vi.HASH-dark.svg` (hash in wrong position)

### Verification
- ✅ Dark images ARE being built/optimized by Astro (28 pairs found in dist/_astro)
- ❌ Regex replacement logic cannot map light↔dark with Astro's hash naming scheme

### Recommendation
The swap mechanism needs to handle Astro's hash-based naming:
1. Extract `filename` and `hash` separately from `filename.HASH.ext`
2. Swap `-dark` from/to filename portion only: `filename-dark.HASH.ext`
3. Or use attribute-based toggling (data-light/data-dark) instead of src replacement

## Notes
- console.log statement remains in code (line 95: `console.log('[dark-mode-swap]...')`)
- All 28 prefixes now included and covered by images in build output
- No images will actually swap due to regex incompatibility with Astro's hash naming
