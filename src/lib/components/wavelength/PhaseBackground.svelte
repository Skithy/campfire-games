<script lang="ts">
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
          return { top: "rgb(80, 160, 120)", bottom: "rgb(80, 160, 120)" } // muted green
        case "good":
          return { top: "rgb(80, 160, 120)", bottom: "rgb(80, 160, 120)" } // muted green
        case "okay":
          return { top: "rgb(180, 150, 80)", bottom: "rgb(180, 150, 80)" } // muted amber
        case "miss":
          return { top: "rgb(180, 100, 100)", bottom: "rgb(180, 100, 100)" } // muted red
        default:
          return { top: "rgb(140, 100, 180)", bottom: "rgb(140, 100, 180)" } // muted purple
      }
    }

    switch (phase) {
      case "splash":
        return { top: "rgb(180, 80, 80)", bottom: "rgb(80, 120, 180)" } // red top, blue bottom
      case "prompt":
      case "psychic":
        return { top: "rgb(140, 100, 180)", bottom: "rgb(140, 100, 180)" } // muted purple
      case "guess":
        return { top: "rgb(180, 140, 80)", bottom: "rgb(180, 140, 80)" } // muted amber
      default:
        return { top: "rgb(140, 100, 180)", bottom: "rgb(140, 100, 180)" } // muted purple
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
