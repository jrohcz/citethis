import { defineCollection, z } from 'astro:content';
import { glob } from 'astro/loaders';

const protocols = defineCollection({
  loader: glob({ pattern: '**/*.md', base: './src/content/protocols' }),
  schema: z.object({
    title: z.string(),
    tags: z.array(z.string()).transform(tags => tags.map(t => t.toLowerCase())),
    evidence: z.enum(['strong', 'moderate', 'preliminary', 'expert-opinion']),
    sources: z.number(),
    // Optional source breakdown: "3 meta-analyses, 8 RCTs, 12 observational, 24 supporting"
    sourceBreakdown: z.string().optional(),
    created: z.string(),
    updated: z.string(),
    verified: z.string(),
    author: z.string().default('Jakub Roh'),
    tldr: z.string(),
    draft: z.boolean().default(false),
    related: z.array(z.string()).optional(),
  }),
});

export const collections = { protocols };
