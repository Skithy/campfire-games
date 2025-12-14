<script lang="ts">
  import type { Prompt } from "$lib/data/wavelengthPrompts"

  import PromptPicker from "./PromptPicker.svelte"

  let {
    prompts,
    onSelectPrompt,
    onReroll,
  }: {
    prompts: Prompt[]
    onSelectPrompt: (prompt: Prompt, index: number) => void
    onReroll: () => void
  } = $props()
</script>

<div class="mx-auto flex h-full w-full max-w-[600px] flex-col items-center gap-4 p-4">
  <h2 class="text-2xl font-bold">Pick Your Spectrum</h2>

  <PromptPicker {prompts} {onSelectPrompt} {onReroll} />
</div>
