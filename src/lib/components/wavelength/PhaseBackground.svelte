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
          return { primary: "rgb(34, 197, 94)", secondary: "rgb(22, 163, 74)" } // green
        case "good":
          return { primary: "rgb(34, 197, 94)", secondary: "rgb(22, 163, 74)" } // green
        case "okay":
          return { primary: "rgb(234, 179, 8)", secondary: "rgb(202, 138, 4)" } // amber/yellow
        case "miss":
          return { primary: "rgb(239, 68, 68)", secondary: "rgb(220, 38, 38)" } // red
        default:
          return { primary: "rgb(168, 85, 247)", secondary: "rgb(147, 51, 234)" } // purple
      }
    }

    switch (phase) {
      case "splash":
        return { primary: "rgb(99, 102, 241)", secondary: "rgb(79, 70, 229)" } // indigo
      case "prompt":
      case "psychic":
        return { primary: "rgb(168, 85, 247)", secondary: "rgb(147, 51, 234)" } // purple
      case "guess":
        return { primary: "rgb(245, 158, 11)", secondary: "rgb(217, 119, 6)" } // amber
      default:
        return { primary: "rgb(168, 85, 247)", secondary: "rgb(147, 51, 234)" } // purple
    }
  })
</script>

<div
  class="pointer-events-none absolute inset-0 overflow-hidden"
  aria-hidden="true"
>
  <!-- Top glow -->
  <div
    class="animate-pulse-slow absolute top-0 h-[50%] w-[140%] rounded-[100%] blur-3xl"
    style="left: 50%; transform: translateX(-50%) translateY(-60%); background-color: {gradientColors.primary}; mask-image: radial-gradient(ellipse at center, black 0%, transparent 60%); -webkit-mask-image: radial-gradient(ellipse at center, black 0%, transparent 60%); transition: background-color 700ms;"
  ></div>
  <!-- Bottom glow -->
  <div
    class="animate-pulse-slow absolute bottom-0 h-[50%] w-[140%] rounded-[100%] blur-3xl"
    style="left: 50%; transform: translateX(-50%) translateY(60%); background-color: {gradientColors.primary}; mask-image: radial-gradient(ellipse at center, black 0%, transparent 60%); -webkit-mask-image: radial-gradient(ellipse at center, black 0%, transparent 60%); transition: background-color 700ms;"
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

  .animate-pulse-slow {
    animation: pulse-slow 4s ease-in-out infinite;
  }
</style>
