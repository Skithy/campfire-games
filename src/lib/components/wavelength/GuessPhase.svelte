<script lang="ts">
  import { type Prompt, wavelengthPrompts } from "$lib/data/wavelengthPrompts"
  import {
    getSliderColor,
    sliderToDisplayValue,
    sliderToPosition,
  } from "$lib/utils/colors"

  let {
    prompt,
    leftColor,
    rightColor,
    onLockIn,
  }: {
    prompt: Prompt
    leftColor: string
    rightColor: string
    onLockIn: (guess: number) => void
  } = $props()

  // Internal value: -10 to 10 (representing 10% increments)
  // -10 = bottom (100% left), 0 = center (0%), 10 = top (100% right)
  let value = $state(0)
  let isDragging = $state(false)
  let numberLineEl: HTMLDivElement | null = $state(null)

  // Tick marks from -10 to 10
  const ticks = [-10, -8, -6, -4, -2, 0, 2, 4, 6, 8, 10]

  function handleLockIn() {
    onLockIn(value)
  }

  function positionToValue(clientY: number): number {
    if (!numberLineEl) return 0
    const rect = numberLineEl.getBoundingClientRect()
    // Convert Y position to value (-10 to 10)
    // Top of element = 10, bottom = -10
    const relativeY = (clientY - rect.top) / rect.height
    const rawValue = 10 - relativeY * 20
    // Snap to nearest integer
    return Math.max(-10, Math.min(10, Math.round(rawValue)))
  }

  function handlePointerDown(e: PointerEvent) {
    isDragging = true
    value = positionToValue(e.clientY)
    ;(e.target as HTMLElement).setPointerCapture(e.pointerId)
  }

  function handlePointerMove(e: PointerEvent) {
    if (!isDragging) return
    value = positionToValue(e.clientY)
  }

  function handlePointerUp() {
    isDragging = false
  }

  let index = $derived(wavelengthPrompts.findIndex((p) => p[0] === prompt[0] && p[1] === prompt[1]))
  let displayValue = $derived(sliderToDisplayValue(value))
  let position = $derived(sliderToPosition(value))
  let arrowColor = $derived(
    index !== -1 ? getSliderColor(value, index, wavelengthPrompts.length) : "#646cff",
  )
</script>

<div class="flex h-full w-full flex-col items-center gap-4 p-4">
  <h2 class="text-2xl font-bold">Make Your Guess</h2>

  <div class="flex w-full max-w-[400px] flex-1 flex-col items-center justify-center gap-4">
    <div
      class="w-full rounded-lg p-2 text-center text-2xl font-bold text-black"
      style="background-color: {leftColor}"
    >
      {prompt[0]}
    </div>

    <!-- Number Line Container -->
    <div class="relative flex h-[50vh] items-center gap-4">
      <!-- Tick Labels (left side) -->
      <div class="relative flex h-full w-12 flex-col justify-between py-1 text-right text-sm">
        {#each ticks.toReversed() as tick (tick)}
          <span class="text-gray-400 {tick === 0 ? 'font-bold text-white' : ''}">
            {sliderToDisplayValue(tick)}%
          </span>
        {/each}
      </div>

      <!-- Number Line -->
      <div
        bind:this={numberLineEl}
        class="relative h-full w-16 cursor-pointer rounded-lg border-2 border-[#555] bg-[#222]"
        role="slider"
        tabindex="0"
        aria-valuemin={-10}
        aria-valuemax={10}
        aria-valuenow={value}
        onpointerdown={handlePointerDown}
        onpointermove={handlePointerMove}
        onpointerup={handlePointerUp}
        onpointercancel={handlePointerUp}
        onkeydown={(e) => {
          if (e.key === "ArrowUp") value = Math.min(10, value + 1)
          if (e.key === "ArrowDown") value = Math.max(-10, value - 1)
        }}
      >
        <!-- Tick marks -->
        {#each ticks as tick (tick)}
          {@const tickPos = sliderToPosition(tick)}
          <div
            class="pointer-events-none absolute right-0 left-0 h-0.5 {tick === 0
              ? 'bg-white/50'
              : 'bg-white/20'}"
            style="bottom: {tickPos}%"
          ></div>
        {/each}

        <!-- Arrow from center to value -->
        {#if value !== 0}
          <div
            class="pointer-events-none absolute left-1/2 w-1 -translate-x-1/2 rounded-full transition-all"
            style="
              background-color: {arrowColor};
              {value > 0
              ? `bottom: 50%; height: ${(value / 10) * 50}%;`
              : `top: 50%; height: ${(-value / 10) * 50}%;`}
            "
          ></div>
        {/if}

        <!-- Arrow head / Current value indicator -->
        <div
          class="pointer-events-none absolute left-1/2 flex h-10 w-10 -translate-x-1/2 items-center justify-center rounded-full border-3 border-white text-sm font-bold text-black shadow-lg transition-all"
          style="
            bottom: {position}%;
            transform: translate(-50%, 50%);
            background-color: {arrowColor};
          "
        >
          {displayValue}%
        </div>

        <!-- Center dot -->
        <div
          class="pointer-events-none absolute bottom-1/2 left-1/2 h-3 w-3 -translate-x-1/2 translate-y-1/2 rounded-full bg-white/70"
        ></div>
      </div>

      <!-- Direction labels (right side) -->
      <div class="flex h-full flex-col justify-between py-1 text-left text-xs text-gray-500">
        <span>↑ {prompt[1]}</span>
        <span class="text-gray-400">center</span>
        <span>↓ {prompt[0]}</span>
      </div>
    </div>

    <div
      class="w-full rounded-lg p-2 text-center text-2xl font-bold text-black"
      style="background-color: {rightColor}"
    >
      {prompt[1]}
    </div>
  </div>

  <button
    class="cursor-pointer rounded-[50px] border-none bg-[#4caf50] px-12 py-4 text-2xl font-bold text-white shadow-lg hover:bg-[#45a049]"
    onclick={handleLockIn}
  >
    Lock In Guess
  </button>
</div>
