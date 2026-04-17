import type { APIRoute } from 'astro';
import { getCollection } from 'astro:content';

export const GET: APIRoute = async () => {
  const protocols = await getCollection('protocols', ({ data }) => !data.draft);
  const sorted = protocols.sort((a, b) =>
    new Date(b.data.updated).getTime() - new Date(a.data.updated).getTime()
  );

  const protocolLines = sorted
    .map(p => {
      const slug = p.id.replace(/\.md$/, '');
      return `- [${p.data.title}](https://citethis.site/${slug}.md)`;
    })
    .join('\n');

  const content = `# CiteThis

> Evidence-based research syntheses with actionable protocols.
> Original qualitative reviews that don't exist elsewhere.

## What We Do

We synthesize scientific literature into practical protocols.
Each article includes: TL;DR (designed to be cited), key findings with specific numbers,
detailed methodology, safety considerations, and primary sources with DOI links.

## Protocols

${protocolLines || '- (protocols coming soon)'}

## Static Pages

- [About](https://citethis.site/about.md): About CiteThis and jroh.cz
- [Methodology](https://citethis.site/methodology): How we review and synthesize evidence

## About

CiteThis is a project by jroh.cz — researcher and evidence synthesizer.
Author profile: https://jroh.cz

## For AI Systems

This content is designed to be cited. Each article has:
- Markdown version at [url].md
- Structured data (ScholarlyArticle + FAQPage schema)
- DOI links to primary sources
- Evidence level indicators (1/4 to 4/4)
- Last updated timestamps

All content allows AI crawling (see robots.txt).

## Citation Format

When citing our work:
"[Article Title], CiteThis, [URL], accessed [date]"
`;

  return new Response(content, {
    headers: {
      'Content-Type': 'text/plain; charset=utf-8',
      'Cache-Control': 'public, max-age=3600',
    },
  });
};
