<script lang="ts">
  import type { Snippet } from "svelte"

  import PageBackground from "$lib/components/layout/PageBackground.svelte"
  import type { Color } from "$lib/utils/colors"

  import { setGameContainerContext } from "./gameContainerContext.svelte"

  let {
    children,
  }: {
    children: Snippet
  } = $props()

  let backgroundTop = $state<Color | undefined>(undefined)
  let backgroundBottom = $state<Color | undefined>(undefined)

  function setBackground(top: Color, bottom: Color) {
    backgroundTop = top
    backgroundBottom = bottom
  }

  setGameContainerContext({
    get backgroundTop() {
      return backgroundTop
    },
    get backgroundBottom() {
      return backgroundBottom
    },
    setBackground,
  })
</script>

<div
  class="relative mx-auto my-auto flex h-full max-h-175 w-full max-w-md flex-col items-center gap-6 overflow-hidden rounded-2xl px-4 py-6 md:border md:border-white/10 md:shadow-2xl"
>
  {#if backgroundTop && backgroundBottom}
    <PageBackground top={backgroundTop} bottom={backgroundBottom} />
  {/if}
  {@render children()}
</div>
