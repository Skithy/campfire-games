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
          return { primary: "rgb(80, 160, 120)", secondary: "rgb(60, 140, 100)" } // muted green
        case "good":
          return { primary: "rgb(80, 160, 120)", secondary: "rgb(60, 140, 100)" } // muted green
        case "okay":
          return { primary: "rgb(180, 150, 80)", secondary: "rgb(160, 130, 60)" } // muted amber
        case "miss":
          return { primary: "rgb(180, 100, 100)", secondary: "rgb(160, 80, 80)" } // muted red
        default:
          return { primary: "rgb(140, 100, 180)", secondary: "rgb(120, 80, 160)" } // muted purple
      }
    }

    switch (phase) {
      case "splash":
        return { primary: "rgb(120, 120, 130)", secondary: "rgb(100, 100, 110)" } // muted grey
      case "prompt":
      case "psychic":
        return { primary: "rgb(140, 100, 180)", secondary: "rgb(120, 80, 160)" } // muted purple
      case "guess":
        return { primary: "rgb(180, 140, 80)", secondary: "rgb(160, 120, 60)" } // muted amber
      default:
        return { primary: "rgb(140, 100, 180)", secondary: "rgb(120, 80, 160)" } // muted purple
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
