/* ─── Flashs de Noël ─────────────────────────────────────────────
 * Les modèles sont détectés automatiquement depuis src/assets/flashs/ :
 *   1_1.png, 1_2.png, 2_1.png…  → modèle _ visuel (ordre du carrousel)
 * Tout ce qui suit "1_2" est ignoré (ex. "1_2@4x-8.png").
 * Les images sont redimensionnées et converties en WebP au build.
 *
 * Réglages par modèle (réservé, tailles spécifiques) : voir OPTIONS.
 */

import type { ImageMetadata } from 'astro';

export interface FlashImage {
  src: ImageMetadata;
  alt: string;
}

export interface FlashSize {
  label: string;   // largeur, ex. "50 cm" (la hauteur suit les proportions du modèle)
  price: number;   // en euros
}

export interface Flash {
  n: number;
  images: FlashImage[];
  sizes: FlashSize[];
  reserve?: boolean; // true → grisé + tampon "Réservé", plus de bouton
}

// Formats par défaut : largeur, hauteur proportionnelle au modèle
const SIZES: FlashSize[] = [
  { label: 'S — 30 cm',  price: 50 },
  { label: 'M — 50 cm',  price: 80 },
  { label: 'L — 100 cm', price: 150 },
];

// Réglages par numéro de modèle, ex. { 2: { reserve: true }, 4: { sizes: [...] } }
const OPTIONS: Record<number, Partial<Pick<Flash, 'reserve' | 'sizes'>>> = {};

// ── Détection des fichiers ───────────────────────────────────────

const files = import.meta.glob<{ default: ImageMetadata }>(
  '../assets/flashs/*.{png,jpg,jpeg,webp}',
  { eager: true },
);

const byModel = new Map<number, { v: number; src: ImageMetadata }[]>();

for (const [key, mod] of Object.entries(files)) {
  const name = key.split('/').pop()!;
  const match = name.match(/^(\d+)_(\d+)/);
  if (!match) continue;
  const [n, v] = [Number(match[1]), Number(match[2])];
  if (!byModel.has(n)) byModel.set(n, []);
  byModel.get(n)!.push({ v, src: mod.default });
}

export const flashs: Flash[] = [...byModel.entries()]
  .sort(([a], [b]) => a - b)
  .map(([n, imgs]) => ({
    n,
    images: imgs
      .sort((a, b) => a.v - b.v)
      .map((img, i) => ({ src: img.src, alt: `Flash de Noël #${n} — visuel ${i + 1}` })),
    sizes: SIZES,
    ...OPTIONS[n],
  }));
