<script lang="ts">
  import PageActions from "$lib/components/layout/PageActions.svelte"
  import type { TabooCard } from "$lib/data/tabooCards"
  import type { Color } from "$lib/utils/colors"

  let {
    teamName,
    teamColor,
    correctCards,
    skippedCards,
    onNextRound,
    onEndGame,
  }: {
    teamName: string
    teamColor: Color
    correctCards: TabooCard[]
    skippedCards: TabooCard[]
    onNextRound: () => void
    onEndGame: () => void
  } = $props()
</script>

<!-- Header -->
<div class="space-y-2 text-center">
  <p class="text-sm font-medium tracking-widest text-white/60 uppercase">Time's Up!</p>
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
      <h3 class="text-sm font-semibold tracking-wider uppercase" style:color={teamColor.toRgb()}>
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
      <h3 class="text-sm font-semibold tracking-wider text-white/60 uppercase">
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

<PageActions
  equalButtons={true}
  backIcon="fa-solid fa-house"
  primaryIcon="fa-solid fa-arrow-right"
  primaryColor={teamColor.toRgb()}
  onBack={onEndGame}
  onPrimary={onNextRound}
  primaryLabel="Next Team"
  backLabel="End Game"
/>
