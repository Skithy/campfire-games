<script lang="ts">
  import type { Snippet } from "svelte"

  import type { Color } from "$lib/utils/colors"

  import { setGameContainerContext } from "./gameContainerContext.svelte"
  import Navbar from "./Navbar.svelte"
  import PageBackground from "./PageBackground.svelte"
  import { setSettingsContext } from "./settingsContext.svelte"

  let {
    children,
  }: {
    children: Snippet
  } = $props()

  let backgroundTop = $state<Color | undefined>(undefined)
  let backgroundBottom = $state<Color | undefined>(undefined)

  let isMusicEnabled = $state(false)
  let isVibrationEnabled = $state(true)

  function setBackground(top: Color, bottom: Color) {
    backgroundTop = top
    backgroundBottom = bottom
  }

  function toggleMusic() {
    isMusicEnabled = !isMusicEnabled
  }

  function toggleVibration() {
    isVibrationEnabled = !isVibrationEnabled
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

  setSettingsContext({
    get isMusicEnabled() {
      return isMusicEnabled
    },
    get isVibrationEnabled() {
      return isVibrationEnabled
    },
    toggleMusic,
    toggleVibration,
  })
</script>

<div
  class={[
    "relative overflow-hidden",
    "flex flex-col items-center",
    "h-full w-full max-w-md md:max-h-175",
    "mx-auto my-auto px-4 py-6",
    "md:rounded-2xl md:border md:border-white/10",
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
