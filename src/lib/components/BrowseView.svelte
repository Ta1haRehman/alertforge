<script lang="ts">
  import { techniques, CATEGORY_LABELS } from '../techniques'

  let { onselect }: { onselect: (slug: string) => void } = $props()

  let query = $state('')

  let filtered = $derived(
    techniques.filter((t) => {
      const q = query.trim().toLowerCase()
      if (!q) return true
      return (
        t.title.toLowerCase().includes(q) ||
        t.id.toLowerCase().includes(q) ||
        t.attack.tactic.toLowerCase().includes(q) ||
        t.artifact.source.toLowerCase().includes(q) ||
        (t.tags ?? []).some((tag) => tag.toLowerCase().includes(q))
      )
    }),
  )
</script>

<div class="mx-auto max-w-3xl">
  <input
    type="search"
    bind:value={query}
    placeholder="Search by name, ATT&CK ID, tactic, or artifact (e.g. 4769)…"
    class="mb-6 w-full rounded-lg border border-slate-700 bg-slate-900/60 px-4 py-2.5 text-slate-200 placeholder:text-slate-500 focus:border-sky-500 focus:outline-none"
  />

  {#if filtered.length === 0}
    <p class="py-12 text-center text-slate-500">No techniques match “{query}”.</p>
  {:else}
    <ul class="space-y-2">
      {#each filtered as t}
        <li>
          <button
            class="group w-full rounded-lg border border-slate-800 bg-slate-900/40 p-4 text-left transition hover:border-sky-600/50 hover:bg-slate-900/70"
            onclick={() => onselect(t.slug)}
          >
            <div class="flex items-center justify-between gap-3">
              <span class="font-semibold text-slate-100 group-hover:text-white">{t.title}</span>
              <span class="shrink-0 text-xs text-slate-500">{t.id}</span>
            </div>
            <div class="mt-1 flex flex-wrap gap-2 text-xs text-slate-400">
              <span class="rounded bg-slate-800 px-2 py-0.5">{CATEGORY_LABELS[t.category]}</span>
              <span>{t.attack.tactic}</span>
              <span class="text-slate-600">·</span>
              <span>{t.artifact.source}</span>
            </div>
          </button>
        </li>
      {/each}
    </ul>
  {/if}
</div>
