<script lang="ts">
  import type { Prompt } from "$lib/data/wavelengthPrompts"
  import type { Color } from "$lib/utils/colors"

  import PageActions from "$lib/components/layout/PageActions.svelte"
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
    leftColor: Color
    rightColor: Color
    onReadyToGuess: () => void
    onBack: () => void
  } = $props()
</script>

<div class="flex flex-col items-center gap-4 h-full w-full max-w-md mx-auto px-6 pb-6">
  <div class="flex flex-1 flex-col items-center justify-between gap-4 w-full">
    <!-- Dial Container -->
    <div class="flex flex-1 flex-col items-center justify-center w-full">
      <WavelengthDial prompt={selectedPrompt} {leftColor} {rightColor} value={target} />
    </div>

    <!-- Action buttons -->
    <PageActions {onBack} onPrimary={onReadyToGuess} primaryLabel="Continue" />
  </div>
</div>
