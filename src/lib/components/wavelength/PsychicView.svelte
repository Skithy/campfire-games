<script lang="ts">
  import type { Prompt } from "$lib/data/wavelengthPrompts"
  import {
    getPromptColors,
    getSliderColor,
    sliderToDisplayValue,
    sliderToPosition,
  } from "$lib/utils/colors"

  let {
    prompts,
    target,
    onSelectPrompt,
    onReroll,
    onReadyToGuess,
  }: {
    prompts: Prompt[]
    target: number // -10 to 10 internal value
    onSelectPrompt: (prompt: Prompt) => void
    onReroll: () => void
    onReadyToGuess: () => void
  } = $props()

  let selectedPromptIndex = $state<number | null>(null)

  // Tick marks from -10 to 10
  const ticks = [-10, -8, -6, -4, -2, 0, 2, 4, 6, 8, 10]

  function handleSelect(index: number) {
    selectedPromptIndex = index
    onSelectPrompt(prompts[index])
  }

  let [leftColor, rightColor] = $derived(
    selectedPromptIndex !== null
      ? getPromptColors(selectedPromptIndex, prompts.length)
      : ["#fff", "#fff"],
  )
  let displayValue = $derived(sliderToDisplayValue(target))
  let position = $derived(sliderToPosition(target))
  let arrowColor = $derived(
    selectedPromptIndex !== null
      ? getSliderColor(target, selectedPromptIndex, prompts.length)
      : "#646cff",
  )
</script>

<div class="mx-auto flex h-full w-full max-w-[600px] flex-col items-center gap-4 p-4">
  <h2 class="text-2xl font-bold">You are the Psychic!</h2>

  {#if selectedPromptIndex === null}
    <div class="flex w-full flex-col items-center gap-4">
      <h3 class="text-xl font-semibold">Pick a Prompt</h3>
      <div class="flex w-full flex-col gap-4">
        {#each prompts as prompt, i (i)}
          {@const [leftColor, rightColor] = getPromptColors(i, prompts.length)}
          <button
            class="flex cursor-pointer items-center justify-between rounded-xl border-2 p-6 text-lg text-white transition-all hover:-translate-y-0.5"
            style="
                            background: linear-gradient(90deg, {leftColor}22 0%, #2a2a2a 30%, #2a2a2a 70%, {rightColor}22 100%);
                            border-color: #3a3a3a;
                        "
            onmouseenter={(e) => (e.currentTarget.style.borderColor = leftColor)}
            onmouseleave={(e) => (e.currentTarget.style.borderColor = "#3a3a3a")}
            onclick={() => handleSelect(i)}
          >
            <span class="font-bold" style="color: {leftColor}">{prompt[0]}</span>
            <span class="mx-4 text-sm text-[#888] uppercase">vs</span>
            <span class="font-bold" style="color: {rightColor}">{prompt[1]}</span>
          </button>
        {/each}
      </div>
      <button
        class="mt-6 cursor-pointer rounded-lg border border-[#666] bg-transparent px-6 py-3 text-[#ccc] hover:bg-white/5"
        onclick={onReroll}
      >
        Reroll Prompts
      </button>
    </div>
  {:else}
    <div class="flex w-full flex-1 flex-col items-center justify-between gap-4">
      <div class="text-center">
        <p class="text-lg">Give a verbal clue that belongs at this position.</p>
      </div>

      <div class="flex w-full max-w-[400px] flex-1 flex-col items-center justify-center gap-4">
        <div
          class="w-full rounded-lg p-2 text-center text-2xl font-bold text-black transition-colors"
          style="background-color: {rightColor}"
        >
          {prompts[selectedPromptIndex][1]}
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
            <span>↑ {prompts[selectedPromptIndex][1]}</span>
            <span class="text-gray-400">center</span>
            <span>↓ {prompts[selectedPromptIndex][0]}</span>
          </div>
        </div>

        <div
          class="w-full rounded-lg p-2 text-center text-2xl font-bold text-black transition-colors"
          style="background-color: {leftColor}"
        >
          {prompts[selectedPromptIndex][0]}
        </div>
      </div>

      <div class="flex w-full max-w-[300px] flex-col gap-4">
        <button
          class="w-full cursor-pointer rounded-lg border-none bg-[#646cff] p-4 text-xl font-bold text-white hover:bg-[#535bf2]"
          onclick={onReadyToGuess}
        >
          Ready to Guess
        </button>
        <button
          class="cursor-pointer border-none bg-transparent text-[#888] underline hover:text-white"
          onclick={() => (selectedPromptIndex = null)}
        >
          Back to Prompts
        </button>
      </div>
    </div>
  {/if}
</div>
