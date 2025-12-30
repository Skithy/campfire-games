<script lang="ts">
  import { onMount } from "svelte"
  import { fly } from "svelte/transition"

  import { getGameContainerContext } from "$lib/components/layout/gameContainerContext.svelte"
  import { getSettingsContext } from "$lib/components/layout/settingsContext.svelte"
  import { GREEN, PURPLE } from "$lib/constants/colors"
  import countdownSound from "$lib/sounds/game-countdown-3.mp3"

  import GameMenu from "./GameMenu.svelte"

  let {
    word,
    timeRemaining,
    isPaused,
    onCorrect,
    onSkip,
    onTogglePause,
    onResetTurn,
    onResetGame,
  }: {
    word: string
    timeRemaining: number
    isPaused: boolean
    onCorrect: () => void
    onSkip: () => void
    onTogglePause: () => void
    onResetTurn: () => void
    onResetGame: () => void
  } = $props()

  let timerWarning = $derived(timeRemaining <= 10)

  const ctx = getGameContainerContext()
  const settings = getSettingsContext()

  $effect(() => {
    ctx.setBackground(GREEN, PURPLE)
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

  // Tilt detection
  let isExiting = $state(false)

  // Drag handling (similar to Taboo)
  let dragX = $state(0)
  let dragY = $state(0)
  let isDragging = $state(false)
  let hasVibratedThreshold = $state(false)
  let startX = 0
  let startY = 0

  const SWIPE_THRESHOLD = 80
  const ROTATION_FACTOR = 0.05
  const SWIPE_COOLDOWN = 500

  let rotation = $derived(dragY * ROTATION_FACTOR)
  let opacity = $derived(Math.max(0, 1 - Math.abs(dragY) / 250))

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

    // When screen is rotated 90deg, swap X/Y for correct direction
    if (ctx.isRotated) {
      dragX = e.clientY - startY
      dragY = -(e.clientX - startX)
    } else {
      dragX = e.clientX - startX
      dragY = e.clientY - startY
    }

    // Vibrate when crossing the swipe threshold
    if (!hasVibratedThreshold && Math.abs(dragY) >= SWIPE_THRESHOLD) {
      hasVibratedThreshold = true
      if (settings.isVibrationEnabled && navigator.vibrate) {
        navigator.vibrate(50)
      }
    }
  }

  function handlePointerUp() {
    if (!isDragging) return
    isDragging = false

    if (dragY > SWIPE_THRESHOLD) {
      // Swipe down = correct
      swipeOut(1, onCorrect)
    } else if (dragY < -SWIPE_THRESHOLD) {
      // Swipe up = skip
      swipeOut(-1, onSkip)
    } else {
      dragX = 0
      dragY = 0
    }
  }

  function swipeOut(direction: number, callback: () => void) {
    isExiting = true
    dragY = direction * 300

    if (settings.isVibrationEnabled && navigator.vibrate) {
      navigator.vibrate(100)
    }

    // Wait for exit animation to complete before showing new word
    setTimeout(() => {
      callback()
      dragX = 0
      dragY = 0
    }, 200)

    setTimeout(() => {
      isExiting = false
    }, SWIPE_COOLDOWN)
  }

  // Landscape tilt thresholds (using gamma for landscape orientation)
  // gamma: ±90° = phone vertical (perpendicular to ground)
  // gamma: 0° = phone horizontal (screen up OR screen down)
  // Correct: 0° to 45° (tilting down)
  // Skip: -45° to 0° (tilting up)
  // Reset: > 70° or < -70°

  let tiltReady = $state(true) // Must return to neutral before next tilt

  function handleOrientation(e: DeviceOrientationEvent) {
    if (e.gamma === null || isPaused || isExiting) return

    const gamma = e.gamma

    // Check if returned to near-vertical (neutral) zone
    if (!tiltReady && (gamma > 70 || gamma < -70)) {
      tiltReady = true
      if (settings.isVibrationEnabled && navigator.vibrate) {
        navigator.vibrate(30)
      }
    }

    if (!tiltReady) return

    // Check for correct action (0° to 45°)
    if (gamma >= 0 && gamma <= 45) {
      tiltReady = false
      swipeOut(1, onCorrect)
    }
    // Check for skip action (-45° to 0°)
    else if (gamma >= -45 && gamma < 0) {
      tiltReady = false
      swipeOut(-1, onSkip)
    }
  }

  function handleKeydown(e: KeyboardEvent) {
    if (isPaused || isExiting) return

    if (e.key === "ArrowUp") {
      e.preventDefault()
      swipeOut(-1, onSkip)
    } else if (e.key === "ArrowDown") {
      e.preventDefault()
      swipeOut(1, onCorrect)
    }
  }

  onMount(() => {
    window.addEventListener("keydown", handleKeydown)
    // Permission is requested in GetReadyScreen before navigating here
    window.addEventListener("deviceorientation", handleOrientation)

    return () => {
      window.removeEventListener("keydown", handleKeydown)
      window.removeEventListener("deviceorientation", handleOrientation)
    }
  })
</script>

<div class="flex h-full w-full flex-row gap-6">
  <!-- Left side: Swipe area with word -->
  <div class="relative flex flex-1 flex-col">
    <!-- Skip indicator (top) -->
    <div
      class={[
        "pointer-events-none absolute top-0 right-0 left-0 z-10",
        "flex flex-col items-center justify-center gap-2",
        "py-4",
        "bg-white/30",
        "rounded-t-2xl",
        "transition-opacity duration-150",
      ]}
      style:opacity={Math.min(1, Math.max(0, -dragY / SWIPE_THRESHOLD))}
    >
      <i class="fa-solid fa-forward text-2xl text-white"></i>
      <span class="text-sm font-medium text-white">Skip</span>
    </div>

    <!-- Correct indicator (bottom) -->
    <div
      class={[
        "pointer-events-none absolute right-0 bottom-0 left-0 z-10",
        "flex flex-col items-center justify-center gap-2",
        "py-4",
        "rounded-b-2xl",
        "transition-opacity duration-150",
      ]}
      style:background-color={GREEN.toRgb()}
      style:opacity={Math.min(1, Math.max(0, dragY / SWIPE_THRESHOLD))}
    >
      <span class="text-sm font-medium text-white">Correct!</span>
      <i class="fa-solid fa-check text-2xl text-white"></i>
    </div>

    <!-- Draggable card area -->
    <div class="relative flex flex-1 items-center justify-center">
      {#key word}
        <div
          class={[
            "absolute touch-none select-none",
            "flex items-center justify-center",
            "h-44 w-80",
            "px-6 py-4",
            "bg-white/10",
            "rounded-2xl",
            "backdrop-blur-sm",
          ]}
          class:cursor-grab={!isDragging && !isPaused}
          class:cursor-grabbing={isDragging}
          style:transform="translateY({dragY}px) translateX({dragX * 0.3}px) rotate({rotation}deg)"
          style:opacity
          style:transition={isDragging ? "none" : "transform 0.2s ease, opacity 0.2s ease"}
          in:fly={{ x: -50, duration: 200, opacity: 0 }}
          onpointerdown={handlePointerDown}
          onpointermove={handlePointerMove}
          onpointerup={handlePointerUp}
          onpointercancel={handlePointerUp}
          role="button"
          tabindex="0"
        >
          <h1
            class={[
              "text-center font-black tracking-tight text-white uppercase drop-shadow-lg",
              word.length > 12 ? "text-3xl" : "text-4xl",
            ]}
            style:text-shadow="0 4px 20px rgba(0,0,0,0.3)"
          >
            {word}
          </h1>
        </div>
      {/key}
    </div>
  </div>

  <!-- Right side: Pause tap target and Timer -->
  <button
    class={[
      "flex flex-col items-center justify-center gap-4",
      "w-24",
      "cursor-pointer",
      "bg-transparent",
      "transition-colors active:bg-white/10",
    ]}
    onclick={onTogglePause}
    aria-label="Pause game"
  >
    <i class="fa-solid fa-pause text-2xl text-white/60"></i>

    <div
      class={[
        "flex items-center justify-center",
        "h-16 w-16",
        "text-2xl font-black text-white tabular-nums",
        timerWarning ? "bg-red-500" : "bg-white/20",
        "rounded-full",
        "transition-colors",
        timerWarning && !isPaused ? "animate-pulse" : "",
      ]}
    >
      {timeRemaining}
    </div>
  </button>
</div>

<GameMenu
  isOpen={isPaused}
  showResume={true}
  showResetTurn={true}
  onClose={handleResume}
  onResume={handleResume}
  {onResetTurn}
  onEndGame={onResetGame}
/>
