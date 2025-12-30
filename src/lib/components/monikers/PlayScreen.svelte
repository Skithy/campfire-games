<script lang="ts">
  import { fly } from "svelte/transition"

  import { getGameContainerContext } from "$lib/components/layout/gameContainerContext.svelte"
  import PageActions from "$lib/components/layout/PageActions.svelte"
  import { getSettingsContext } from "$lib/components/layout/settingsContext.svelte"
  import GameMenu from "$lib/components/monikers/GameMenu.svelte"
  import MonikersCard from "$lib/components/monikers/MonikersCard.svelte"
  import { IconButton } from "$lib/components/ui"
  import type { MonikersCard as MonikersCardType } from "$lib/data/monikersCards"
  import countdownSound from "$lib/sounds/game-countdown-3.mp3"
  import type { Color } from "$lib/utils/colors"

  let {
    card,
    teamColor,
    currentRound,
    roundName,
    timeRemaining,
    isPaused,
    cardsRemaining,
    onCorrect,
    onSkip,
    onTogglePause,
    onResetTurn,
    onSkipTeam,
    onResetGame,
  }: {
    card: MonikersCardType
    teamColor: Color
    currentRound: number
    roundName: string
    timeRemaining: number
    isPaused: boolean
    cardsRemaining: number
    onCorrect: () => void
    onSkip: () => void
    onTogglePause: () => void
    onResetTurn: () => void
    onSkipTeam: () => void
    onResetGame: () => void
  } = $props()

  let timerWarning = $derived(timeRemaining <= 10)

  const ctx = getGameContainerContext()
  const settings = getSettingsContext()

  $effect(() => {
    ctx.setBackground(teamColor, teamColor)
  })

  // Play countdown sound at 3 seconds
  $effect(() => {
    if (timeRemaining === 3 && !isPaused && settings.isMusicEnabled) {
      const audio = new Audio(countdownSound)
      audio.play()
    }
  })

  function handleResume() {
    onTogglePause()
  }

  // Swipe handling
  let dragX = $state(0)
  let dragY = $state(0)
  let isDragging = $state(false)
  let isExiting = $state(false)
  let hasVibratedThreshold = $state(false)
  let startX = 0
  let startY = 0

  const SWIPE_THRESHOLD = 100
  const ROTATION_FACTOR = 0.1
  const SWIPE_COOLDOWN = 500

  let rotation = $derived(dragX * ROTATION_FACTOR)
  let opacity = $derived(Math.max(0, 1 - Math.abs(dragX) / 300))

  function handlePointerDown(e: PointerEvent) {
    if (isPaused || isExiting) return
    isDragging = true
    hasVibratedThreshold = false
    startX = e.clientX
    startY = e.clientY
    ;(e.target as HTMLElement).setPointerCapture(e.pointerId)
  }

  function handlePointerMove(e: PointerEvent) {
    if (!isDragging) return
    dragX = e.clientX - startX
    dragY = e.clientY - startY

    if (!hasVibratedThreshold && Math.abs(dragX) >= SWIPE_THRESHOLD) {
      hasVibratedThreshold = true
      if (settings.isVibrationEnabled && navigator.vibrate) {
        navigator.vibrate(50)
      }
    }
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
      dragX = 0
      dragY = 0
    }, 200)

    setTimeout(() => {
      isExiting = false
    }, SWIPE_COOLDOWN)
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
  <!-- Header with round info, timer, and pause -->
  <div class="flex items-center justify-center gap-4">
    <!-- Round and cards remaining -->
    <div class="flex flex-col items-center gap-1 rounded-lg bg-white/10 px-4 py-2">
      <span class="text-sm font-bold text-white">{roundName}</span>
      <span class="text-xs text-white/60">R{currentRound} · {cardsRemaining} left</span>
    </div>

    <!-- Timer -->
    <div
      class={[
        "flex items-center justify-center",
        "min-w-20",
        "px-4 py-2",
        "text-3xl font-black text-white tabular-nums",
        timerWarning ? "bg-red-500" : "bg-white/10",
        "rounded-xl",
        "transition-colors",
        timerWarning && !isPaused ? "animate-pulse" : "",
      ]}
    >
      {timeRemaining}
    </div>

    <!-- Pause button -->
    <IconButton icon="fa-solid fa-pause" label="Pause game" onclick={onTogglePause} />
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
    {#key card.name}
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
        <MonikersCard {card} {teamColor} />
      </div>
    {/key}
  </div>

  <PageActions
    left={{
      label: "Skip",
      onclick: handleSkipClick,
      icon: "fa-solid fa-forward",
      variant: "standard",
    }}
    right={{
      label: "Correct!",
      onclick: handleCorrectClick,
      icon: "fa-solid fa-check",
      color: teamColor.toRgb(),
    }}
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
