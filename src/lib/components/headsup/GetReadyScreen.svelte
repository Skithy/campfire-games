<script lang="ts">
  import {
    getGameContainerContext,
    Orientation,
  } from "$lib/components/layout/gameContainerContext.svelte"
  import LandscapeNavbar from "$lib/components/layout/LandscapeNavbar.svelte"
  import { GREEN, PURPLE } from "$lib/constants/colors"
  import { requestGyroscopePermission } from "$lib/utils/sensors"

  let {
    onStart,
  }: {
    onStart: () => void
  } = $props()

  const ctx = getGameContainerContext()
  $effect(() => {
    ctx.setBackground(GREEN, PURPLE)
    ctx.setOrientation(Orientation.Landscape)
  })

  async function handleStart() {
    await requestGyroscopePermission()
    onStart()
  }
</script>

<div class="relative flex h-full w-full flex-row items-stretch gap-4">
  <LandscapeNavbar />

  <!-- Center: Instructions -->
  <div class="flex flex-1 flex-col items-center justify-center gap-4">
    <div class="space-y-1 text-center">
      <p class="text-xs font-medium tracking-widest text-white/60 uppercase">Get Ready</p>
      <h1 class="text-2xl font-black" style:color={GREEN.toRgb()}>Hold Phone to Forehead</h1>
      <p class="text-xs text-white/70">Screen faces outward so others can see</p>
    </div>

    <div class={["px-6 py-4", "text-center", "bg-white/5", "rounded-xl", "backdrop-blur-sm"]}>
      <div class="flex justify-center gap-6">
        <div class="flex flex-col items-center gap-1">
          <div
            class="flex h-12 w-12 items-center justify-center rounded-full"
            style:background-color={GREEN.toRgba(0.2)}
          >
            <i class="fa-solid fa-arrow-down text-lg" style:color={GREEN.toRgb()}></i>
          </div>
          <span class="text-xs text-white/70">Correct</span>
        </div>
        <div class="flex flex-col items-center gap-1">
          <div class="flex h-12 w-12 items-center justify-center rounded-full bg-white/10">
            <i class="fa-solid fa-arrow-up text-lg text-white/60"></i>
          </div>
          <span class="text-xs text-white/70">Skip</span>
        </div>
      </div>
    </div>
  </div>

  <!-- Right: Start button -->
  <div class="flex flex-col items-center justify-center">
    <button
      class={[
        "flex items-center justify-center",
        "h-16 w-16",
        "text-2xl text-white",
        "rounded-full",
        "cursor-pointer",
        "transition-transform hover:scale-105 active:scale-95",
      ]}
      style:background-color={GREEN.toRgb()}
      onclick={handleStart}
    >
      <i class="fa-solid fa-play"></i>
    </button>
  </div>
</div>
