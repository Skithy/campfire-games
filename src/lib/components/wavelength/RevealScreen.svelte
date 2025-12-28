<script lang="ts">
  import type { Prompt } from "$lib/data/wavelengthPrompts"
  import type { Color } from "$lib/utils/colors"

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
    leftColor: Color
    rightColor: Color
    onNextRound: () => void
  } = $props()
</script>

<div class={["flex flex-col items-center gap-4", "min-h-0 w-full flex-1"]}>
  <!-- Dial Container -->
  <div class={["flex flex-col items-center justify-center", "min-h-0 w-full flex-1"]}>
    <WavelengthDial {prompt} {leftColor} {rightColor} value={guess} targetValue={target} />
  </div>

  <!-- Next round button -->
  <button
    class={[
      "w-full",
      "px-6 py-4",
      "text-lg font-semibold text-white",
      "bg-white/15",
      "rounded-xl",
      "cursor-pointer transition-all hover:bg-white/25 active:scale-[0.98]",
    ]}
    onclick={onNextRound}
    type="button"
  >
    Next Round
  </button>
</div>
