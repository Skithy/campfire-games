<script lang="ts">
  import type { Prompt } from "$lib/data/wavelengthPrompts"

  import WavelengthDial from "./WavelengthDial.svelte"

  let {
    prompt,
    target,
    guess,
    leftColor,
    rightColor,
    onNextRound,
  }: {
    prompt: Prompt
    target: number // -10 to 10 internal value
    guess: number // -10 to 10 internal value
    leftColor: string
    rightColor: string
    onNextRound: () => void
  } = $props()
</script>

<div class="mx-auto flex h-full w-full max-w-md flex-col items-center gap-4 px-6 pb-6">
  <div class="flex w-full flex-1 flex-col items-center justify-between gap-4">
    <!-- Dial Container -->
    <div class="flex w-full flex-1 flex-col items-center justify-center">
      <WavelengthDial {prompt} {leftColor} {rightColor} value={guess} targetValue={target} />
    </div>

    <!-- Next round button -->
    <button
      class="w-full max-w-sm cursor-pointer rounded-xl bg-white/15 px-6 py-4 text-lg font-semibold text-white transition-all hover:bg-white/25 active:scale-[0.98]"
      onclick={onNextRound}
      type="button"
    >
      Next Round
    </button>
  </div>
</div>
