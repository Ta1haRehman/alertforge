<script lang="ts">
  import type { Annotation } from '../types'

  let { rule, annotations }: { rule: string; annotations: Annotation[] } = $props()
</script>

<div class="overflow-hidden rounded-lg border border-slate-700 bg-slate-900/60">
  <pre class="overflow-x-auto p-4 text-sm leading-relaxed text-emerald-200"><code>{rule}</code></pre>
</div>

<ul class="mt-4 space-y-2">
  {#each annotations as a}
    <li class="flex gap-3 rounded-md border border-slate-800 bg-slate-900/40 p-3">
      <code class="shrink-0 rounded bg-slate-800 px-2 py-0.5 text-xs text-sky-300">{a.line}</code>
      <span class="text-sm text-slate-300">{a.explain}</span>
    </li>
  {/each}
</ul>
