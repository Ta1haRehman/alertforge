<script lang="ts">
  import { getTechnique } from './lib/techniques'
  import BrowseView from './lib/components/BrowseView.svelte'
  import TechniqueView from './lib/components/TechniqueView.svelte'

  // Tiny hash-based routing so each technique has a shareable URL (#/t/<slug>).
  function slugFromHash(): string | null {
    const m = location.hash.match(/^#\/t\/([a-z0-9-]+)$/)
    return m ? m[1] : null
  }

  let currentSlug = $state<string | null>(slugFromHash())

  $effect(() => {
    const onHash = () => (currentSlug = slugFromHash())
    window.addEventListener('hashchange', onHash)
    return () => window.removeEventListener('hashchange', onHash)
  })

  function open(slug: string) {
    location.hash = `#/t/${slug}`
  }
  function back() {
    location.hash = ''
  }

  let technique = $derived(currentSlug ? getTechnique(currentSlug) : undefined)
</script>

<div class="min-h-screen">
  <header class="border-b border-slate-800">
    <div class="mx-auto max-w-3xl px-5 py-5">
      <button class="text-left" onclick={back}>
        <h1 class="text-lg font-bold text-white">
          Alert<span class="text-sky-400">Forge</span>
        </h1>
        <p class="text-xs text-slate-500">From attack → trace → detection → fix</p>
      </button>
    </div>
  </header>

  <main class="px-5 py-8">
    {#if currentSlug && technique}
      <TechniqueView {technique} onback={back} />
    {:else if currentSlug && !technique}
      <div class="mx-auto max-w-3xl text-center">
        <p class="py-12 text-slate-400">No technique found for “{currentSlug}”.</p>
        <button class="text-sky-400 hover:underline" onclick={back}>← Back to all techniques</button>
      </div>
    {:else}
      <BrowseView onselect={open} />
    {/if}
  </main>

  <footer class="mx-auto max-w-3xl px-5 py-10 text-center text-xs text-slate-600">
    AlertForge explains attacks; it never runs them. For defensive and educational use.
  </footer>
</div>
