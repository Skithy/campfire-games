<script lang="ts">
  import {
    getGameContainerContext,
    Orientation,
  } from "$lib/components/layout/gameContainerContext.svelte"
  import Modal from "$lib/components/layout/Modal.svelte"
  import { Button } from "$lib/components/ui"
  import { GREEN, PURPLE } from "$lib/constants/colors"
  import { Color } from "$lib/utils/colors"

  let { onStart }: { onStart: () => void } = $props()

  let showInstructions = $state(false)

  const gradient = Color.toGradient(GREEN, PURPLE)

  const ctx = getGameContainerContext()
  $effect(() => {
    ctx.setBackground(GREEN, PURPLE)
    ctx.setOrientation(Orientation.Portrait)
  })

  function toggleInstructions() {
    showInstructions = !showInstructions
  }
</script>

<div class="flex flex-1 flex-col items-center justify-center gap-12">
  <!-- Phone icon -->
  <div class="relative flex flex-col items-center gap-6">
    <div class="flex h-32 w-32 items-center justify-center">
      <i class="fa-solid fa-mobile-screen-button text-7xl text-white/80"></i>
    </div>

    <div class="space-y-3 text-center">
      <h1
        class="pb-1 text-5xl font-black tracking-tight"
        style:background={gradient}
        style:-webkit-background-clip="text"
        style:background-clip="text"
        style:color="transparent"
      >
        Heads Up
      </h1>
      <p class="text-lg text-white/50">Guess the word on your forehead</p>
    </div>
  </div>

  <div class="flex w-full max-w-xs flex-col gap-3">
    <Button variant="primary" size="xl" icon="fa-solid fa-play" {gradient} onclick={onStart}>
      Start Game
    </Button>
    <Button
      variant="standard"
      size="lg"
      icon="fa-solid fa-circle-question"
      onclick={toggleInstructions}
    >
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
              "flex h-7 w-7 shrink-0 items-center justify-center",
              "rounded-full",
              "text-sm font-bold",
            ]}
            style:background-color={GREEN.toRgba(0.2)}
            style:color={GREEN.toHsl()}>1</span
          >
          <p>
            <strong style:color={GREEN.toHsl()}>Hold Up:</strong> Place the phone on your forehead with
            the screen facing outward.
          </p>
        </div>
        <div class="flex gap-3">
          <span
            class={[
              "flex h-7 w-7 shrink-0 items-center justify-center",
              "rounded-full",
              "text-sm font-bold",
            ]}
            style:background-color={GREEN.toRgba(0.2)}
            style:color={GREEN.toHsl()}>2</span
          >
          <p>
            <strong style:color={GREEN.toHsl()}>Guess:</strong> Others give clues while you try to guess
            the word on your forehead.
          </p>
        </div>
        <div class="flex gap-3">
          <span
            class={[
              "flex h-7 w-7 shrink-0 items-center justify-center",
              "rounded-full",
              "text-sm font-bold",
            ]}
            style:background-color={PURPLE.toRgba(0.2)}
            style:color={PURPLE.toHsl()}>3</span
          >
          <p>
            <strong style:color={PURPLE.toHsl()}>Correct:</strong> Tilt the phone forward (or tap Correct)
            when you guess right.
          </p>
        </div>
        <div class="flex gap-3">
          <span
            class={[
              "flex h-7 w-7 shrink-0 items-center justify-center",
              "rounded-full bg-white/10",
              "text-sm font-bold text-white",
            ]}>4</span
          >
          <p>
            <strong class="text-white">Skip:</strong> Tilt the phone backward (or tap Skip) to pass on
            a word.
          </p>
        </div>
      </div>

      <div class="flex justify-end pt-2">
        <Button variant="standard" onclick={() => (showInstructions = false)}>Got it!</Button>
      </div>
    </div>
  </Modal>
</div>
