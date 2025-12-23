<script lang="ts">
  import type { TabooCard } from "$lib/data/tabooCards"
  import type { Color } from "$lib/utils/colors"

  let {
    teamName,
    teamColor,
    correctCards,
    skippedCards,
    onNextRound,
  }: {
    teamName: string
    teamColor: Color
    correctCards: TabooCard[]
    skippedCards: TabooCard[]
    onNextRound: () => void
  } = $props()

  let totalCards = $derived(correctCards.length + skippedCards.length)
</script>

<div class="flex h-full w-full flex-col items-center gap-8 px-4 py-6">
  <!-- Header -->
  <div class="space-y-2 text-center">
    <p class="text-sm font-medium uppercase tracking-widest text-white/60">Time's Up!</p>
    <h1 class="text-4xl font-black text-white" style:color={teamColor.toRgb()}>
      {teamName}
    </h1>
  </div>

  <!-- Score summary -->
  <div class="flex w-full max-w-sm gap-4">
    <div
      class="flex flex-1 flex-col items-center gap-1 rounded-xl py-4"
      style:background-color={teamColor.toRgba(0.2)}
    >
      <span class="text-4xl font-black" style:color={teamColor.toRgb()}>{correctCards.length}</span>
      <span class="text-sm font-medium text-white/60">Correct</span>
    </div>
    <div class="flex flex-1 flex-col items-center gap-1 rounded-xl bg-white/10 py-4">
      <span class="text-4xl font-black text-white/80">{skippedCards.length}</span>
      <span class="text-sm font-medium text-white/60">Skipped</span>
    </div>
  </div>

  <!-- Card lists -->
  <div class="flex w-full max-w-sm flex-1 flex-col gap-4 overflow-auto">
    {#if correctCards.length > 0}
      <div class="space-y-2">
        <h3 class="text-sm font-semibold uppercase tracking-wider" style:color={teamColor.toRgb()}>
          <i class="fa-solid fa-check mr-2"></i>Correct
        </h3>
        <div class="flex flex-wrap gap-2">
          {#each correctCards as card (card.word)}
            <span
              class="rounded-lg px-3 py-1.5 text-sm font-medium text-white"
              style:background-color={teamColor.toRgba(0.3)}
            >
              {card.word}
            </span>
          {/each}
        </div>
      </div>
    {/if}

    {#if skippedCards.length > 0}
      <div class="space-y-2">
        <h3 class="text-sm font-semibold uppercase tracking-wider text-white/60">
          <i class="fa-solid fa-forward mr-2"></i>Skipped
        </h3>
        <div class="flex flex-wrap gap-2">
          {#each skippedCards as card (card.word)}
            <span class="rounded-lg bg-white/10 px-3 py-1.5 text-sm font-medium text-white/60">
              {card.word}
            </span>
          {/each}
        </div>
      </div>
    {/if}
  </div>

  <!-- Next round button -->
  <button
    class="w-full max-w-sm cursor-pointer rounded-xl px-6 py-4 text-lg font-semibold text-white transition-all hover:opacity-90 active:scale-[0.98]"
    style:background-color={teamColor.toRgb()}
    onclick={onNextRound}
  >
    Next Team
  </button>
</div>
