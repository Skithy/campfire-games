<script lang="ts">
  import type { Prompt } from "$lib/data/wavelengthPrompts"
  import { interpolateColor, sliderToDisplayValue } from "$lib/utils/colors"

  import PhaseActions from "./PhaseActions.svelte"
  import PhaseHeader from "./PhaseHeader.svelte"
  import WavelengthDial from "./WavelengthDial.svelte"

  let {
    selectedPrompt,
    target,
    leftColor,
    rightColor,
    onReadyToGuess,
    onBack,
  }: {
    selectedPrompt: Prompt
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

<div class="mx-auto flex h-full w-full max-w-md flex-col items-center gap-4 p-6">
  <PhaseHeader
    label="Psychic's Turn"
    title="Give a Clue"
    description="Help your team find the target"
    bgClass="bg-purple-500/15"
  />

  <div class="flex w-full flex-1 flex-col items-center justify-between gap-4">
    <!-- Dial Container -->
    <div class="flex w-full flex-1 flex-col items-center justify-center">
      <WavelengthDial prompt={selectedPrompt} {leftColor} {rightColor} {arrows} />
    </div>

    <!-- Action buttons -->
    <PhaseActions {onBack} onPrimary={onReadyToGuess} primaryLabel="Continue" />
  </div>
</div>
