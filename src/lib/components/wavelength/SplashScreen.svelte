<script lang="ts">
  import { fade, scale } from "svelte/transition"

  let { onStart } = $props<{ onStart: () => void }>()

  let showInstructions = $state(false)

  function toggleInstructions() {
    showInstructions = !showInstructions
  }
</script>

<div class="flex h-full flex-col items-center justify-center space-y-12" in:fade>
  <div class="space-y-4 text-center">
    <h2
      class="bg-gradient-to-r from-[#ff4444] via-[#ffff44] to-[#4444ff] bg-clip-text text-6xl font-bold text-transparent drop-shadow-lg filter"
    >
      Wavelength
    </h2>
    <p class="text-xl text-gray-400">A game of telepathy and empathy</p>
  </div>

  <div class="flex w-64 flex-col space-y-4">
    <button
      class="rounded-lg bg-white px-8 py-4 text-xl font-bold text-black shadow-lg transition-transform hover:scale-105 hover:shadow-xl active:scale-95"
      onclick={onStart}
    >
      Start Game
    </button>
    <button
      class="rounded-lg bg-[#333] px-8 py-3 text-lg font-semibold text-white transition-colors hover:bg-[#444]"
      onclick={toggleInstructions}
    >
      How to Play
    </button>
  </div>

  {#if showInstructions}
    <div
      class="fixed inset-0 z-50 flex items-center justify-center bg-black/80 p-4 backdrop-blur-sm"
      transition:fade
      onclick={toggleInstructions}
      role="button"
      tabindex="0"
      onkeydown={(e) => e.key === "Escape" && toggleInstructions()}
    >
      <!-- svelte-ignore a11y_no_noninteractive_element_interactions -->
      <div
        class="w-full max-w-lg space-y-6 rounded-xl border border-[#333] bg-[#222] p-8 text-left shadow-2xl"
        in:scale
        onclick={(e) => e.stopPropagation()}
        onkeydown={(e) => e.stopPropagation()}
        role="document"
      >
        <h3 class="mb-4 text-2xl font-bold text-white">How to Play</h3>

        <div class="space-y-4 text-gray-300">
          <p>
            <strong class="text-[#ffff44]">1. The Psychic:</strong> One player (the Psychic) sees where
            the target is located on the spectrum.
          </p>
          <p>
            <strong class="text-[#ff4444]">2. The Clue:</strong> The Psychic gives a clue that conceptually
            fits where the target is between the two binary opposites.
          </p>
          <p>
            <strong class="text-[#4444ff]">3. The Guess:</strong> Everyone else discusses and turns the
            dial to where they think the target is based on the clue.
          </p>
          <p>
            <strong class="text-white">4. The Reveal:</strong> See how close you got! The closer to the
            center, the more points you score.
          </p>
        </div>

        <div class="flex justify-end pt-4">
          <button
            class="rounded-lg bg-[#444] px-6 py-2 text-white transition-colors hover:bg-[#555]"
            onclick={toggleInstructions}
          >
            Got it!
          </button>
        </div>
      </div>
    </div>
  {/if}
</div>
