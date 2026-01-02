<script lang="ts">
  import { getGameContainerContext } from "$lib/components/layout/gameContainerContext.svelte"
  import Modal from "$lib/components/layout/Modal.svelte"
  import { Button } from "$lib/components/ui"
  import { TEAM_BLUE, TEAM_RED } from "$lib/constants/teams"
  import sshImage from "$lib/images/ssh.png"
  import { Color } from "$lib/utils/colors"

  let { onStart }: { onStart: () => void } = $props()

  let showInstructions = $state(false)

  const gradient = Color.toGradient(TEAM_RED.color, TEAM_BLUE.color)

  const ctx = getGameContainerContext()
  $effect(() => {
    ctx.setBackground(TEAM_RED.color, TEAM_BLUE.color)
  })

  function toggleInstructions() {
    showInstructions = !showInstructions
  }
</script>

<div class="flex flex-1 flex-col items-center justify-center gap-12">
  <!-- Shh gesture illustration -->
  <div class="relative flex flex-col items-center gap-6">
    <!-- Shh image -->
    <div class="h-32 w-32">
      <img
        src={sshImage}
        alt="Shh gesture"
        class="h-full w-full object-contain"
        style="filter: invert(1);"
      />
    </div>

    <div class="space-y-3 text-center">
      <h1
        class="pb-1 text-5xl font-black tracking-tight"
        style:background={gradient}
        style:-webkit-background-clip="text"
        style:background-clip="text"
        style:color="transparent"
      >
        Taboo
      </h1>
      <p class="text-lg text-white/50">The word-guessing game with a twist</p>
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
            style:background-color={TEAM_RED.color.toRgba(0.2)}
            style:color={TEAM_RED.color.toHsl()}>1</span
          >
          <p>
            <strong style:color={TEAM_RED.color.toHsl()}>The Card:</strong> One player draws a card with
            a word and forbidden clues.
          </p>
        </div>
        <div class="flex gap-3">
          <span
            class={[
              "flex h-7 w-7 shrink-0 items-center justify-center",
              "rounded-full",
              "text-sm font-bold",
            ]}
            style:background-color={TEAM_RED.color.toRgba(0.2)}
            style:color={TEAM_RED.color.toHsl()}>2</span
          >
          <p>
            <strong style:color={TEAM_RED.color.toHsl()}>The Clues:</strong> Give hints to help others
            guess the word without saying any forbidden words.
          </p>
        </div>
        <div class="flex gap-3">
          <span
            class={[
              "flex h-7 w-7 shrink-0 items-center justify-center",
              "rounded-full",
              "text-sm font-bold",
            ]}
            style:background-color={TEAM_BLUE.color.toRgba(0.2)}
            style:color={TEAM_BLUE.color.toHsl()}>3</span
          >
          <p>
            <strong style:color={TEAM_BLUE.color.toHsl()}>The Guess:</strong> Your team tries to guess
            the word before time runs out.
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
            <strong class="text-white">The Score:</strong> Your team gets a point for each correct guess.
            The other team gets a point for each card you skip!
          </p>
        </div>
      </div>

      <div class="flex justify-end pt-2">
        <Button variant="standard" onclick={() => (showInstructions = false)}>Got it!</Button>
      </div>
    </div>
  </Modal>
</div>
