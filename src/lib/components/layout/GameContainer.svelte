<script lang="ts">
  import type { Snippet } from "svelte"

  import type { Color } from "$lib/utils/colors"

  import { setGameContainerContext } from "./gameContainerContext.svelte"
  import Navbar from "./Navbar.svelte"
  import PageBackground from "./PageBackground.svelte"

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
  class={[
    "relative overflow-hidden",
    "flex flex-col items-center",
    "h-full w-full max-w-md md:max-h-175",
    "mx-auto my-auto px-4 py-6",
    "rounded-2xl md:border md:border-white/10",
    "md:shadow-2xl",
  ]}
>
  {#if backgroundTop && backgroundBottom}
    <PageBackground top={backgroundTop} bottom={backgroundBottom} />
  {/if}
  <Navbar />
  <div class={["relative", "min-h-0 w-full flex-1"]}>
    {@render children()}
  </div>
</div>
