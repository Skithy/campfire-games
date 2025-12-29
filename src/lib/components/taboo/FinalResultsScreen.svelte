<script lang="ts">
  import { getGameContainerContext } from "$lib/components/layout/gameContainerContext.svelte"
  import { Button } from "$lib/components/ui"
  import { TEAM_BLUE, TEAM_RED } from "$lib/constants/teams"

  let {
    redScore,
    blueScore,
    onPlayAgain,
  }: {
    redScore: number
    blueScore: number
    onPlayAgain: () => void
  } = $props()

  let winner = $derived(redScore > blueScore ? TEAM_RED : blueScore > redScore ? TEAM_BLUE : null)

  const ctx = getGameContainerContext()
  $effect(() => {
    if (winner) {
      ctx.setBackground(winner.color, winner.color)
    } else {
      // Tie - use red/blue split
      ctx.setBackground(TEAM_RED.color, TEAM_BLUE.color)
    }
  })
</script>

<div class="flex flex-1 flex-col items-center justify-center gap-8">
  <!-- Header -->
  <div class="space-y-2 text-center">
    <p class="text-lg font-medium tracking-widest text-white/60 uppercase">Game Over</p>
    {#if winner}
      <h1 class="text-4xl font-black text-white" style:color={winner.color.toRgb()}>
        {winner.name} Wins!
      </h1>
    {:else}
      <h1 class="text-4xl font-black text-white">It's a Tie!</h1>
    {/if}
  </div>

  <!-- Final scores -->
  <div class="flex w-full max-w-sm gap-4">
    <div
      class="flex flex-1 flex-col items-center gap-2 rounded-xl border py-6"
      style:border-color={TEAM_RED.color.toRgba(0.3)}
      style:background-color={TEAM_RED.color.toRgba(winner === TEAM_RED ? 0.2 : 0.1)}
    >
      <span class="text-5xl font-black" style:color={TEAM_RED.color.toRgb()}>{redScore}</span>
      <span class="text-sm font-medium text-white/60">{TEAM_RED.name}</span>
    </div>
    <div
      class="flex flex-1 flex-col items-center gap-2 rounded-xl border py-6"
      style:border-color={TEAM_BLUE.color.toRgba(0.3)}
      style:background-color={TEAM_BLUE.color.toRgba(winner === TEAM_BLUE ? 0.2 : 0.1)}
    >
      <span class="text-5xl font-black" style:color={TEAM_BLUE.color.toRgb()}>{blueScore}</span>
      <span class="text-sm font-medium text-white/60">{TEAM_BLUE.name}</span>
    </div>
  </div>

  <!-- Action buttons -->
  <div class="flex w-full max-w-sm flex-col gap-3">
    <Button
      variant="standard"
      size="lg"
      icon="fa-solid fa-rotate-right"
      color={winner ? winner.color.toRgb() : TEAM_RED.color.toRgb()}
      onclick={onPlayAgain}
    >
      Play Again
    </Button>
    <Button variant="outline" size="lg" icon="fa-solid fa-arrow-left" href="/">
      Back to Games
    </Button>
  </div>
</div>
