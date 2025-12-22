<script lang="ts">
  import type { Prompt } from "$lib/data/wavelengthPrompts"

  import PhaseActions from "./PhaseActions.svelte"
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
</script>

<div class="mx-auto flex h-full w-full max-w-md flex-col items-center gap-4 px-6 pb-6">
  <div class="flex w-full flex-1 flex-col items-center justify-between gap-4">
    <!-- Dial Container -->
    <div class="flex w-full flex-1 flex-col items-center justify-center">
      <WavelengthDial prompt={selectedPrompt} {leftColor} {rightColor} value={target} />
    </div>

    <!-- Action buttons -->
    <PhaseActions {onBack} onPrimary={onReadyToGuess} primaryLabel="Continue" />
  </div>
</div>
