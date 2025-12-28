<script lang="ts">
  import { fly } from "svelte/transition"

  import { getGameContainerContext } from "$lib/components/layout/gameContainerContext.svelte"
  import PageActions from "$lib/components/layout/PageActions.svelte"
  import GameMenu from "$lib/components/taboo/GameMenu.svelte"
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
    onResetTurn,
    onSkipTeam,
    onResetGame,
  }: {
    card: TabooCardType
    teamColor: Color
    timeRemaining: number
    isPaused: boolean
    onCorrect: () => void
    onSkip: () => void
    onTogglePause: () => void
    onResetTurn: () => void
    onSkipTeam: () => void
    onResetGame: () => void
  } = $props()

  let timerWarning = $derived(timeRemaining <= 10)

  const ctx = getGameContainerContext()
  $effect(() => {
    ctx.setBackground(teamColor, teamColor)
  })

  function handleResume() {
    onTogglePause()
  }

  // Swipe handling
  let dragX = $state(0)
  let dragY = $state(0)
  let isDragging = $state(false)
  let isExiting = $state(false)
  let startX = 0
  let startY = 0

  const SWIPE_THRESHOLD = 100
  const ROTATION_FACTOR = 0.1

  let rotation = $derived(dragX * ROTATION_FACTOR)
  let opacity = $derived(Math.max(0, 1 - Math.abs(dragX) / 300))

  function handlePointerDown(e: PointerEvent) {
    if (isPaused || isExiting) return
    isDragging = true
    startX = e.clientX
    startY = e.clientY
    ;(e.target as HTMLElement).setPointerCapture(e.pointerId)
  }

  function handlePointerMove(e: PointerEvent) {
    if (!isDragging) return
    dragX = e.clientX - startX
    dragY = e.clientY - startY
  }

  function handlePointerUp() {
    if (!isDragging) return
    isDragging = false

    if (dragX > SWIPE_THRESHOLD) {
      swipeOut(1, onCorrect)
    } else if (dragX < -SWIPE_THRESHOLD) {
      swipeOut(-1, onSkip)
    } else {
      dragX = 0
      dragY = 0
    }
  }

  function swipeOut(direction: number, callback: () => void) {
    isExiting = true
    dragX = direction * 400
    setTimeout(() => {
      callback()
      isExiting = false
      dragX = 0
      dragY = 0
    }, 200)
  }

  function handleCorrectClick() {
    if (isExiting) return
    swipeOut(1, onCorrect)
  }

  function handleSkipClick() {
    if (isExiting) return
    swipeOut(-1, onSkip)
  }
</script>

<div class="flex flex-1 flex-col gap-4">
  <!-- Pause/Menu button -->
  <button
    class={[
      "absolute top-4 right-4",
      "flex items-center justify-center",
      "h-10 w-10",
      "text-white",
      "bg-white/10",
      "rounded-full",
      "cursor-pointer transition-all hover:bg-white/20 active:scale-95",
    ]}
    onclick={onTogglePause}
    aria-label="Pause game"
  >
    <i class="fa-solid fa-pause text-lg"></i>
  </button>

  <!-- Timer -->
  <div class="flex items-center justify-center gap-4">
    <div
      class={[
        "flex items-center justify-center",
        "min-w-25",
        "px-6 py-3",
        "text-4xl font-black text-white tabular-nums",
        timerWarning ? "bg-red-500" : "bg-white/10",
        "rounded-xl",
        "transition-colors",
        timerWarning && !isPaused ? "animate-pulse" : "",
      ]}
    >
      {timeRemaining}
    </div>
  </div>

  <!-- Card -->
  <div class="relative flex min-h-0 w-full flex-1 items-center justify-center">
    <!-- Swipe indicators -->
    <div
      class={[
        "absolute right-0 z-10",
        "pointer-events-none flex items-center justify-center",
        "h-14 w-14",
        "text-2xl text-white",
        "rounded-full",
        "transition-opacity duration-150",
      ]}
      style:background-color={teamColor.toRgb()}
      style:opacity={Math.min(1, Math.max(0, dragX / SWIPE_THRESHOLD))}
    >
      <i class="fa-solid fa-check"></i>
    </div>
    <div
      class={[
        "absolute left-0 z-10",
        "pointer-events-none flex items-center justify-center",
        "h-14 w-14",
        "text-2xl text-white",
        "bg-white/30",
        "rounded-full",
        "transition-opacity duration-150",
      ]}
      style:opacity={Math.min(1, Math.max(0, -dragX / SWIPE_THRESHOLD))}
    >
      <i class="fa-solid fa-forward"></i>
    </div>

    <!-- Swipeable card -->
    {#key card.word}
      <div
        class="absolute touch-none select-none"
        class:cursor-grab={!isDragging && !isPaused}
        class:cursor-grabbing={isDragging}
        style:transform="translateX({dragX}px) translateY({dragY * 0.3}px) rotate({rotation}deg)"
        style:opacity
        style:transition={isDragging ? "none" : "transform 0.2s ease, opacity 0.2s ease"}
        in:fly={{ y: -50, duration: 200, opacity: 0 }}
        onpointerdown={handlePointerDown}
        onpointermove={handlePointerMove}
        onpointerup={handlePointerUp}
        onpointercancel={handlePointerUp}
        role="button"
        tabindex="0"
      >
        <TabooCard {card} {teamColor} />
      </div>
    {/key}
  </div>

  <PageActions
    equalButtons={true}
    backIcon="fa-solid fa-forward"
    primaryIcon="fa-solid fa-check"
    primaryColor={teamColor.toRgb()}
    onBack={handleSkipClick}
    onPrimary={handleCorrectClick}
    primaryLabel="Correct!"
    backLabel="Skip"
  />
</div>

<GameMenu
  isOpen={isPaused}
  {teamColor}
  showResume={true}
  showResetTurn={true}
  onClose={handleResume}
  onResume={handleResume}
  {onResetTurn}
  {onSkipTeam}
  onEndGame={onResetGame}
/>
