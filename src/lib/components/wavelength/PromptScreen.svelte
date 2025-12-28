<script lang="ts">
  import type { Prompt } from "$lib/data/wavelengthPrompts"
  import { Color } from "$lib/utils/colors"

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
  const defaultColor = Color.rgb(128, 128, 128)

  function handleSubmit() {
    if (selectedIndex !== null) {
      onSelectPrompt(prompts[selectedIndex], selectedIndex)
    }
  }
</script>

<div class="flex flex-col items-center gap-4 h-full w-full max-w-md mx-auto px-6 pb-6">
  <div class="flex flex-1 flex-col items-center justify-between gap-4 w-full">
    <div class="flex flex-col gap-5 w-full">
      {#each prompts as prompt, i (i)}
        {@const colors = promptColors[i] || [defaultColor, defaultColor]}
        {@const leftColorHsl = colors[0].toHsl()}
        {@const rightColorHsl = colors[1].toHsl()}
        {@const isSelected = selectedIndex === i}
        <div
          class="rounded-2xl p-0.5 transition-all"
          style:background={isSelected ? Color.toGradient(colors[0], colors[1]) : "#444"}
          style:box-shadow={isSelected ? `0 0 20px ${leftColorHsl}40` : "none"}
        >
          <button
            class="flex items-stretch overflow-hidden w-full text-base bg-[#1a1a1a] rounded-[14px] cursor-pointer transition-all"
            onclick={() => (selectedIndex = i)}
            type="button"
          >
            <span
              class="flex flex-1 items-center justify-center px-3 py-5 text-center text-base font-bold whitespace-nowrap"
              style="color: {leftColorHsl}">{prompt[0]}</span
            >
            <div class="w-px self-stretch bg-white/20"></div>
            <span
              class="flex flex-1 items-center justify-center px-3 py-5 text-center text-base font-bold whitespace-nowrap"
              style="color: {rightColorHsl}">{prompt[1]}</span
            >
          </button>
        </div>
      {/each}
    </div>

    <!-- Action buttons -->
    <div class="flex items-center gap-3 w-full max-w-sm">
      <button
        class={[
          "flex items-center justify-center",
          "h-14 w-14",
          "text-white/60",
          "border border-white/20 rounded-xl",
          "cursor-pointer transition-all hover:bg-white/10 hover:text-white active:scale-[0.98]",
        ]}
        onclick={onReroll}
        type="button"
        aria-label="Reroll prompts"
      >
        <i class="fa-solid fa-rotate text-lg"></i>
      </button>
      <button
        class={[
          "flex-1",
          "px-6 py-4",
          "text-lg font-semibold",
          "rounded-xl",
          "cursor-pointer transition-all active:scale-[0.98]",
          selectedIndex !== null ? "bg-white/15 text-white hover:bg-white/25" : "cursor-not-allowed bg-white/5 text-white/40",
        ]}
        onclick={handleSubmit}
        type="button"
        disabled={selectedIndex === null}
      >
        Continue
      </button>
    </div>
  </div>
</div>
