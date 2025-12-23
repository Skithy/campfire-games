<script lang="ts">
  import type { Snippet } from "svelte"

  import PageBackground from "$lib/components/layout/PageBackground.svelte"
  import type { Color } from "$lib/utils/colors"

  let {
    children,
    backgroundTop,
    backgroundBottom,
  }: {
    children: Snippet
    backgroundTop?: Color
    backgroundBottom?: Color
  } = $props()
</script>

<div
  class="relative mx-auto my-auto flex h-full max-h-175 w-full max-w-md flex-col items-center gap-6 overflow-hidden rounded-2xl px-4 py-6 md:border md:border-white/10 md:shadow-2xl"
>
  {#if backgroundTop && backgroundBottom}
    <PageBackground top={backgroundTop} bottom={backgroundBottom} />
  {/if}
  {@render children()}
</div>
