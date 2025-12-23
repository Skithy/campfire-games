<script lang="ts">
  import type { Prompt } from "$lib/data/wavelengthPrompts"
  import type { Color } from "$lib/utils/colors"

  import PageActions from "$lib/components/layout/PageActions.svelte"
  import WavelengthDial from "./WavelengthDial.svelte"

  let {
    prompt,
    leftColor,
    rightColor,
    onLockIn,
    onBack,
  }: {
    prompt: Prompt
    leftColor: Color
    rightColor: Color
    onLockIn: (guess: number) => void
    onBack: () => void
  } = $props()

  // Internal value: -10 to 10 (representing 10% increments)
  let value = $state(0)

  function handleLockIn() {
    onLockIn(value)
  }
</script>

<div class="mx-auto flex h-full w-full max-w-md flex-col items-center gap-4 px-6 pb-6">
  <div class="flex w-full flex-1 flex-col items-center justify-between gap-4">
    <!-- Dial Container -->
    <div class="flex w-full flex-1 flex-col items-center justify-center">
      <WavelengthDial {prompt} {leftColor} {rightColor} interactive={true} bind:value />
    </div>

    <!-- Action buttons -->
    <PageActions {onBack} onPrimary={handleLockIn} primaryLabel="Lock In" />
  </div>
</div>
