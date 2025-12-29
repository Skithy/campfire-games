<script lang="ts">
  import { onMount } from "svelte"
  import { fly } from "svelte/transition"

  import {
    getGameContainerContext,
    Orientation,
  } from "$lib/components/layout/gameContainerContext.svelte"
  import Modal from "$lib/components/layout/Modal.svelte"
  import { getSettingsContext } from "$lib/components/layout/settingsContext.svelte"
  import { Button } from "$lib/components/ui"
  import { GREEN, PURPLE } from "$lib/constants/colors"
  import countdownSound from "$lib/sounds/game-countdown-3.mp3"
  import { checkSensorPermissions, SensorPermissionStatus } from "$lib/utils/sensors"

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
    ctx.setOrientation(Orientation.Landscape)
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
  let currentBeta = $state<number | null>(null)
  let orientationSupported = $state<boolean | null>(null)
  let eventCount = $state(0)
  let permissionStatus = $state<SensorPermissionStatus | null>(null)
  let showSensorHelp = $state(false)

  let sensorWarning = $derived.by(() => {
    switch (permissionStatus) {
      case SensorPermissionStatus.Granted:
      case null:
        return null
      case SensorPermissionStatus.Denied:
        return "Tilt controls blocked"
      case SensorPermissionStatus.Unsupported:
        return "Tilt not supported"
      case SensorPermissionStatus.Prompt:
        return "Tilt permission needed"
      case SensorPermissionStatus.Unknown:
        return "Tilt status unknown"
    }
  })

  // Landscape tilt thresholds (using gamma for landscape orientation)
  // gamma: -90° to 90°, where 0° = phone upright in landscape
  // Positive gamma = phone tilted right (face down when held to forehead)
  // Negative gamma = phone tilted left (face up when held to forehead)
  const PHONE_DOWN_THRESHOLD = 45 // Phone tilted face down = correct
  const PHONE_UP_THRESHOLD = -45 // Phone tilted face up = skip
  const NEUTRAL_MIN = -20 // Neutral zone
  const NEUTRAL_MAX = 20

  let tiltReady = $state(true) // Must return to neutral before next tilt

  function handleOrientation(e: DeviceOrientationEvent) {
    eventCount++

    if (e.gamma === null) {
      orientationSupported = false
      return
    }

    orientationSupported = true
    currentBeta = e.gamma // Reusing currentBeta state for gamma value

    if (isPaused || isExiting) return

    // Check if returned to neutral zone
    if (!tiltReady && e.gamma >= NEUTRAL_MIN && e.gamma <= NEUTRAL_MAX) {
      tiltReady = true
    }

    if (!tiltReady) return

    // Phone tilted face down = correct
    if (e.gamma >= PHONE_DOWN_THRESHOLD) {
      tiltReady = false
      triggerAction("correct")
    }
    // Phone tilted face up = skip
    else if (e.gamma <= PHONE_UP_THRESHOLD) {
      tiltReady = false
      triggerAction("skip")
    }
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

    checkSensorPermissions().then((status) => {
      permissionStatus = status
    })

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

<!-- Sensor warning -->
{#if sensorWarning}
  <button
    class={[
      "fixed top-4 left-1/2 -translate-x-1/2",
      "flex items-center gap-2",
      "px-3 py-2",
      "text-xs font-medium text-white",
      "bg-yellow-500/80",
      "rounded-full",
      "cursor-pointer",
    ]}
    onclick={() => (showSensorHelp = true)}
  >
    <i class="fa-solid fa-triangle-exclamation"></i>
    {sensorWarning}
  </button>
{/if}

<Modal bind:isOpen={showSensorHelp} title="Enable Tilt Controls">
  <div class="space-y-4 p-6 text-sm text-white/80">
    <p>
      Your browser is blocking access to motion sensors. Tilt controls won't work, but you can still
      use <strong class="text-white">tap controls</strong>.
    </p>

    <div class="space-y-3">
      <p class="font-medium text-white">To enable tilt controls:</p>
      <ol class="ml-4 list-decimal space-y-2">
        <li>Check your browser's site settings or privacy controls</li>
        <li>Allow "Motion sensors" or "Device orientation" access</li>
        <li>Refresh the page after changing settings</li>
      </ol>
    </div>

    <div class="pt-2 text-xs text-white/50">
      Common locations: Shield icon (Brave), Lock icon (Chrome), or Settings → Site permissions
    </div>

    <div class="flex justify-end pt-2">
      <Button variant="standard" onclick={() => (showSensorHelp = false)}>Got it</Button>
    </div>
  </div>
</Modal>

<!-- Debug overlay for tilt controls -->
<div
  class={[
    "fixed bottom-4 left-4",
    "p-3",
    "font-mono text-xs text-white",
    "bg-black/70",
    "rounded-lg",
    "space-y-1",
  ]}
>
  <div class="font-bold text-yellow-400">Tilt Debug</div>
  <div class="text-[10px] text-white/60">{permissionStatus ?? "checking..."}</div>
  <div>
    Events: {eventCount} | Supported: {orientationSupported === null
      ? "?"
      : orientationSupported
        ? "Yes"
        : "No (gamma null)"}
  </div>
  <div
    class={[
      currentBeta !== null && currentBeta >= PHONE_DOWN_THRESHOLD && "text-green-400",
      currentBeta !== null && currentBeta <= PHONE_UP_THRESHOLD && "text-orange-400",
    ]}
  >
    Gamma: {currentBeta?.toFixed(1) ?? "—"}°
  </div>
  <div class={["border-t border-white/20 pt-1", tiltReady ? "text-green-400" : "text-white/40"]}>
    Ready: {tiltReady ? "Yes" : "No (return to neutral)"}
  </div>
  <div class="text-white/60">
    <div>↓ Correct: ≥{PHONE_DOWN_THRESHOLD}°</div>
    <div>↑ Skip: ≤{PHONE_UP_THRESHOLD}°</div>
    <div>⊙ Neutral: {NEUTRAL_MIN}° to {NEUTRAL_MAX}°</div>
  </div>
  <!-- Visual tilt indicator -->
  <div class="pt-1">
    <div class="relative h-4 overflow-hidden rounded bg-white/20">
      <!-- Skip zone (negative gamma = phone face up) -->
      <div class="absolute left-0 h-full bg-orange-500/30" style:width="25%"></div>
      <!-- Neutral zone (center) -->
      <div
        class="absolute h-full bg-blue-500/30"
        style:left={`${((NEUTRAL_MIN + 90) / 180) * 100}%`}
        style:width={`${((NEUTRAL_MAX - NEUTRAL_MIN) / 180) * 100}%`}
      ></div>
      <!-- Correct zone (positive gamma = phone face down) -->
      <div class="absolute right-0 h-full bg-green-500/30" style:width="25%"></div>
      <!-- Current position indicator -->
      {#if currentBeta !== null}
        <div
          class="absolute top-0 h-full w-1 bg-white"
          style:left={`${Math.min(100, Math.max(0, ((currentBeta + 90) / 180) * 100))}%`}
        ></div>
      {/if}
    </div>
    <div class="flex justify-between text-[10px] text-white/40">
      <span>-90°</span>
      <span>0°</span>
      <span>90°</span>
    </div>
  </div>
</div>
