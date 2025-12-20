<script lang="ts">
  import type { Prompt } from "$lib/data/wavelengthPrompts"
  import { interpolateColor, sliderToDisplayValue } from "$lib/utils/colors"
  import WavelengthDial from "./WavelengthDial.svelte"

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

  let displayValue = $derived(sliderToDisplayValue(target))
  let arrowColor = $derived(interpolateColor(target, leftColor, rightColor))

  let arrows = $derived([
    {
      value: target,
      color: arrowColor,
      displayValue,
    },
  ])
</script>

<div class="mx-auto flex h-full w-full max-w-md flex-col items-center gap-4 p-4">
  <div class="flex w-full flex-col items-center gap-2 rounded-xl bg-purple-500/15 px-6 py-3">
    <span class="text-xs font-semibold tracking-widest text-purple-400 uppercase"
      >Psychic's Turn</span
    >
    <h2 class="text-2xl font-bold text-white">Give a Clue</h2>
    <p class="text-center text-sm text-gray-400">Help your team find the target</p>
  </div>

  <div class="flex w-full flex-1 flex-col items-center justify-between gap-4">
    <!-- Dial Container -->
    <div class="flex w-full flex-1 flex-col items-center justify-center">
      <WavelengthDial prompt={selectedPrompt} {leftColor} {rightColor} {arrows} />
    </div>

    <!-- Action buttons -->
    <div class="flex w-full max-w-sm items-center gap-3">
      <button
        class="flex h-14 w-14 cursor-pointer items-center justify-center rounded-xl border border-white/20 text-white/60 transition-all hover:bg-white/10 hover:text-white active:scale-[0.98]"
        onclick={onBack}
        type="button"
        aria-label="Go back"
      >
        <i class="fa-solid fa-arrow-left text-lg"></i>
      </button>
      <button
        class="flex-1 cursor-pointer rounded-xl bg-white/15 px-6 py-4 text-lg font-semibold text-white transition-all hover:bg-white/25 active:scale-[0.98]"
        onclick={onReadyToGuess}
        type="button"
      >
        Continue
      </button>
    </div>
  </div>
</div>
