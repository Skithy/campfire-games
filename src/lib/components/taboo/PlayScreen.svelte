<script lang="ts">
  import TabooCard from "$lib/components/taboo/TabooCard.svelte"
  import type { TabooCard as TabooCardType } from "$lib/data/tabooCards"
  import type { Color } from "$lib/utils/colors"

  let {
    card,
    teamColor,
    timeRemaining,
    isPaused,
    onCorrect,
    onSkip,
    onTogglePause,
  }: {
    card: TabooCardType
    teamColor: Color
    timeRemaining: number
    isPaused: boolean
    onCorrect: () => void
    onSkip: () => void
    onTogglePause: () => void
  } = $props()

  let timerWarning = $derived(timeRemaining <= 10)
</script>

<div class="flex h-full w-full flex-col items-center gap-6 px-4 py-6">
  <!-- Timer -->
  <div class="flex items-center gap-4">
    <button
      class="flex h-12 w-12 cursor-pointer items-center justify-center rounded-full bg-white/10 text-white transition-all hover:bg-white/20 active:scale-95"
      onclick={onTogglePause}
      aria-label={isPaused ? "Resume timer" : "Pause timer"}
    >
      {#if isPaused}
        <i class="fa-solid fa-play text-lg"></i>
      {:else}
        <i class="fa-solid fa-pause text-lg"></i>
      {/if}
    </button>

    <div
      class="flex min-w-25 items-center justify-center rounded-xl px-6 py-3 text-4xl font-black tabular-nums text-white transition-colors {timerWarning
        ? 'bg-red-500'
        : 'bg-white/10'} {timerWarning && !isPaused ? 'animate-pulse' : ''}"
    >
      {timeRemaining}
    </div>

    {#if isPaused}
      <span class="text-sm font-medium uppercase tracking-wider text-white/60">Paused</span>
    {/if}
  </div>

  <!-- Card -->
  <div class="flex flex-1 items-center justify-center">
    <TabooCard {card} {teamColor} />
  </div>

  <!-- Action buttons -->
  <div class="flex w-full max-w-sm gap-3">
    <button
      class="flex flex-1 cursor-pointer items-center justify-center gap-2 rounded-xl bg-white/10 px-6 py-4 text-lg font-semibold text-white transition-all hover:bg-white/20 active:scale-[0.98]"
      onclick={onSkip}
    >
      <i class="fa-solid fa-forward text-base"></i>
      Skip
    </button>
    <button
      class="flex flex-1 cursor-pointer items-center justify-center gap-2 rounded-xl px-6 py-4 text-lg font-semibold text-white transition-all hover:opacity-90 active:scale-[0.98]"
      style:background-color={teamColor.toRgb()}
      onclick={onCorrect}
    >
      <i class="fa-solid fa-check text-base"></i>
      Correct!
    </button>
  </div>
</div>
