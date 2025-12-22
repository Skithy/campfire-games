<script lang="ts">
  import { fade, scale } from "svelte/transition"

  import { GREEN, ORANGE, RED } from "$lib/constants/colors"
  import sshImage from "$lib/images/ssh.png"
  import { Color } from "$lib/utils/colors"

  type GamePhase = "splash" | "play"

  let phase = $state<GamePhase>("splash")
  let showInstructions = $state(false)

  const gradient = Color.toGradient(RED, GREEN)

  function startGame() {
    phase = "play"
  }

  function backToSplash() {
    phase = "splash"
  }

  function toggleInstructions() {
    showInstructions = !showInstructions
  }
</script>

<svelte:head>
  <title>Taboo - Campfire Games</title>
  <meta name="description" content="Guess the word without forbidden clues" />
</svelte:head>

<div class="relative flex h-full flex-col overflow-hidden">
  <!-- Background -->
  <div class="absolute inset-0 -z-10">
    <div class="h-full w-full transition-all duration-1000" style:background={gradient}></div>
  </div>

  {#if phase === "splash"}
    <div class="flex h-full flex-col items-center justify-center gap-12 px-4 py-6" in:fade>
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
            class="pb-1 text-5xl font-black tracking-tight sm:text-6xl"
            style:background={gradient}
            style:-webkit-background-clip="text"
            style:background-clip="text"
            style:color="transparent"
          >
            Taboo
          </h1>
          <p class="text-lg text-white/50">Guess the word without forbidden clues</p>
        </div>
      </div>

      <div class="flex w-full max-w-xs flex-col gap-3">
        <button
          class="group relative cursor-pointer overflow-hidden rounded-2xl p-0.5 transition-all hover:scale-[1.02] active:scale-[0.98]"
          style:background={gradient}
          onclick={startGame}
        >
          <span
            class="flex items-center justify-center gap-2 rounded-[14px] bg-[#1a1a1a] px-8 py-4 text-xl font-bold text-white transition-colors group-hover:bg-transparent group-hover:text-black"
          >
            <i class="fa-solid fa-play text-base"></i>
            Start Game
          </span>
        </button>
        <button
          class="flex cursor-pointer items-center justify-center gap-2 rounded-2xl border border-white/20 bg-white/10 px-8 py-4 text-lg font-semibold text-white/80 transition-all hover:bg-white/15 hover:text-white active:scale-[0.98]"
          onclick={toggleInstructions}
        >
          <i class="fa-solid fa-circle-question text-base"></i>
          How to Play
        </button>

        <a
          href="/"
          class="rounded-2xl bg-white/5 px-8 py-4 text-center text-lg font-semibold text-white/70 backdrop-blur-sm transition-all hover:bg-white/10 hover:text-white active:scale-95"
        >
          Back to Games
        </a>
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
                  class="flex h-7 w-7 shrink-0 items-center justify-center rounded-full text-sm font-bold"
                  style:background-color={RED.toRgba(0.2)}
                  style:color={RED.toHsl()}>1</span
                >
                <p>
                  <strong style:color={RED.toHsl()}>The Card:</strong> One player draws a card with a
                  word and forbidden clues.
                </p>
              </div>
              <div class="flex gap-3">
                <span
                  class="flex h-7 w-7 shrink-0 items-center justify-center rounded-full text-sm font-bold"
                  style:background-color={RED.toRgba(0.2)}
                  style:color={RED.toHsl()}>2</span
                >
                <p>
                  <strong style:color={RED.toHsl()}>The Clues:</strong> Give hints to help others guess
                  the word without saying any forbidden words.
                </p>
              </div>
              <div class="flex gap-3">
                <span
                  class="flex h-7 w-7 shrink-0 items-center justify-center rounded-full text-sm font-bold"
                  style:background-color={ORANGE.toRgba(0.2)}
                  style:color={ORANGE.toHsl()}>3</span
                >
                <p>
                  <strong style:color={ORANGE.toHsl()}>The Guess:</strong> Your team tries to guess the
                  word before time runs out.
                </p>
              </div>
              <div class="flex gap-3">
                <span
                  class="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-white/10 text-sm font-bold text-white"
                  >4</span
                >
                <p>
                  <strong class="text-white">The Score:</strong> Get a point for each correct guess.
                  Say a forbidden word and lose your turn!
                </p>
              </div>
            </div>

            <div class="flex justify-end pt-2">
              <button
                class="cursor-pointer rounded-xl bg-white/10 px-6 py-3 font-semibold text-white transition-colors hover:bg-white/20"
                onclick={toggleInstructions}
              >
                Got it!
              </button>
            </div>
          </div>
        </div>
      {/if}
    </div>
  {:else if phase === "play"}
    <div class="flex h-full flex-col items-center justify-center gap-8 px-4 py-6" in:fade>
      <div class="space-y-4 text-center">
        <h2 class="text-4xl font-bold text-white">Game in Progress</h2>
        <p class="text-white/70">Taboo gameplay coming soon...</p>
      </div>

      <button
        onclick={backToSplash}
        class="rounded-xl bg-white/10 px-8 py-4 text-lg font-semibold text-white backdrop-blur-sm transition-all hover:bg-white/20 active:scale-95"
      >
        Back to Menu
      </button>
    </div>
  {/if}
</div>
