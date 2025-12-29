<script lang="ts">
  import PageActions from "$lib/components/layout/PageActions.svelte"
  import type { Prompt } from "$lib/data/wavelengthPrompts"
  import type { Color } from "$lib/utils/colors"

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

<div class={["flex flex-col items-center gap-4", "min-h-0 w-full flex-1"]}>
  <!-- Dial Container -->
  <div class={["flex flex-col items-center justify-center", "min-h-0 w-full flex-1"]}>
    <WavelengthDial {prompt} {leftColor} {rightColor} interactive={true} bind:value />
  </div>

  <!-- Action buttons -->
  <PageActions
    left={{ label: "Go back", onclick: onBack, icon: "fa-solid fa-arrow-left", iconOnly: true }}
    right={{ label: "Lock In", onclick: handleLockIn }}
  />
</div>
