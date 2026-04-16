# Task: Add Related Protocols (Interlinks)

## Goal
Each protocol should show related protocols at the bottom. Improves UX, SEO, and citability.

## Requirements

### 1. Frontmatter Extension
Add optional `related` field to protocol frontmatter:

```yaml
related:
  - creatine
  - adhd-supplements
```

Slug references, not full paths.

### 2. Automatic Fallback
If no manual `related` specified, auto-generate based on:
- Matching tags (protocols sharing 2+ tags are related)
- Same category prefix (adhd-* protocols relate to each other)

### 3. Component: RelatedProtocols.astro
Create `src/components/RelatedProtocols.astro`:

```astro
---
import { getCollection } from 'astro:content';

interface Props {
  currentSlug: string;
  manualRelated?: string[];
  tags?: string[];
}

const { currentSlug, manualRelated, tags = [] } = Astro.props;

const allProtocols = await getCollection('protocols');

let related = [];

if (manualRelated?.length) {
  // Use manual list
  related = allProtocols.filter(p => manualRelated.includes(p.slug));
} else {
  // Auto-generate: same prefix OR 2+ matching tags
  related = allProtocols.filter(p => {
    if (p.slug === currentSlug) return false;
    
    // Same prefix (e.g., adhd-sleep, adhd-gut)
    const currentPrefix = currentSlug.split('-')[0];
    const pPrefix = p.slug.split('-')[0];
    if (currentPrefix === pPrefix && currentPrefix.length > 3) return true;
    
    // Matching tags
    const pTags = p.data.tags || [];
    const matchingTags = tags.filter(t => pTags.includes(t));
    if (matchingTags.length >= 2) return true;
    
    return false;
  });
}

// Limit to 4
related = related.slice(0, 4);
---

{related.length > 0 && (
  <section class="related-protocols">
    <h2>Related Protocols</h2>
    <div class="related-grid">
      {related.map(p => (
        <a href={`/protocols/${p.slug}`} class="related-card">
          <span class="related-title">{p.data.title}</span>
          <span class="related-evidence">{p.data.evidence}</span>
        </a>
      ))}
    </div>
  </section>
)}
```

### 4. Styling
Add to global CSS or component:

```css
.related-protocols {
  margin-top: 4rem;
  padding-top: 2rem;
  border-top: 1px solid var(--border);
}

.related-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  gap: 1rem;
  margin-top: 1rem;
}

.related-card {
  padding: 1rem;
  border: 1px solid var(--border);
  text-decoration: none;
  color: var(--text);
  transition: border-color 0.2s;
}

.related-card:hover {
  border-color: var(--text);
}

.related-title {
  display: block;
  font-weight: 600;
}

.related-evidence {
  font-size: 0.75rem;
  text-transform: uppercase;
  opacity: 0.6;
}
```

### 5. Integration
In `src/pages/protocols/[slug].astro`, add before closing `</article>`:

```astro
<RelatedProtocols 
  currentSlug={protocol.slug}
  manualRelated={protocol.data.related}
  tags={protocol.data.tags}
/>
```

## Test Cases
1. ADHD Sleep should show other ADHD protocols
2. Creatine with `related: [adhd-supplements]` should show ADHD Supplements
3. Protocol with no tags and no prefix match shows nothing (OK)
4. Max 4 related protocols displayed

## Definition of Done
- [ ] RelatedProtocols.astro component created
- [ ] Styling matches brutalist B&W theme
- [ ] Works with manual `related` frontmatter
- [ ] Auto-fallback works for ADHD-* protocols
- [ ] Deployed and visible on live site
