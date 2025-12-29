<script lang="ts">
  import { onMount } from "svelte"

  import {
    getGameContainerContext,
    Orientation,
  } from "$lib/components/layout/gameContainerContext.svelte"
  import LandscapeNavbar from "$lib/components/layout/LandscapeNavbar.svelte"
  import { GREEN, PURPLE } from "$lib/constants/colors"
  import { checkSensorPermissions, SensorPermissionStatus } from "$lib/utils/sensors"

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

  let hasTiltControls = $state(true)
  let instructionsReady = $state(false)

  onMount(async () => {
    const status = await checkSensorPermissions()
    hasTiltControls = status === SensorPermissionStatus.Granted
    instructionsReady = true
  })

  async function handleStart() {
    onStart()
  }
</script>

<div class="relative flex h-full w-full flex-row items-stretch gap-4">
  <LandscapeNavbar />

  <!-- Center: Instructions -->
  <div class="flex flex-1 flex-col items-center justify-center gap-4">
    {#if instructionsReady}
      <div class="space-y-2 text-center">
        <p class="text-sm font-medium tracking-widest text-white/60 uppercase">Get Ready</p>
        <h1 class="text-4xl font-black" style:color={GREEN.toRgb()}>
          {hasTiltControls ? "Hold Phone to Forehead" : "Face Screen Outwards"}
        </h1>
        <p class="text-sm text-white/70">
          {hasTiltControls
            ? "Screen faces outward so others can see"
            : "Others need to see the word on screen"}
        </p>
      </div>

      <div class={["px-6 py-4", "text-center", "bg-white/5", "rounded-xl", "backdrop-blur-sm"]}>
        {#if hasTiltControls}
          <div class="space-y-3">
            <div class="flex justify-center gap-6">
              <div class="flex flex-col items-center gap-1">
                <div
                  class="flex h-12 w-12 items-center justify-center rounded-full"
                  style:background-color={GREEN.toRgba(0.2)}
                >
                  <i class="fa-solid fa-arrow-down text-lg" style:color={GREEN.toRgb()}></i>
                </div>
                <span class="text-xs text-white/70">Tilt Down</span>
                <span class="text-[10px] text-white/50">Correct</span>
              </div>
              <div class="flex flex-col items-center gap-1">
                <div class="flex h-12 w-12 items-center justify-center rounded-full bg-white/10">
                  <i class="fa-solid fa-arrow-up text-lg text-white/60"></i>
                </div>
                <span class="text-xs text-white/70">Tilt Up</span>
                <span class="text-[10px] text-white/50">Skip</span>
              </div>
            </div>
          </div>
        {:else}
          <div class="space-y-3">
            <div class="flex justify-center gap-6">
              <div class="flex flex-col items-center gap-1">
                <div
                  class="flex h-12 w-12 items-center justify-center rounded-full"
                  style:background-color={GREEN.toRgba(0.2)}
                >
                  <i class="fa-solid fa-hand-pointer text-lg" style:color={GREEN.toRgb()}></i>
                </div>
                <span class="text-xs text-white/70">Tap Bottom</span>
                <span class="text-[10px] text-white/50">Correct</span>
              </div>
              <div class="flex flex-col items-center gap-1">
                <div class="flex h-12 w-12 items-center justify-center rounded-full bg-white/10">
                  <i class="fa-solid fa-hand-pointer text-lg text-white/60"></i>
                </div>
                <span class="text-xs text-white/70">Tap Top</span>
                <span class="text-[10px] text-white/50">Skip</span>
              </div>
            </div>
            <p class="text-[10px] text-white/40">Or use keyboard ↑ ↓</p>
          </div>
        {/if}
      </div>
    {/if}
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
