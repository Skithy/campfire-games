<script lang="ts">
  import { AMBER, GOLD, GREEN, PURPLE, RED } from "$lib/constants/wavelengthColors"
  import { rgb } from "$lib/utils/colors"

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
          return { top: rgb(GREEN), bottom: rgb(GREEN) }
        case "good":
          return { top: rgb(GREEN), bottom: rgb(GREEN) }
        case "okay":
          return { top: rgb(AMBER), bottom: rgb(AMBER) }
        case "miss":
          return { top: rgb(RED), bottom: rgb(RED) }
        default:
          return { top: rgb(PURPLE), bottom: rgb(PURPLE) }
      }
    }

    switch (phase) {
      case "splash":
        return { top: rgb(PURPLE), bottom: rgb(GOLD) }
      case "prompt":
      case "psychic":
        return { top: rgb(PURPLE), bottom: rgb(PURPLE) }
      case "guess":
        return { top: rgb(GOLD), bottom: rgb(GOLD) }
      default:
        return { top: rgb(PURPLE), bottom: rgb(PURPLE) }
    }
  })
</script>

<div class="pointer-events-none absolute inset-0 overflow-hidden" aria-hidden="true">
  <!-- Top glow -->
  <div
    class="glow absolute top-0 h-[50%] w-[140%] rounded-[100%] blur-3xl"
    style="left: 50%; transform: translateX(-50%) translateY(-60%); background-color: {gradientColors.top}; mask-image: radial-gradient(ellipse at center, black 0%, transparent 60%); -webkit-mask-image: radial-gradient(ellipse at center, black 0%, transparent 60%); transition: background-color 700ms;"
  ></div>
  <!-- Bottom glow -->
  <div
    class="glow absolute bottom-0 h-[50%] w-[140%] rounded-[100%] blur-3xl"
    style="left: 50%; transform: translateX(-50%) translateY(60%); background-color: {gradientColors.bottom}; mask-image: radial-gradient(ellipse at center, black 0%, transparent 60%); -webkit-mask-image: radial-gradient(ellipse at center, black 0%, transparent 60%); transition: background-color 700ms;"
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
