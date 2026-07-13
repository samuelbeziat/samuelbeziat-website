import { defineCollection, z } from 'astro:content';

const imageSchema = z.object({
  src: z.string().default(''),
  alt: z.string(),
});

const blockSchema = z.object({
  layout: z.enum(['full', 'duo', 'trio', 'square', 'half-right', 'half-right-natural', 'duo-fill-right', 'duo-one-third', 'centered']),
  images: z.array(imageSchema),
});

const projects = defineCollection({
  type: 'content',
  schema: z.object({
    title:           z.string(),
    year:            z.number(),
    hidden:          z.boolean().default(false),
    badge:           z.boolean().default(false),
    tags:            z.array(z.string()),
    tags_en:         z.array(z.string()).optional(),
    description:     z.string(),
    description_en:  z.string().optional(),
    cover:           z.string().default(''),
    order:           z.number(),
    location:        z.string().optional(),
    blocks:          z.array(blockSchema).default([]),
  }),
});

export const collections = { projects };
