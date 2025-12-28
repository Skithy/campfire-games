<script lang="ts">
  import PageActions from "$lib/components/layout/PageActions.svelte"
  import GameMenu from "$lib/components/taboo/GameMenu.svelte"
  import type { Color } from "$lib/utils/colors"

  import { getGameContainerContext } from "./gameContainerContext.svelte"

  let {
    teamName,
    teamColor,
    onStart,
    onSkipTeam,
    onResetGame,
  }: {
    teamName: string
    teamColor: Color
    onStart: () => void
    onSkipTeam: () => void
    onResetGame: () => void
  } = $props()

  let showMenu = $state(false)

  const ctx = getGameContainerContext()
  $effect(() => {
    ctx.setBackground(teamColor, teamColor)
  })
</script>

<!-- Menu button -->
<button
  class="absolute top-4 right-4 flex h-10 w-10 cursor-pointer items-center justify-center rounded-full bg-white/10 text-white transition-all hover:bg-white/20 active:scale-95"
  onclick={() => (showMenu = true)}
  aria-label="Open menu"
>
  <i class="fa-solid fa-bars text-lg"></i>
</button>

<div class="flex flex-1 flex-col items-center justify-between gap-6">
  <div class="flex flex-1 flex-col items-center justify-center gap-6">
    <div class="space-y-2 text-center">
      <p class="text-sm font-medium tracking-widest text-white/60 uppercase">Get Ready</p>
      <h1 class="text-3xl font-black text-white sm:text-4xl" style:color={teamColor.toRgb()}>
        {teamName}
      </h1>
      <p class="text-sm text-white/70">Pass the device to your team's clue giver</p>
    </div>

    <div class="max-w-md space-y-3 rounded-xl bg-white/5 p-6 text-center backdrop-blur-sm">
      <h3 class="text-lg font-bold text-white">Rules for the Clue Giver:</h3>
      <ul class="space-y-2 text-left text-sm text-white/80">
        <li class="flex gap-2">
          <i class="fa-solid fa-check mt-0.5 shrink-0 text-xs" style:color={teamColor.toRgb()}></i>
          <span>Give clues to help your team guess the word</span>
        </li>
        <li class="flex gap-2">
          <i class="fa-solid fa-xmark mt-0.5 shrink-0 text-xs text-red-400"></i>
          <span>Don't say forbidden words or parts of the main word</span>
        </li>
        <li class="flex gap-2">
          <i class="fa-solid fa-forward mt-0.5 shrink-0 text-xs text-white/60"></i>
          <span>Skip gives the other team a point</span>
        </li>
        <li class="flex gap-2">
          <i class="fa-solid fa-stopwatch mt-0.5 shrink-0 text-xs text-white/60"></i>
          <span>60 seconds per round</span>
        </li>
      </ul>
    </div>
  </div>

  <PageActions singleButton={true} onPrimary={onStart} primaryLabel="Start Round" />
</div>

<GameMenu
  isOpen={showMenu}
  {teamColor}
  showContinue={true}
  onClose={() => (showMenu = false)}
  {onSkipTeam}
  onEndGame={onResetGame}
/>
