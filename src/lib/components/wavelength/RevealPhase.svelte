<script lang="ts">
  import type { Prompt } from "$lib/data/wavelengthPrompts"
  import { interpolateColor, sliderToDisplayValue } from "$lib/utils/colors"

  import PhaseHeader from "./PhaseHeader.svelte"
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

  let scoreResult = $derived.by(() => {
    const difference = Math.abs(target - guess)
    const diffPercent = Math.abs(sliderToDisplayValue(target) - sliderToDisplayValue(guess))
    if (difference === 0)
      return { message: "Perfect!", bg: "bg-green-800/60", description: "You nailed it exactly!" }
    if (difference <= 1)
      return {
        message: "So Close!",
        bg: "bg-green-700/50",
        description: `Almost there! Just ${diffPercent}% off`,
      }
    if (difference <= 3)
      return {
        message: "Not Bad",
        bg: "bg-amber-700/50",
        description: `Good effort — ${diffPercent}% off`,
      }
    return {
      message: "Way Off...",
      bg: "bg-red-800/50",
      description: "Better luck next time!",
    }
  })

  let targetDisplay = $derived(sliderToDisplayValue(target))
  let guessDisplay = $derived(sliderToDisplayValue(guess))
  let targetColor = $derived(interpolateColor(target, leftColor, rightColor))
  let guessColor = $derived(interpolateColor(guess, leftColor, rightColor))

  let arrows = $derived([
    {
      value: target,
      color: targetColor,
      label: "Target",
      displayValue: targetDisplay,
      style: "solid" as const,
    },
    {
      value: guess,
      color: guessColor,
      label: "Guess",
      displayValue: guessDisplay,
      style: "dashed" as const,
    },
  ])
</script>

<div class="mx-auto flex h-full w-full max-w-md flex-col items-center gap-4">
  <PhaseHeader
    label="Results"
    title={scoreResult.message}
    description={scoreResult.description}
    bgClass={scoreResult.bg}
  />

  <div class="flex w-full flex-1 flex-col items-center justify-between gap-4">
    <!-- Dial Container -->
    <div class="flex w-full flex-1 flex-col items-center justify-center">
      <WavelengthDial {prompt} {leftColor} {rightColor} {arrows} showDifferenceWedge={true} />
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
