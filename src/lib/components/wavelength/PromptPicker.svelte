<script lang="ts">
  import type { Prompt } from "$lib/data/wavelengthPrompts"
  import { getPromptColors } from "$lib/utils/colors"

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

<div class="flex w-full flex-col items-center gap-4">
  <h3 class="text-xl font-semibold">Pick a Prompt</h3>
  <div class="flex w-full flex-col gap-4">
    {#each prompts as prompt, i (i)}
      {@const [leftColor, rightColor] = getPromptColors(i, prompts.length)}
      <button
        class="flex cursor-pointer items-center justify-between rounded-xl border-2 p-6 text-lg text-white transition-all hover:-translate-y-0.5"
        style="
          background: linear-gradient(90deg, {leftColor}22 0%, #2a2a2a 30%, #2a2a2a 70%, {rightColor}22 100%);
          border-color: #3a3a3a;
        "
        onmouseenter={(e) => (e.currentTarget.style.borderColor = leftColor)}
        onmouseleave={(e) => (e.currentTarget.style.borderColor = "#3a3a3a")}
        onclick={() => onSelectPrompt(prompt, i)}
        type="button"
      >
        <span class="font-bold" style="color: {leftColor}">{prompt[0]}</span>
        <span class="mx-4 text-sm text-[#888] uppercase">vs</span>
        <span class="font-bold" style="color: {rightColor}">{prompt[1]}</span>
      </button>
    {/each}
  </div>
  <button
    class="mt-6 cursor-pointer rounded-lg border border-[#666] bg-transparent px-6 py-3 text-[#ccc] hover:bg-white/5"
    onclick={onReroll}
    type="button"
  >
    Reroll Prompts
  </button>
</div>
