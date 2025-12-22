<script lang="ts">
  import { AMBER, GOLD, GREEN, PURPLE, RED } from "$lib/constants/wavelengthColors"

  type Phase = "splash" | "prompt" | "psychic" | "guess" | "reveal"

  let {
    phase,
    scoreLevel = "neutral",
  }: {
    phase: Phase
    scoreLevel?: "great" | "good" | "okay" | "miss" | "neutral"
  } = $props()

  // Determine colors based on phase
  let gradientColors = $derived.by(() => {
    if (phase === "reveal") {
      switch (scoreLevel) {
        case "great":
          return { top: GREEN.toRgb(), bottom: GREEN.toRgb() }
        case "good":
          return { top: GREEN.toRgb(), bottom: GREEN.toRgb() }
        case "okay":
          return { top: AMBER.toRgb(), bottom: AMBER.toRgb() }
        case "miss":
          return { top: RED.toRgb(), bottom: RED.toRgb() }
        default:
          return { top: PURPLE.toRgb(), bottom: PURPLE.toRgb() }
      }
    }

    switch (phase) {
      case "splash":
        return { top: PURPLE.toRgb(), bottom: GOLD.toRgb() }
      case "prompt":
      case "psychic":
        return { top: PURPLE.toRgb(), bottom: PURPLE.toRgb() }
      case "guess":
        return { top: GOLD.toRgb(), bottom: GOLD.toRgb() }
      default:
        return { top: PURPLE.toRgb(), bottom: PURPLE.toRgb() }
    }
  })
</script>

<div class="pointer-events-none absolute inset-0 overflow-hidden" aria-hidden="true">
  <!-- Top glow -->
  <div
    class="glow absolute top-0 left-1/2 h-[50%] w-[140%] -translate-x-1/2 rounded-[100%] blur-3xl transition-colors duration-700"
    style:transform="translateY(-60%)"
    style:background-color={gradientColors.top}
    style:mask-image="radial-gradient(ellipse at center, black 0%, transparent 60%)"
    style:-webkit-mask-image="radial-gradient(ellipse at center, black 0%, transparent 60%)"
  ></div>
  <!-- Bottom glow -->
  <div
    class="glow absolute bottom-0 left-1/2 h-[50%] w-[140%] -translate-x-1/2 rounded-[100%] blur-3xl transition-colors duration-700"
    style:transform="translateY(60%)"
    style:background-color={gradientColors.bottom}
    style:mask-image="radial-gradient(ellipse at center, black 0%, transparent 60%)"
    style:-webkit-mask-image="radial-gradient(ellipse at center, black 0%, transparent 60%)"
  ></div>
</div>

<style>
  @keyframes pulse-slow {
    0%,
    100% {
      opacity: 0.25;
    }
    50% {
      opacity: 0.4;
    }
  }

  .glow {
    animation: pulse-slow 4s ease-in-out infinite;
  }
</style>
