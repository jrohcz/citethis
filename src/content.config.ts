import { defineCollection, z } from 'astro:content';
import { glob } from 'astro/loaders';

const protocols = defineCollection({
  loader: glob({ pattern: '**/*.md', base: './src/content/protocols' }),
  schema: z.object({
    title: z.string(),
    tags: z.array(z.string()),
    evidence: z.enum(['strong', 'moderate', 'preliminary', 'expert-opinion']),
    sources: z.number(),
    created: z.string(),
    updated: z.string(),
    verified: z.string(),
    author: z.string().default('Jakub Roh'),
    tldr: z.string(),
    draft: z.boolean().default(false),
  }),
});

export const collections = { protocols };
