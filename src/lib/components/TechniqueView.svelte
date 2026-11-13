<script lang="ts">
  import type { Technique } from '../types'
  import { CATEGORY_LABELS } from '../techniques'
  import Panel from './Panel.svelte'
  import AnnotatedRule from './AnnotatedRule.svelte'

  let { technique, onback }: { technique: Technique; onback: () => void } = $props()
</script>

<article class="mx-auto max-w-3xl">
  <!-- Header -->
  <button
    class="mb-6 text-sm text-slate-400 transition hover:text-slate-200"
    onclick={onback}
  >
    ← All techniques
  </button>

  <div class="mb-8">
    <div class="mb-2 flex flex-wrap items-center gap-2 text-xs">
      <span class="rounded bg-slate-800 px-2 py-1 text-slate-300"
        >{CATEGORY_LABELS[technique.category]}</span
      >
      <a
        href={technique.attack.attackUrl}
        target="_blank"
        rel="noreferrer"
        class="rounded bg-sky-900/40 px-2 py-1 text-sky-300 hover:bg-sky-900/60"
        >{technique.id} · {technique.attack.tactic} ↗</a
      >
      {#if technique.difficulty}
        <span class="rounded bg-slate-800 px-2 py-1 text-slate-400">{technique.difficulty}</span>
      {/if}
    </div>
    <h1 class="text-3xl font-bold text-white">{technique.title}</h1>
  </div>

  <div class="space-y-4">
    <!-- 1. Attack -->
    <Panel step={1} title="The attack" accent="rose">
      <p class="leading-relaxed">{technique.attack.summary}</p>
      {#if technique.attack.representativeCommand}
        <div class="mt-3">
          <pre
            class="overflow-x-auto rounded-lg border border-slate-700 bg-slate-900/60 p-3 text-sm text-rose-200"><code
              >{technique.attack.representativeCommand}</code
            ></pre>
          {#if technique.attack.commandNote}
            <p class="mt-1 text-xs text-slate-500">{technique.attack.commandNote}</p>
          {/if}
        </div>
      {/if}
    </Panel>

    <!-- 2. Artifact -->
    <Panel step={2} title="The trace it leaves" accent="amber">
      <p class="text-sm text-slate-400">
        Source: <span class="text-slate-200">{technique.artifact.source}</span>
        {#if technique.artifact.primaryEvent}· {technique.artifact.primaryEvent}{/if}
      </p>
      <ul class="mt-3 space-y-2">
        {#each technique.artifact.keyFields as kf}
          <li class="rounded-md border border-slate-800 bg-slate-900/40 p-3">
            <code class="text-sm text-amber-300"
              >{kf.field}{#if kf.value}: {kf.value}{/if}</code
            >
            <p class="mt-1 text-sm text-slate-400">{kf.whyItMatters}</p>
          </li>
        {/each}
      </ul>
      {#if technique.artifact.sampleLogLine}
        <pre
          class="mt-3 overflow-x-auto rounded-lg border border-slate-700 bg-slate-900/60 p-3 text-xs text-slate-300"><code
            >{technique.artifact.sampleLogLine}</code
          ></pre>
      {/if}
    </Panel>

    <!-- 3. Detection -->
    <Panel step={3} title="The detection" accent="sky">
      {#if technique.detection.ruleTitle}
        <p class="mb-2 text-sm text-slate-400">
          {technique.detection.ruleTitle} · <span class="uppercase">{technique.detection.format}</span
          >
        </p>
      {/if}
      <AnnotatedRule rule={technique.detection.rule} annotations={technique.detection.annotations} />
      {#if technique.detection.source}
        <p class="mt-2 text-xs text-slate-500">
          Source: {technique.detection.source}{#if technique.detection.license} ({technique.detection
              .license}){/if}
        </p>
      {/if}
    </Panel>

    <!-- 4. False positives -->
    <Panel step={4} title="False positives" accent="orange">
      <ul class="list-inside list-disc space-y-1 text-sm">
        {#each technique.falsePositives as fp}
          <li>{fp}</li>
        {/each}
      </ul>
    </Panel>

    <!-- 5. Mitigation -->
    <Panel step={5} title="The fix" accent="emerald">
      <p class="mb-2 leading-relaxed">{technique.mitigation.summary}</p>
      <ul class="list-inside list-disc space-y-1 text-sm">
        {#each technique.mitigation.controls as c}
          <li>{c}</li>
        {/each}
      </ul>
      {#if technique.mitigation.attackDefendRef}
        <p class="mt-2 text-xs text-slate-500">Ref: {technique.mitigation.attackDefendRef}</p>
      {/if}
    </Panel>
  </div>
</article>
