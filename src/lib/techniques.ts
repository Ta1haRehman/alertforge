import type { Technique } from './types'

// Load every technique JSON at build time from the repo-root data/ folder.
// The leading "/" makes the glob relative to the Vite project root (the repo root),
// where data/ lives. Add a new file to data/techniques/ and it appears here — no code change.
const modules = import.meta.glob('/data/techniques/*.json', { eager: true })

export const techniques: Technique[] = Object.values(modules)
  .map((m) => (m as { default: Technique }).default)
  .sort((a, b) => a.title.localeCompare(b.title))

export function getTechnique(slug: string): Technique | undefined {
  return techniques.find((t) => t.slug === slug)
}

export const CATEGORY_LABELS: Record<Technique['category'], string> = {
  wireless: 'Wireless',
  'active-directory': 'Active Directory',
  web: 'Web / API',
  host: 'Host',
  network: 'Network',
  cloud: 'Cloud',
}
