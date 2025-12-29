<script lang="ts">
  import { fade } from "svelte/transition"

  import Modal from "$lib/components/layout/Modal.svelte"
  import { Button } from "$lib/components/ui"
  import { GOLD, PURPLE } from "$lib/constants/colors"
  import { Color } from "$lib/utils/colors"

  let { onStart } = $props<{ onStart: () => void }>()

  let showInstructions = $state(false)

  const gradient = Color.toGradient(PURPLE, GOLD)

  let rotation = $state(30)
  let animationDirection = $state(1)

  // Animate the dial back and forth
  $effect(() => {
    const interval = setInterval(() => {
      rotation += animationDirection * 2
      if (rotation >= 60) {
        rotation = 60
        animationDirection = -1
      } else if (rotation <= -60) {
        rotation = -60
        animationDirection = 1
      }
    }, 50)

    return () => clearInterval(interval)
  })

  function toggleInstructions() {
    showInstructions = !showInstructions
  }
</script>

<div class="flex h-full flex-col items-center justify-center gap-12 px-4 py-6" in:fade>
  <!-- Dial decoration -->
  <div class="relative flex flex-col items-center gap-6">
    <!-- Mini dial illustration -->
    <div class="relative h-24 w-48">
      <div class="absolute inset-0 rounded-t-full" style:background={gradient}></div>
      <div class="absolute inset-0 rounded-t-full border-2 border-b-0 border-white/30"></div>
      <!-- Dial hand with circular pivot and triangular pointer -->
      <div class="absolute bottom-0 left-1/2 -translate-x-1/2 translate-y-1/2">
        <!-- Pointer using SVG with arrow tip -->
        <svg
          class="absolute bottom-1/2 left-1/2 origin-bottom -translate-x-1/2 transition-transform duration-100"
          style:transform="rotate({rotation}deg)"
          width="20"
          height="80"
          viewBox="0 0 20 80"
        >
          <line
            x1="10"
            y1="16"
            x2="10"
            y2="80"
            stroke="black"
            stroke-width="8"
            stroke-linecap="round"
          />
          <polygon points="10,0 2,16 18,16" fill="black" />
        </svg>
        <!-- Pivot circle -->
        <div class="relative h-10 w-10 rounded-full bg-black">
          <div class="absolute inset-2.5 rounded-full bg-gray-600"></div>
        </div>
      </div>
    </div>

    <div class="space-y-3 text-center">
      <h1
        class="pb-1 text-5xl font-black tracking-tight"
        style:background={gradient}
        style:-webkit-background-clip="text"
        style:background-clip="text"
        style:color="transparent"
      >
        Wavelength
      </h1>
      <p class="text-lg text-white/50">A game of telepathy and empathy</p>
    </div>
  </div>

  <div class="flex w-full max-w-xs flex-col gap-3">
    <Button variant="primary" size="xl" icon="fa-solid fa-play" {gradient} onclick={onStart}>
      Start Game
    </Button>
    <Button variant="standard" size="lg" icon="fa-solid fa-circle-question" onclick={toggleInstructions}>
      How to Play
    </Button>
    <Button variant="outline" size="lg" href="/">Back to Games</Button>
  </div>

  <Modal bind:isOpen={showInstructions} title="How to Play">
    <div class="space-y-6 p-6 text-left">
      <div class="space-y-4 text-white/70">
        <div class="flex gap-3">
          <span
            class={[
              "flex shrink-0 items-center justify-center",
              "h-7 w-7",
              "text-sm font-bold",
              "rounded-full",
            ]}
            style:background-color={PURPLE.toRgba(0.2)}
            style:color={PURPLE.toHsl()}>1</span
          >
          <p>
            <strong style:color={PURPLE.toHsl()}>The Spectrum:</strong> The Psychic chooses a spectrum
            and sees where the target is located.
          </p>
        </div>
        <div class="flex gap-3">
          <span
            class={[
              "flex shrink-0 items-center justify-center",
              "h-7 w-7",
              "text-sm font-bold",
              "rounded-full",
            ]}
            style:background-color={PURPLE.toRgba(0.2)}
            style:color={PURPLE.toHsl()}>2</span
          >
          <p>
            <strong style:color={PURPLE.toHsl()}>The Clue:</strong> The Psychic gives a clue that hints
            at where the target sits.
          </p>
        </div>
        <div class="flex gap-3">
          <span
            class={[
              "flex shrink-0 items-center justify-center",
              "h-7 w-7",
              "text-sm font-bold",
              "rounded-full",
            ]}
            style:background-color={GOLD.toRgba(0.2)}
            style:color={GOLD.toHsl()}>3</span
          >
          <p>
            <strong style:color={GOLD.toHsl()}>The Guess:</strong> Everyone else moves the dial to where
            they think the target is.
          </p>
        </div>
        <div class="flex gap-3">
          <span
            class={[
              "flex shrink-0 items-center justify-center",
              "h-7 w-7",
              "text-sm font-bold text-white",
              "bg-white/10",
              "rounded-full",
            ]}>4</span
          >
          <p>
            <strong class="text-white">The Reveal:</strong> See how close you got! Closer guesses score
            more points.
          </p>
        </div>
      </div>

      <div class="flex justify-end pt-2">
        <Button variant="standard" onclick={() => (showInstructions = false)}>Got it!</Button>
      </div>
    </div>
  </Modal>
</div>
