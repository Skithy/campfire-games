<script lang="ts">
  import { getGameContainerContext } from "$lib/components/layout/gameContainerContext.svelte"
  import PageActions from "$lib/components/layout/PageActions.svelte"
  import GameMenu from "$lib/components/monikers/GameMenu.svelte"
  import { IconButton } from "$lib/components/ui"
  import type { Color } from "$lib/utils/colors"

  let {
    teamName,
    teamColor,
    currentRound,
    roundName,
    roundDescription,
    cardsRemaining,
    onStart,
    onSkipTeam,
    onResetGame,
  }: {
    teamName: string
    teamColor: Color
    currentRound: number
    roundName: string
    roundDescription: string
    cardsRemaining: number
    onStart: () => void
    onSkipTeam: () => void
    onResetGame: () => void
  } = $props()

  let showMenu = $state(false)

  const ctx = getGameContainerContext()
  $effect(() => {
    ctx.setBackground(teamColor, teamColor)
  })

  const roundIcons = ["fa-solid fa-comments", "fa-solid fa-1", "fa-solid fa-hand"]
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
    <!-- Round indicator -->
    <div class="flex items-center gap-2">
      {#each [1, 2, 3] as round}
        <div
          class={[
            "flex items-center justify-center",
            "h-8 w-8",
            "rounded-full",
            "text-sm font-bold",
            "transition-all",
          ]}
          style:background-color={round === currentRound
            ? teamColor.toRgb()
            : round < currentRound
              ? "rgba(255,255,255,0.3)"
              : "rgba(255,255,255,0.1)"}
          style:color={round <= currentRound ? "white" : "rgba(255,255,255,0.5)"}
        >
          {round}
        </div>
      {/each}
    </div>

    <div class="space-y-2 text-center">
      <p class="text-sm font-medium tracking-widest text-white/60 uppercase">
        Round {currentRound}
      </p>
      <h1 class="text-3xl font-black text-white" style:color={teamColor.toRgb()}>
        {teamName}
      </h1>
    </div>

    <div
      class={[
        "max-w-md",
        "p-6",
        "text-center",
        "bg-white/5",
        "rounded-xl",
        "backdrop-blur-sm",
        "space-y-4",
      ]}
    >
      <div class="flex items-center justify-center gap-3">
        <i class="{roundIcons[currentRound - 1]} text-2xl" style:color={teamColor.toRgb()}></i>
        <h3 class="text-xl font-bold text-white">{roundName}</h3>
      </div>

      <p class="text-white/80">{roundDescription}</p>

      <div class="flex items-center justify-center gap-2 pt-2 text-sm text-white/60">
        <i class="fa-solid fa-layer-group"></i>
        <span>{cardsRemaining} cards remaining</span>
      </div>
      <div class="hidden text-[10px] text-white/40 lg:flex lg:items-center lg:justify-center lg:gap-6">
        <span>← Skip</span>
        <span>→ Correct</span>
        <span>Esc Menu</span>
      </div>
    </div>
  </div>

  <PageActions right={{ label: "Start Turn", onclick: onStart }} />
</div>

<GameMenu
  isOpen={showMenu}
  {teamColor}
  showContinue={true}
  onClose={() => (showMenu = false)}
  {onSkipTeam}
  onEndGame={onResetGame}
/>
