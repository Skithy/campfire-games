<script lang="ts">
  import { getGameContainerContext } from "$lib/components/layout/gameContainerContext.svelte"
  import Modal from "$lib/components/layout/Modal.svelte"
  import { Button } from "$lib/components/ui"
  import { TEAM_BLUE, TEAM_RED } from "$lib/constants/teams"
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
  <div class="relative flex flex-col items-center gap-6">
    <!-- Icon -->
    <div
      class={[
        "flex items-center justify-center",
        "h-24 w-24",
        "text-5xl text-white/80",
        "bg-white/10",
        "rounded-full",
      ]}
    >
      <i class="fa-solid fa-masks-theater"></i>
    </div>

    <div class="space-y-3 text-center">
      <h1
        class="pb-1 text-5xl font-black tracking-tight"
        style:background={gradient}
        style:-webkit-background-clip="text"
        style:background-clip="text"
        style:color="transparent"
      >
        Monikers
      </h1>
      <p class="text-lg text-white/50">One deck, three ways to guess</p>
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
      <p class="text-sm text-white/70">
        The same 60 cards are used for all 3 rounds. Cards get easier as players remember the clues
        from earlier rounds!
      </p>

      <div class="space-y-4 text-white/70">
        <div class="flex gap-3">
          <span
            class={[
              "flex h-7 w-7 shrink-0 items-center justify-center",
              "rounded-full",
              "text-sm font-bold",
            ]}
            style:background-color={TEAM_RED.color.toRgba(0.2)}
            style:color={TEAM_RED.color.toHsl()}
          >
            1
          </span>
          <div>
            <p class="font-bold" style:color={TEAM_RED.color.toHsl()}>Describe It</p>
            <p class="text-sm">Use any words except the name itself</p>
          </div>
        </div>
        <div class="flex gap-3">
          <span
            class={[
              "flex h-7 w-7 shrink-0 items-center justify-center",
              "rounded-full",
              "text-sm font-bold",
            ]}
            style:background-color={TEAM_BLUE.color.toRgba(0.2)}
            style:color={TEAM_BLUE.color.toHsl()}
          >
            2
          </span>
          <div>
            <p class="font-bold" style:color={TEAM_BLUE.color.toHsl()}>One Word</p>
            <p class="text-sm">Say only ONE word as a clue</p>
          </div>
        </div>
        <div class="flex gap-3">
          <span
            class={[
              "flex h-7 w-7 shrink-0 items-center justify-center",
              "rounded-full bg-white/10",
              "text-sm font-bold text-white",
            ]}
          >
            3
          </span>
          <div>
            <p class="font-bold text-white">Act It Out</p>
            <p class="text-sm">No words! Act it out like charades</p>
          </div>
        </div>
      </div>

      <div class="space-y-2 border-t border-white/10 pt-4">
        <p class="text-sm text-white/70">
          <strong class="text-white">Teams:</strong> Take turns with 60 seconds per turn. Team with
          the most points after all 3 rounds wins!
        </p>
      </div>

      <div class="flex justify-end pt-2">
        <Button variant="standard" onclick={() => (showInstructions = false)}>Got it!</Button>
      </div>
    </div>
  </Modal>
</div>
