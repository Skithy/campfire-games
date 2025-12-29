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
    ctx.setOrientation("landscape")

    return () => {
      ctx.setOrientation("portrait")
    }
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
  let exitDirection = $state<"correct" | "skip" | null>(null)
  let baseBeta = $state<number | null>(null)
  let calibrationSamples = $state<number[]>([])
  let currentBeta = $state<number | null>(null)
  let tiltFromBase = $derived(baseBeta !== null && currentBeta !== null ? currentBeta - baseBeta : null)

  // Thresholds for tilt detection (degrees from calibrated position)
  const TILT_DOWN_THRESHOLD = 45 // Tilt phone down (nod forward) for correct
  const TILT_UP_THRESHOLD = -30 // Tilt phone up (lean back) for skip

  function handleOrientation(e: DeviceOrientationEvent) {
    if (e.beta === null) return

    currentBeta = e.beta

    if (isPaused || isExiting) return

    // Calibrate the base position from first few readings
    if (baseBeta === null) {
      calibrationSamples = [...calibrationSamples, e.beta]
      if (calibrationSamples.length >= 5) {
        // Use median of samples as baseline
        const sorted = [...calibrationSamples].sort((a, b) => a - b)
        baseBeta = sorted[Math.floor(sorted.length / 2)]
      }
      return
    }

    const tilt = e.beta - baseBeta

    // Tilt down (positive beta increase) = correct
    if (tilt >= TILT_DOWN_THRESHOLD) {
      triggerAction("correct")
    }
    // Tilt up (negative beta decrease) = skip
    else if (tilt <= TILT_UP_THRESHOLD) {
      triggerAction("skip")
    }
  }

  function resetCalibration() {
    baseBeta = null
    calibrationSamples = []
  }

  function triggerAction(action: "correct" | "skip") {
    if (isExiting) return
    isExiting = true
    exitDirection = action

    if (settings.isVibrationEnabled && navigator.vibrate) {
      navigator.vibrate(action === "correct" ? [100, 50, 100] : 100)
    }

    setTimeout(() => {
      if (action === "correct") {
        onCorrect()
      } else {
        onSkip()
      }
      isExiting = false
      exitDirection = null
      resetCalibration()
    }, 300)
  }

  function handleCorrectClick() {
    triggerAction("correct")
  }

  function handleSkipClick() {
    triggerAction("skip")
  }

  function handleKeydown(e: KeyboardEvent) {
    if (isPaused || isExiting) return

    if (e.key === "ArrowUp") {
      e.preventDefault()
      triggerAction("skip")
    } else if (e.key === "ArrowDown") {
      e.preventDefault()
      triggerAction("correct")
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

<div class="flex h-full w-full flex-col gap-2">
  <!-- Skip zone (top) -->
  <button
    class={[
      "flex flex-1 flex-col items-center justify-center gap-2",
      "cursor-pointer",
      "bg-white/5",
      "rounded-2xl",
      "transition-all active:bg-white/15",
      isExiting && exitDirection === "skip" ? "bg-white/20" : "",
    ]}
    onclick={handleSkipClick}
  >
    <i class="fa-solid fa-forward text-4xl text-white/40"></i>
    <span class="text-lg font-medium text-white/40">Skip</span>
  </button>

  <!-- Center area with word -->
  <div class="relative flex items-center justify-center px-4 py-4">
    <!-- Pause button and Timer (right side) -->
    <div class="absolute top-1/2 right-0 flex -translate-y-1/2 items-center gap-2">
      <button
        class={[
          "flex items-center justify-center",
          "h-12 w-12",
          "cursor-pointer",
          "text-xl text-white/60",
          "bg-white/10",
          "rounded-full",
          "transition-colors hover:bg-white/20",
        ]}
        onclick={onTogglePause}
        aria-label="Pause game"
      >
        <i class="fa-solid fa-pause"></i>
      </button>

      <div
        class={[
          "flex items-center justify-center",
          "h-12 w-12",
          "text-xl font-black text-white tabular-nums",
          timerWarning ? "bg-red-500" : "bg-white/20",
          "rounded-full",
          "transition-colors",
          timerWarning && !isPaused ? "animate-pulse" : "",
        ]}
      >
        {timeRemaining}
      </div>
    </div>

    <!-- Word display -->
    {#key word}
      <div
        class={[
          "flex items-center justify-center",
          "transition-all duration-300",
          isExiting && exitDirection === "correct" && "translate-y-16 opacity-0",
          isExiting && exitDirection === "skip" && "-translate-y-16 opacity-0",
        ]}
        in:fly={{ y: exitDirection === "correct" ? 50 : -50, duration: 200, opacity: 0 }}
      >
        <h1
          class="text-center text-5xl font-black tracking-tight text-white uppercase drop-shadow-lg"
          style:text-shadow="0 4px 20px rgba(0,0,0,0.3)"
        >
          {word}
        </h1>
      </div>
    {/key}
  </div>

  <!-- Correct zone (bottom) -->
  <button
    class={[
      "flex flex-1 flex-col items-center justify-center gap-2",
      "cursor-pointer",
      "rounded-2xl",
      "transition-all",
    ]}
    style:background-color={GREEN.toRgba(isExiting && exitDirection === "correct" ? 0.35 : 0.15)}
    onclick={handleCorrectClick}
  >
    <i class="fa-solid fa-check text-4xl" style:color={GREEN.toRgba(0.6)}></i>
    <span class="text-lg font-medium" style:color={GREEN.toRgba(0.6)}>Correct</span>
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

<!-- Debug overlay for tilt controls -->
<div
  class={[
    "fixed bottom-4 left-4",
    "p-3",
    "text-xs font-mono text-white",
    "bg-black/70",
    "rounded-lg",
    "space-y-1",
  ]}
>
  <div class="font-bold text-yellow-400">Tilt Debug</div>
  <div>
    Status: {baseBeta === null ? `Calibrating (${calibrationSamples.length}/5)` : "Ready"}
  </div>
  <div>Beta: {currentBeta?.toFixed(1) ?? "—"}</div>
  <div>Base: {baseBeta?.toFixed(1) ?? "—"}</div>
  <div
    class={[
      tiltFromBase !== null && tiltFromBase >= TILT_DOWN_THRESHOLD && "text-green-400",
      tiltFromBase !== null && tiltFromBase <= TILT_UP_THRESHOLD && "text-orange-400",
    ]}
  >
    Tilt: {tiltFromBase?.toFixed(1) ?? "—"}
  </div>
  <div class="pt-1 border-t border-white/20 text-white/60">
    <div>↓ Correct: ≥{TILT_DOWN_THRESHOLD}°</div>
    <div>↑ Skip: ≤{TILT_UP_THRESHOLD}°</div>
  </div>
  <!-- Visual tilt indicator -->
  <div class="pt-1">
    <div class="relative h-4 bg-white/20 rounded overflow-hidden">
      <!-- Skip zone -->
      <div
        class="absolute left-0 h-full bg-orange-500/30"
        style:width="30%"
      ></div>
      <!-- Correct zone -->
      <div
        class="absolute right-0 h-full bg-green-500/30"
        style:width="30%"
      ></div>
      <!-- Current position indicator -->
      {#if tiltFromBase !== null}
        <div
          class="absolute top-0 h-full w-1 bg-white"
          style:left={`${Math.min(100, Math.max(0, ((tiltFromBase + 50) / 100) * 100))}%`}
        ></div>
      {/if}
    </div>
    <div class="flex justify-between text-[10px] text-white/40">
      <span>-50°</span>
      <span>0°</span>
      <span>+50°</span>
    </div>
  </div>
</div>
