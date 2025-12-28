<script lang="ts">
  import PageActions from "$lib/components/layout/PageActions.svelte"
  import type { Prompt } from "$lib/data/wavelengthPrompts"
  import type { Color } from "$lib/utils/colors"

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

<div class={["flex flex-col items-center gap-4", "min-h-0 w-full flex-1"]}>
  <!-- Dial Container -->
  <div class={["flex flex-col items-center justify-center", "min-h-0 w-full flex-1"]}>
    <WavelengthDial prompt={selectedPrompt} {leftColor} {rightColor} value={target} />
  </div>

  <!-- Action buttons -->
  <PageActions {onBack} onPrimary={onReadyToGuess} primaryLabel="Continue" />
</div>
