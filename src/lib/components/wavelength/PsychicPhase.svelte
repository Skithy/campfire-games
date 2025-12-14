<script lang="ts">
  import type { Prompt } from "$lib/data/wavelengthPrompts"
  import {
    getSliderColor,
    sliderToDisplayValue,
    sliderToPosition,
  } from "$lib/utils/colors"

  let {
    selectedPrompt,
    selectedPromptIndex,
    target,
    leftColor,
    rightColor,
    onReadyToGuess,
    onBack,
  }: {
    selectedPrompt: Prompt
    selectedPromptIndex: number
    target: number // -10 to 10 internal value
    leftColor: string
    rightColor: string
    onReadyToGuess: () => void
    onBack: () => void
  } = $props()

  // Tick marks from -10 to 10
  const ticks = [-10, -8, -6, -4, -2, 0, 2, 4, 6, 8, 10]

  let displayValue = $derived(sliderToDisplayValue(target))
  let position = $derived(sliderToPosition(target))
  let arrowColor = $derived(
    getSliderColor(target, selectedPromptIndex, 3),
  )
</script>

<div class="mx-auto flex h-full w-full max-w-150 flex-col items-center gap-4 p-4">
  <h2 class="text-2xl font-bold">Make a clue!</h2>

  <div class="flex w-full flex-1 flex-col items-center justify-between gap-4">

    <div class="flex w-full max-w-100 flex-1 flex-col items-center justify-center gap-4">
      <div
        class="w-full rounded-lg p-2 text-center text-2xl font-bold text-black transition-colors"
        style="background-color: {leftColor}"
      >
        {selectedPrompt[0]}
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
        <div class="relative h-full w-16 rounded-lg border-2 border-[#555] bg-[#222]">
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

          <!-- Arrow from center to target -->
          {#if target !== 0}
            <div
              class="pointer-events-none absolute left-1/2 w-1 -translate-x-1/2 rounded-full"
              style="
                background-color: {arrowColor};
                {target > 0
                ? `bottom: 50%; height: ${(target / 10) * 50}%;`
                : `top: 50%; height: ${(-target / 10) * 50}%;`}
              "
            ></div>
          {/if}

          <!-- Target indicator -->
          <div
            class="pointer-events-none absolute left-1/2 flex h-10 w-10 -translate-x-1/2 items-center justify-center rounded-full border-3 border-white text-sm font-bold text-black shadow-lg"
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
          <span>↑ {selectedPrompt[1]}</span>
          <span class="text-gray-400">center</span>
          <span>↓ {selectedPrompt[0]}</span>
        </div>
      </div>

      <div
        class="w-full rounded-lg p-2 text-center text-2xl font-bold text-black transition-colors"
        style="background-color: {rightColor}"
      >
        {selectedPrompt[1]}
      </div>
    </div>

    <div class="flex w-full max-w-75 flex-col gap-4">
      <button
        class="w-full cursor-pointer rounded-lg border-none bg-[#646cff] p-4 text-xl font-bold text-white hover:bg-[#535bf2]"
        onclick={onReadyToGuess}
        type="button"
      >
        Ready to Guess
      </button>
      <button
        class="cursor-pointer border-none bg-transparent text-[#888] underline hover:text-white"
        onclick={onBack}
        type="button"
      >
        Back to Prompts
      </button>
    </div>
  </div>
</div>
