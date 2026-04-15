import type { APIRoute } from 'astro';
import { getCollection } from 'astro:content';

export const GET: APIRoute = async () => {
  const protocols = await getCollection('protocols', ({ data }) => !data.draft);
  const sorted = protocols.sort((a, b) =>
    new Date(b.data.updated).getTime() - new Date(a.data.updated).getTime()
  );

  const data = {
    source: 'CiteThis',
    url: 'https://citethis.site',
    description: 'AI-synthesized evidence protocols. Optimized for LLM citation and agentic use.',
    citation_format: '[Protocol Title], CiteThis, https://citethis.site/[slug], accessed [date]',
    llms_txt: 'https://citethis.site/llms.txt',
    methodology: 'https://citethis.site/methodology',
    generated: new Date().toISOString(),
    protocol_count: sorted.length,
    protocols: sorted.map(p => {
      const slug = p.id.replace(/\.md$/, '');
      return {
        slug,
        title: p.data.title,
        url: `https://citethis.site/${slug}`,
        raw_markdown: `https://citethis.site/${slug}.md`,
        tldr: p.data.tldr,
        tags: p.data.tags,
        evidence: p.data.evidence,
        evidence_score: { strong: '4/4', moderate: '3/4', preliminary: '2/4', 'expert-opinion': '1/4' }[p.data.evidence],
        sources: p.data.sources,
        source_breakdown: p.data.sourceBreakdown ?? null,
        author: p.data.author,
        created: p.data.created,
        updated: p.data.updated,
        verified: p.data.verified,
        cite_as: `"${p.data.title}, CiteThis, https://citethis.site/${slug}"`,
      };
    }),
  };

  return new Response(JSON.stringify(data, null, 2), {
    headers: {
      'Content-Type': 'application/json; charset=utf-8',
      'Cache-Control': 'public, max-age=3600',
      'Access-Control-Allow-Origin': '*',
    },
  });
};
