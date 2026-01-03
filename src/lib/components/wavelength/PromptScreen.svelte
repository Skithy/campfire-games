<script lang="ts">
  import PageActions from "$lib/components/layout/PageActions.svelte"
  import { SpectrumButton } from "$lib/components/ui"
  import type { Prompt } from "$lib/data/wavelengthPrompts"
  import type { Color } from "$lib/utils/colors"

  let {
    prompts,
    promptColors,
    onSelectPrompt,
    onReroll,
  }: {
    prompts: Prompt[]
    promptColors: Array<[Color, Color]>
    onSelectPrompt: (prompt: Prompt, index: number) => void
    onReroll: () => void
  } = $props()

  let selectedIndex = $state<number | null>(null)

  function handleSubmit() {
    if (selectedIndex !== null) {
      onSelectPrompt(prompts[selectedIndex], selectedIndex)
    }
  }
</script>

<div class={["flex flex-col items-center gap-4", "min-h-0 w-full flex-1"]}>
  <div class={["flex flex-col items-center", "min-h-0 w-full flex-1", "overflow-y-auto"]}>
    <div class="flex w-full flex-col gap-5 md:gap-6">
      {#each prompts as prompt, i (i)}
        {@const colors = promptColors[i]}
        <SpectrumButton
          leftLabel={prompt[0]}
          rightLabel={prompt[1]}
          leftColor={colors[0]}
          rightColor={colors[1]}
          selected={selectedIndex === i}
          onclick={() => (selectedIndex = i)}
        />
      {/each}
    </div>
  </div>

  <!-- Action buttons -->
  <PageActions
    left={{
      label: "Reroll prompts",
      onclick: onReroll,
      icon: "fa-solid fa-rotate",
      iconOnly: true,
    }}
    right={{ label: "Continue", onclick: handleSubmit, disabled: selectedIndex === null }}
  />
</div>
