<script lang="ts">
  import type { Prompt } from "$lib/data/wavelengthPrompts"
  import { getPromptColors, getSliderColor } from "$lib/utils/colors"

  let {
    prompts,
    target,
    onSelectPrompt,
    onReroll,
    onReadyToGuess,
  }: {
    prompts: Prompt[]
    target: number
    onSelectPrompt: (prompt: Prompt) => void
    onReroll: () => void
    onReadyToGuess: () => void
  } = $props()

  let selectedPromptIndex = $state<number | null>(null)

  function handleSelect(index: number) {
    selectedPromptIndex = index
    onSelectPrompt(prompts[index])
  }

  let [leftColor, rightColor] = $derived(
    selectedPromptIndex !== null
      ? getPromptColors(selectedPromptIndex, prompts.length)
      : ["#fff", "#fff"],
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

        <div
          class="relative h-[40vh] w-[120px] rounded-[60px] border-2 border-[#555] bg-[#333] p-2.5"
        >
          <div class="pointer-events-none absolute top-1/2 right-0 left-0 h-0.5 bg-white/20"></div>

          <!-- Custom Thumb with Target Number -->
          <div
            class="absolute right-2.5 left-2.5 z-10 flex h-20 items-center justify-center rounded-[40px] border-4 border-white text-3xl font-bold text-black shadow-lg"
            style="
                            bottom: {target}%; 
                            transform: translateY(50%);
                            background-color: {getSliderColor(
              target,
              selectedPromptIndex,
              prompts.length,
            )};
                        "
          >
            {target}
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
