<script lang="ts">
  import { fade, scale } from "svelte/transition"

  let { onStart } = $props<{ onStart: () => void }>()

  let showInstructions = $state(false)

  function toggleInstructions() {
    showInstructions = !showInstructions
  }
</script>

<div class="flex h-full flex-col items-center justify-center gap-12 px-4 py-6" in:fade>
  <!-- Dial decoration -->
  <div class="relative flex flex-col items-center gap-6">
    <!-- Mini dial illustration -->
    <div class="relative h-24 w-48">
      <div
        class="absolute inset-0 rounded-t-full bg-gradient-to-r from-rose-300 via-amber-200 to-cyan-300"
      ></div>
      <div class="absolute inset-0 rounded-t-full border-2 border-b-0 border-white/30"></div>
      <!-- Dial hand with circular pivot and triangular pointer -->
      <div class="absolute bottom-0 left-1/2 -translate-x-1/2 translate-y-1/2">
        <!-- Pointer using SVG for clean triangle with rounded tip -->
        <svg
          class="absolute bottom-1/2 left-1/2 origin-bottom -translate-x-1/2 rotate-[30deg]"
          width="20"
          height="80"
          viewBox="0 0 20 80"
        >
          <path d="M 10 4 C 6 4, 4 6, 2 80 L 18 80 C 16 6, 14 4, 10 4 Z" fill="black" />
          <ellipse cx="10" cy="4" rx="4" ry="4" fill="black" />
        </svg>
        <!-- Pivot circle -->
        <div class="relative h-10 w-10 rounded-full bg-black">
          <div class="absolute inset-2.5 rounded-full bg-gray-600"></div>
        </div>
      </div>
    </div>

    <div class="space-y-3 text-center">
      <h1
        class="bg-gradient-to-r from-rose-400 via-amber-300 to-cyan-400 bg-clip-text pb-1 text-5xl font-black tracking-tight text-transparent sm:text-6xl"
      >
        Wavelength
      </h1>
      <p class="text-lg text-white/50">A game of telepathy and empathy</p>
    </div>
  </div>

  <div class="flex w-full max-w-xs flex-col gap-3">
    <button
      class="group relative overflow-hidden rounded-2xl bg-gradient-to-r from-rose-400 via-amber-300 to-cyan-400 p-0.5 transition-all hover:scale-[1.02] active:scale-[0.98]"
      onclick={onStart}
    >
      <span
        class="flex items-center justify-center gap-2 rounded-[14px] bg-[#1a1a1a] px-8 py-4 text-xl font-bold text-white transition-colors group-hover:bg-transparent group-hover:text-black"
      >
        <i class="fa-solid fa-play text-base"></i>
        Start Game
      </span>
    </button>
    <button
      class="flex items-center justify-center gap-2 rounded-2xl border border-white/20 bg-white/10 px-8 py-4 text-lg font-semibold text-white/80 transition-all hover:bg-white/15 hover:text-white active:scale-[0.98]"
      onclick={toggleInstructions}
    >
      <i class="fa-solid fa-circle-question text-base"></i>
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
        class="w-full max-w-lg space-y-6 rounded-2xl border border-white/10 bg-[#1a1a1a] p-8 text-left shadow-2xl"
        in:scale
        onclick={(e) => e.stopPropagation()}
        onkeydown={(e) => e.stopPropagation()}
        role="document"
      >
        <h3 class="text-2xl font-bold text-white">How to Play</h3>

        <div class="space-y-4 text-white/70">
          <div class="flex gap-3">
            <span
              class="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-amber-500/20 text-sm font-bold text-amber-400"
              >1</span
            >
            <p>
              <strong class="text-amber-400">The Psychic</strong> sees where the target is located on
              the spectrum.
            </p>
          </div>
          <div class="flex gap-3">
            <span
              class="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-rose-500/20 text-sm font-bold text-rose-400"
              >2</span
            >
            <p>
              <strong class="text-rose-400">The Clue:</strong> The Psychic gives a clue that fits where
              the target sits between two opposites.
            </p>
          </div>
          <div class="flex gap-3">
            <span
              class="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-cyan-500/20 text-sm font-bold text-cyan-400"
              >3</span
            >
            <p>
              <strong class="text-cyan-400">The Guess:</strong> Everyone else discusses and moves the
              dial to where they think the target is.
            </p>
          </div>
          <div class="flex gap-3">
            <span
              class="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-white/10 text-sm font-bold text-white"
              >4</span
            >
            <p>
              <strong class="text-white">The Reveal:</strong> See how close you got! Closer guesses score
              more points.
            </p>
          </div>
        </div>

        <div class="flex justify-end pt-2">
          <button
            class="rounded-xl bg-white/10 px-6 py-3 font-semibold text-white transition-colors hover:bg-white/20"
            onclick={toggleInstructions}
          >
            Got it!
          </button>
        </div>
      </div>
    </div>
  {/if}
</div>
