<script lang="ts">
  import { type Prompt, wavelengthPrompts } from "$lib/data/wavelengthPrompts"
  import {
    getPromptColors,
    getSliderColor,
    sliderToDisplayValue,
    sliderToPosition,
  } from "$lib/utils/colors"

  let {
    prompt,
    target,
    guess,
    onNextRound,
  }: {
    prompt: Prompt
    target: number // -10 to 10 internal value
    guess: number // -10 to 10 internal value
    onNextRound: () => void
  } = $props()

  // Tick marks from -10 to 10
  const ticks = [-10, -8, -6, -4, -2, 0, 2, 4, 6, 8, 10]

  let scoreMessage = $derived.by(() => {
    const difference = Math.abs(target - guess)
    if (difference === 0) return "PERFECT!"
    if (difference <= 1) return "So Close!"
    if (difference <= 3) return "Not Bad"
    return "Way Off..."
  })

  let index = $derived(wavelengthPrompts.findIndex((p) => p[0] === prompt[0] && p[1] === prompt[1]))
  let [leftColor, rightColor] = $derived(
    index !== -1 ? getPromptColors(index, wavelengthPrompts.length) : ["#fff", "#fff"],
  )

  let targetDisplay = $derived(sliderToDisplayValue(target))
  let guessDisplay = $derived(sliderToDisplayValue(guess))
  let targetPosition = $derived(sliderToPosition(target))
  let guessPosition = $derived(sliderToPosition(guess))
  let targetColor = $derived(
    index !== -1 ? getSliderColor(target, index, wavelengthPrompts.length) : "#4caf50",
  )
  let guessColor = $derived(
    index !== -1 ? getSliderColor(guess, index, wavelengthPrompts.length) : "#646cff",
  )
</script>

<div class="flex h-full w-full flex-col items-center gap-4 p-4">
  <div class="text-center">
    <h2
      class="m-0 bg-gradient-to-r from-[#ff4444] to-[#ffff44] bg-clip-text text-5xl font-bold text-transparent"
    >
      {scoreMessage}
    </h2>
    <p>Target: {targetDisplay}% | Guess: {guessDisplay}%</p>
  </div>

  <div class="flex w-full max-w-[400px] flex-1 flex-col items-center justify-center gap-4">
    <div
      class="w-full rounded-lg p-2 text-center text-2xl font-bold text-black"
      style="background-color: {rightColor}"
    >
      {prompt[1]}
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
      <div class="relative h-full w-20 rounded-lg border-2 border-[#555] bg-[#222]">
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

        <!-- Target arrow from center -->
        {#if target !== 0}
          <div
            class="pointer-events-none absolute left-1/4 w-1 -translate-x-1/2 rounded-full"
            style="
              background-color: {targetColor};
              {target > 0
              ? `bottom: 50%; height: ${(target / 10) * 50}%;`
              : `top: 50%; height: ${(-target / 10) * 50}%;`}
            "
          ></div>
        {/if}

        <!-- Guess arrow from center -->
        {#if guess !== 0}
          <div
            class="pointer-events-none absolute left-3/4 w-1 -translate-x-1/2 rounded-full"
            style="
              background-color: {guessColor};
              {guess > 0
              ? `bottom: 50%; height: ${(guess / 10) * 50}%;`
              : `top: 50%; height: ${(-guess / 10) * 50}%;`}
            "
          ></div>
        {/if}

        <!-- Target indicator -->
        <div
          class="pointer-events-none absolute left-1/4 z-20 flex h-9 w-9 -translate-x-1/2 items-center justify-center rounded-full border-2 border-white text-xs font-bold text-black shadow-lg"
          style="
            bottom: {targetPosition}%;
            transform: translate(-50%, 50%);
            background-color: {targetColor};
          "
        >
          {targetDisplay}%
        </div>

        <!-- Guess indicator -->
        <div
          class="pointer-events-none absolute left-3/4 z-10 flex h-9 w-9 -translate-x-1/2 items-center justify-center rounded-full border-2 border-white text-xs font-bold text-black shadow-lg"
          style="
            bottom: {guessPosition}%;
            transform: translate(-50%, 50%);
            background-color: {guessColor};
          "
        >
          {guessDisplay}%
        </div>

        <!-- Center dot -->
        <div
          class="pointer-events-none absolute bottom-1/2 left-1/2 h-3 w-3 -translate-x-1/2 translate-y-1/2 rounded-full bg-white/70"
        ></div>
      </div>

      <!-- Legend (right side) -->
      <div class="flex h-full flex-col justify-between py-1 text-left text-xs">
        <span class="text-gray-500">↑ {prompt[1]}</span>
        <div class="space-y-1">
          <div class="flex items-center gap-1">
            <div class="h-3 w-3 rounded-full" style="background-color: {targetColor}"></div>
            <span class="text-gray-400">Target</span>
          </div>
          <div class="flex items-center gap-1">
            <div class="h-3 w-3 rounded-full" style="background-color: {guessColor}"></div>
            <span class="text-gray-400">Guess</span>
          </div>
        </div>
        <span class="text-gray-500">↓ {prompt[0]}</span>
      </div>
    </div>

    <div
      class="w-full rounded-lg p-2 text-center text-2xl font-bold text-black"
      style="background-color: {leftColor}"
    >
      {prompt[0]}
    </div>
  </div>

  <button
    class="cursor-pointer rounded-[50px] border-none bg-white px-12 py-4 text-2xl font-bold text-black shadow-lg transition-transform hover:bg-gray-100 active:scale-95"
    onclick={onNextRound}
  >
    Start Next Round
  </button>
</div>
