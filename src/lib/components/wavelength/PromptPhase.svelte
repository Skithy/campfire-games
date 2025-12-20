<script lang="ts">
  import type { Prompt } from "$lib/data/wavelengthPrompts"
  import { getPromptColors } from "$lib/utils/colors"

  import PhaseHeader from "./PhaseHeader.svelte"

  let {
    prompts,
    onSelectPrompt,
    onReroll,
  }: {
    prompts: Prompt[]
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

<div class="mx-auto flex h-full w-full max-w-md flex-col items-center gap-4">
  <PhaseHeader
    label="Psychic's Turn"
    title="Pick a Spectrum"
    description="Choose a prompt for your team"
    bgClass="bg-purple-500/15"
  />

  <div class="flex w-full flex-1 flex-col items-center justify-between gap-4">
    <div class="flex w-full flex-col gap-5">
      {#each prompts as prompt, i (i)}
        {@const [leftColor, rightColor] = getPromptColors(i, prompts.length)}
        {@const isSelected = selectedIndex === i}
        <div
          class="rounded-2xl p-0.5 transition-all"
          style="
            background: {isSelected
            ? `linear-gradient(90deg, ${leftColor}, ${rightColor})`
            : '#444'};
            box-shadow: {isSelected ? `0 0 20px ${leftColor}40` : 'none'};
          "
        >
          <button
            class="flex w-full cursor-pointer items-stretch overflow-hidden rounded-[14px] bg-[#1a1a1a] text-base transition-all"
            onclick={() => (selectedIndex = i)}
            type="button"
          >
            <span
              class="flex flex-1 items-center justify-center px-3 py-5 text-center text-base font-bold whitespace-nowrap"
              style="color: {leftColor}">{prompt[0]}</span
            >
            <div class="w-px self-stretch bg-white/20"></div>
            <span
              class="flex flex-1 items-center justify-center px-3 py-5 text-center text-base font-bold whitespace-nowrap"
              style="color: {rightColor}">{prompt[1]}</span
            >
          </button>
        </div>
      {/each}
    </div>

    <!-- Action buttons -->
    <div class="flex w-full max-w-sm items-center gap-3">
      <button
        class="flex h-14 w-14 cursor-pointer items-center justify-center rounded-xl border border-white/20 text-white/60 transition-all hover:bg-white/10 hover:text-white active:scale-[0.98]"
        onclick={onReroll}
        type="button"
        aria-label="Reroll prompts"
      >
        <i class="fa-solid fa-rotate text-lg"></i>
      </button>
      <button
        class="flex-1 cursor-pointer rounded-xl px-6 py-4 text-lg font-semibold transition-all active:scale-[0.98] {selectedIndex !==
        null
          ? 'bg-white/15 text-white hover:bg-white/25'
          : 'cursor-not-allowed bg-white/5 text-white/40'}"
        onclick={handleSubmit}
        type="button"
        disabled={selectedIndex === null}
      >
        Continue
      </button>
    </div>
  </div>
</div>
