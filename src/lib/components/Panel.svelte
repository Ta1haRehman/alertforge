<script lang="ts">
  import type { Snippet } from 'svelte'

  let {
    step,
    title,
    accent = 'slate',
    children,
  }: {
    step: number
    title: string
    accent?: string
    children: Snippet
  } = $props()

  const accents: Record<string, string> = {
    rose: 'text-rose-300 border-rose-500/30',
    amber: 'text-amber-300 border-amber-500/30',
    sky: 'text-sky-300 border-sky-500/30',
    violet: 'text-violet-300 border-violet-500/30',
    orange: 'text-orange-300 border-orange-500/30',
    emerald: 'text-emerald-300 border-emerald-500/30',
    slate: 'text-slate-300 border-slate-600/40',
  }
</script>

<section class="rounded-xl border border-slate-800 bg-slate-900/40 p-5">
  <div class="mb-3 flex items-center gap-3">
    <span
      class="flex h-7 w-7 items-center justify-center rounded-full border text-sm font-semibold {accents[
        accent
      ]}"
    >
      {step}
    </span>
    <h2 class="text-sm font-semibold tracking-wide text-slate-200 uppercase">{title}</h2>
  </div>
  <div class="text-slate-300">
    {@render children()}
  </div>
</section>
