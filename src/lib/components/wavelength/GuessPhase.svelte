<script lang="ts">
  import type { Prompt } from "$lib/data/wavelengthPrompts"
  import { interpolateColor, sliderToDisplayValue } from "$lib/utils/colors"

  import PhaseActions from "./PhaseActions.svelte"
  import PhaseHeader from "./PhaseHeader.svelte"
  import WavelengthDial from "./WavelengthDial.svelte"

  let {
    prompt,
    leftColor,
    rightColor,
    onLockIn,
    onBack,
  }: {
    prompt: Prompt
    leftColor: string
    rightColor: string
    onLockIn: (guess: number) => void
    onBack: () => void
  } = $props()

  // Internal value: -10 to 10 (representing 10% increments)
  let value = $state(0)

  function handleLockIn() {
    onLockIn(value)
  }

  let displayValue = $derived(sliderToDisplayValue(value))
  let arrowColor = $derived(interpolateColor(value, leftColor, rightColor))

  let arrows = $derived([
    {
      value,
      color: arrowColor,
      displayValue,
    },
  ])
</script>

<div class="mx-auto flex h-full w-full max-w-md flex-col items-center gap-4">
  <PhaseHeader
    label="Team's Turn"
    title="Make a Guess"
    description="Where on the spectrum is the clue?"
    bgClass="bg-amber-500/15"
  />

  <div class="flex w-full flex-1 flex-col items-center justify-between gap-4">
    <!-- Dial Container -->
    <div class="flex w-full flex-1 flex-col items-center justify-center">
      <WavelengthDial {prompt} {leftColor} {rightColor} {arrows} interactive={true} bind:value />
    </div>

    <!-- Action buttons -->
    <PhaseActions {onBack} onPrimary={handleLockIn} primaryLabel="Lock In" />
  </div>
</div>
