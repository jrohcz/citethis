import type { APIRoute } from 'astro';
import { getCollection } from 'astro:content';

export async function getStaticPaths() {
  const protocols = await getCollection('protocols', ({ data }) => !data.draft);
  return protocols.map(p => {
    const slug = p.id.replace(/\.md$/, '');
    return {
      params: { slug },
      props: { protocol: p },
    };
  });
}

export const GET: APIRoute = async ({ props }) => {
  const { protocol } = props as any;
  const { title, tldr, tags, evidence, sources, created, updated, verified, author } = protocol.data;

  const frontmatter = [
    '---',
    `title: "${title}"`,
    `tags: [${tags.map((t: string) => `"${t}"`).join(', ')}]`,
    `evidence: ${evidence}`,
    `sources: ${sources}`,
    `created: ${created}`,
    `updated: ${updated}`,
    `verified: ${verified}`,
    `author: ${author}`,
    `tldr: "${tldr.replace(/"/g, '\\"')}"`,
    '---',
    '',
  ].join('\n');

  const rawBody = protocol.body ?? '';

  return new Response(frontmatter + rawBody, {
    headers: {
      'Content-Type': 'text/markdown; charset=utf-8',
      'Cache-Control': 'public, max-age=3600',
    },
  });
};
