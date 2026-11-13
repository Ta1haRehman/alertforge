// Mirrors data/schema.technique.json — the one contract everything conforms to.

export interface KeyField {
  field: string
  value?: string
  whyItMatters: string
}

export interface Annotation {
  line: string
  explain: string
}

export interface Technique {
  schemaVersion: number
  id: string
  slug: string
  title: string
  category: 'wireless' | 'active-directory' | 'web' | 'host' | 'network' | 'cloud'
  difficulty?: 'beginner' | 'intermediate' | 'advanced'
  orgId?: string | null
  attack: {
    tactic: string
    tacticId: string
    attackUrl: string
    summary: string
    representativeCommand?: string
    commandNote?: string
  }
  artifact: {
    source: string
    primaryEvent?: string
    keyFields: KeyField[]
    sampleLogLine?: string
  }
  detection: {
    format: 'sigma' | 'yara' | 'suricata' | 'kql' | 'spl' | 'eql'
    ruleTitle?: string
    source?: string
    sourceUrl?: string
    license?: string
    rule: string
    annotations: Annotation[]
  }
  falsePositives: string[]
  mitigation: {
    summary: string
    controls: string[]
    attackDefendRef?: string
  }
  relatedSlugs?: string[]
  tags?: string[]
}
