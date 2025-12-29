<script lang="ts">
  import { getGameContainerContext } from "$lib/components/layout/gameContainerContext.svelte"
  import PageActions from "$lib/components/layout/PageActions.svelte"
  import GameMenu from "$lib/components/taboo/GameMenu.svelte"
  import { IconButton } from "$lib/components/ui"
  import type { Color } from "$lib/utils/colors"

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
<IconButton
  icon="fa-solid fa-bars"
  label="Open menu"
  class="absolute top-4 right-4"
  onclick={() => (showMenu = true)}
/>

<div class="flex flex-1 flex-col items-center justify-between gap-6">
  <div class="flex flex-1 flex-col items-center justify-center gap-6">
    <div class="space-y-2 text-center">
      <p class="text-sm font-medium tracking-widest text-white/60 uppercase">Get Ready</p>
      <h1 class="text-3xl font-black text-white" style:color={teamColor.toRgb()}>
        {teamName}
      </h1>
      <p class="text-sm text-white/70">Pass the device to your team's clue giver</p>
    </div>

    <div
      class={[
        "max-w-md",
        "p-6",
        "text-center",
        "bg-white/5",
        "rounded-xl",
        "backdrop-blur-sm",
        "space-y-3",
      ]}
    >
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

  <PageActions right={{ label: "Start Round", onclick: onStart }} />
</div>

<GameMenu
  isOpen={showMenu}
  {teamColor}
  showContinue={true}
  onClose={() => (showMenu = false)}
  {onSkipTeam}
  onEndGame={onResetGame}
/>
