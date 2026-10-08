# Dark Mode SVG Images — Implementation Guide

## Problem

SVG images embedded as `<img>` tags in Markdown **cannot access CSS variables from the parent page**. This means:

```markdown
![alt](~/assets/images/file.svg)  
↓ Rendered as:
<img src="/path/to/file.svg">  
↓ SVG is isolated, no access to parent CSS
```

Solutions like `@media (prefers-color-scheme: dark)` embedded in SVG only work if browser has system dark mode set — not controlled by page's `.dark` class.

## Why Not CSS Variables?

❌ **This doesn't work:**
```css
/* tailwind.css */
:root { --svg-bg: #FFFFFF; }
.dark { --svg-bg: #08090A; }

<!-- SVG uses: -->
<style>svg { --bg: var(--svg-bg); }</style>
```

→ SVG as `<img>` can't access parent's `--svg-bg` variable

## Solution: Create `-dark` Versions + JavaScript Swap

### 1. Create Dark SVG Versions

Create separate `-dark.svg` files with **hardcoded dark colors**:

```
anc-01-image.svg        (light mode - hardcoded light colors)
anc-01-image-dark.svg   (dark mode - hardcoded dark colors)
```

**PowerShell script to create dark versions:**

```powershell
$lightColors = @{
    'FFFFFF' = '08090A'
    '273244' = 'E5ECF6'
    '0B1220' = 'F7F8F8'
    # ... add all colors used in your SVGs
}

$basePath = "src/assets/images/insights/folder-name"
$svgFile = "image.svg"

$content = [System.IO.File]::ReadAllText("$basePath\$svgFile", [System.Text.Encoding]::UTF8)

foreach ($light in $lightColors.Keys) {
    $dark = $lightColors[$light]
    $content = $content -replace "#$light", "#$dark"
}

$utf8NoBom = New-Object System.Text.UTF8Encoding($false)
[System.IO.File]::WriteAllText("$basePath\$svgFile-dark.svg", $content, $utf8NoBom)
```

⚠️ **CRITICAL: Use UTF-8 without BOM to avoid encoding corruption!**

### 2. Add Swap Script to Layout

In `src/layouts/Layout.astro` (or your main layout):

```astro
<script>
  function swapDarkModeImages() {
    const isDark = document.documentElement.classList.contains('dark');
    // Match images with specific prefix (e.g., 'anc-', 'acapa-')
    const images = document.querySelectorAll('img[src*="PREFIX-"]');

    images.forEach((img) => {
      const src = img.getAttribute('src');
      if (!src) return;

      const isDarkVersion = src.includes('-dark.');
      let targetSrc;

      if (isDark && !isDarkVersion) {
        // Add -dark suffix
        targetSrc = src.replace(/\.(svg|png)$/, '-dark.$1');
      } else if (!isDark && isDarkVersion) {
        // Remove -dark suffix
        targetSrc = src.replace('-dark.', '.');
      } else {
        return;
      }

      img.setAttribute('src', targetSrc);
    });
  }

  // Run on load
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', swapDarkModeImages);
  } else {
    swapDarkModeImages();
  }

  // Run on theme change
  document.addEventListener('aw:theme-change', swapDarkModeImages);
</script>
```

### 3. Update Markdown References

Articles must reference the **light version** (script will swap to dark):

```markdown
![alt text](~/assets/images/insights/folder/image.svg)  ✅
![alt text](~/assets/images/insights/folder/image-dark.svg)  ❌
```

## Common Pitfalls

### ❌ Encoding Corruption in VI/CJK Files

**Problem:** Using `Set-Content` or `Out-File` without proper encoding damages UTF-8 text
```powershell
# ❌ Wrong - corrupts encoding
Set-Content $path $content -Encoding UTF8
```

**Solution:** Use proper UTF-8 without BOM
```powershell
# ✅ Correct
$utf8NoBom = New-Object System.Text.UTF8Encoding($false)
[System.IO.File]::WriteAllText($path, $content, $utf8NoBom)
```

### ❌ Wrong Selector in JavaScript

**Problem:** Selector too specific or doesn't match actual rendered paths
```javascript
// ❌ Doesn't work - image src might be `/assets/...` not `/anc-...`
document.querySelectorAll('img[src*="/anc-"]')
```

**Solution:** Use flexible selectors
```javascript
// ✅ Better - matches anywhere in src attribute
document.querySelectorAll('img[src*="anc-"]')
```

### ❌ Missing DOMContentLoaded

**Problem:** Script runs before images load
```javascript
// ❌ Might run too early
swapDarkModeImages();
```

**Solution:** Check readyState or wait for DOMContentLoaded
```javascript
// ✅ Proper handling
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', swapDarkModeImages);
} else {
  swapDarkModeImages();
}
```

## Testing Checklist

- [ ] Light versions display correctly in lightmode
- [ ] Dark versions exist for all images
- [ ] Dark versions have correct colors (hardcoded, not @media queries)
- [ ] Script finds images: Check console logs
- [ ] Images swap on toggle: Watch src attribute change in DevTools
- [ ] VI/CJK text displays correctly (no mojibake/corruption)
- [ ] No console errors

## Console Debugging

Add logging to help debug:

```javascript
function swapDarkModeImages() {
  const isDark = document.documentElement.classList.contains('dark');
  const images = document.querySelectorAll('img[src*="PREFIX-"]');
  
  console.log(`[PREFIX-swap] isDark=${isDark}, found ${images.length} images`);
  
  images.forEach((img) => {
    const src = img.getAttribute('src');
    const targetSrc = isDark ? src.replace(/\.svg$/, '-dark.svg') : src.replace('-dark.', '.');
    console.log(`[PREFIX-swap] ${src} → ${targetSrc}`);
    img.setAttribute('src', targetSrc);
  });
}
```

Then in browser F12 console, you'll see:
```
[PREFIX-swap] isDark=false, found 5 images
[PREFIX-swap] image-01.svg → image-01-dark.svg
...
```

## Real Examples from okelas.com

### ✅ Working: anc-nonconformance articles
- 10 SVG pairs (5 EN, 5 VI)
- Each has light + dark version
- JavaScript swaps on `.dark` class toggle
- Location: `src/assets/images/insights/anc-nonconformance/`

### ✅ Working: AI articles (alternative approach)
- Uses explicit `-dark` references in markdown
- Location: `src/assets/images/insights/ai-*/`
- Example: `wfp-01-three-activities-vi-dark.svg`

## Summary

| Approach | Pros | Cons |
|----------|------|------|
| CSS Variables | Clean, minimal files | ❌ Doesn't work with `<img>` tags |
| Embedded @media | Self-contained SVG | ❌ Only works with system preference |
| Separate -dark files + JS | Works reliably, explicit | Doubles file count, needs JS |

**Recommendation:** Use separate `-dark` files + JavaScript swap for all SVG images that need dark mode support.

---

**Last Updated:** 2026-10-08  
**Related Issues:** Dark mode image rendering in compliance articles
