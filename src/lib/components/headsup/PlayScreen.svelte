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
  // gamma: ±90° = phone vertical (perpendicular to ground)
  // gamma: 0° = phone horizontal (screen up OR screen down)
  // Correct: 0° to 45° (tilting down)
  // Skip: -45° to 0° (tilting up)
  // Reset: > 70° or < -70°

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

    const gamma = e.gamma

    // Check if returned to near-vertical (neutral) zone
    if (!tiltReady && (gamma > 70 || gamma < -70)) {
      tiltReady = true
    }

    if (!tiltReady) return

    // Check for correct action (0° to 45°)
    if (gamma >= 0 && gamma <= 45) {
      tiltReady = false
      triggerAction("correct")
    }
    // Check for skip action (-45° to 0°)
    else if (gamma >= -45 && gamma < 0) {
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

    // Show new word immediately
    if (action === "correct") {
      onCorrect()
    } else {
      onSkip()
    }

    // Reset exit direction after animation completes
    setTimeout(() => {
      exitDirection = null
    }, 300)

    // Re-enable buttons after cooldown
    setTimeout(() => {
      isExiting = false
    }, 1000)
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

<div class="flex h-full w-full flex-row gap-6">
  <!-- Left side: Skip, Word, Correct -->
  <div class="flex flex-1 flex-col gap-6">
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
      <!-- Word display -->
      <div class="relative h-full w-full px-8">
        {#key word}
          <div
            class="absolute inset-0 flex items-center justify-center"
            in:fly={{ x: -50, duration: 200, opacity: 0 }}
            out:fly={{
              y: exitDirection === "correct" ? 50 : exitDirection === "skip" ? -50 : 0,
              duration: 200,
              opacity: 0,
            }}
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

  <!-- Right side: Pause button and Timer -->
  <div class="flex w-24 flex-col items-center justify-center gap-4">
    <button
      class={[
        "flex items-center justify-center",
        "h-16 w-16",
        "cursor-pointer",
        "text-2xl text-white/60",
        "bg-white/10",
        "rounded-full",
        "transition-colors hover:bg-white/20 active:scale-95",
      ]}
      onclick={onTogglePause}
      aria-label="Pause game"
    >
      <i class="fa-solid fa-pause"></i>
    </button>

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
  </div>
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
    {#if permissionStatus === SensorPermissionStatus.Denied}
      <p>
        Your browser is blocking access to motion sensors. Tilt controls won't work, but you can
        still use <strong class="text-white">tap controls</strong>.
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
    {:else if permissionStatus === SensorPermissionStatus.Unsupported}
      <p>
        Your device or browser doesn't support motion sensors. You can still use
        <strong class="text-white">tap controls</strong> or
        <strong class="text-white">keyboard arrows</strong>.
      </p>

      <p class="text-white/60">
        Tilt controls work on mobile devices with gyroscope sensors and browsers that support the
        DeviceOrientation API.
      </p>
    {:else if permissionStatus === SensorPermissionStatus.Prompt}
      <p>
        Tilt controls require permission to access motion sensors. Click the button below to grant
        permission.
      </p>

      <div class="space-y-3">
        <p class="font-medium text-white">After granting permission:</p>
        <ol class="ml-4 list-decimal space-y-2">
          <li>Allow "Motion sensors" or "Device orientation" when prompted</li>
          <li>The page will automatically use tilt controls</li>
        </ol>
      </div>
    {:else}
      <p>
        Tilt controls status is unknown. You can still use
        <strong class="text-white">tap controls</strong> or
        <strong class="text-white">keyboard arrows</strong>.
      </p>
    {/if}

    <div class="flex justify-end pt-2">
      <Button variant="standard" onclick={() => (showSensorHelp = false)}>Got it</Button>
    </div>
  </div>
</Modal>
