<script lang="ts">
  import {
    getGameContainerContext,
    Orientation,
  } from "$lib/components/layout/gameContainerContext.svelte"
  import { Button } from "$lib/components/ui"
  import { GREEN, PURPLE } from "$lib/constants/colors"

  let {
    correctWords = $bindable(),
    skippedWords = $bindable(),
    timedOutWord = $bindable(),
    onPlayAgain,
  }: {
    correctWords: string[]
    skippedWords: string[]
    timedOutWord: string | null
    onPlayAgain: () => void
  } = $props()

  const ctx = getGameContainerContext()
  $effect(() => {
    ctx.setBackground(GREEN, PURPLE)
    ctx.setOrientation(Orientation.Portrait)
  })

  function moveToCorrect(word: string, source: "skipped" | "timedOut") {
    if (source === "skipped") {
      skippedWords = skippedWords.filter((w) => w !== word)
    } else {
      timedOutWord = null
    }
    correctWords = [...correctWords, word]
  }

  function moveToSkipped(word: string) {
    correctWords = correctWords.filter((w) => w !== word)
    skippedWords = [...skippedWords, word]
  }
</script>

<div class={["flex flex-1 flex-col items-center gap-6", "w-full", "min-h-0"]}>
  <!-- Header -->
  <div class="flex-shrink-0 space-y-2 text-center">
    <p class="text-sm font-medium tracking-widest text-white/60 uppercase">Time's Up!</p>
    <h1 class="text-4xl font-black" style:color={GREEN.toRgb()}>
      {correctWords.length} Correct
    </h1>
  </div>

  <!-- Score summary -->
  <div class="flex w-full max-w-sm flex-shrink-0 gap-4">
    <div
      class="flex flex-1 flex-col items-center gap-1 rounded-xl py-4"
      style:background-color={GREEN.toRgba(0.2)}
    >
      <span class="text-4xl font-black" style:color={GREEN.toRgb()}>{correctWords.length}</span>
      <span class="text-sm font-medium text-white/60">Correct</span>
    </div>
    <div class="flex flex-1 flex-col items-center gap-1 rounded-xl bg-white/10 py-4">
      <span class="text-4xl font-black text-white/80">{skippedWords.length}</span>
      <span class="text-sm font-medium text-white/60">Skipped</span>
    </div>
  </div>

  <!-- Word lists -->
  <p class="text-xs text-white/40">Tap to change status</p>
  <div class="flex min-h-0 w-full max-w-sm flex-1 flex-col gap-6 overflow-auto">
    {#if correctWords.length > 0}
      <div class="space-y-3">
        <h3 class="text-sm font-semibold tracking-wider uppercase" style:color={GREEN.toRgb()}>
          <i class="fa-solid fa-check mr-2"></i>Correct
        </h3>
        <div class="flex flex-wrap gap-2">
          {#each correctWords as word (word)}
            <button
              class={[
                "px-3 py-1.5",
                "text-sm font-medium text-white",
                "rounded-lg",
                "cursor-pointer transition-all hover:scale-105 active:scale-95",
              ]}
              style:background-color={GREEN.toRgba(0.3)}
              onclick={() => moveToSkipped(word)}
            >
              {word}
            </button>
          {/each}
        </div>
      </div>
    {/if}

    {#if skippedWords.length > 0 || timedOutWord}
      <div class="space-y-3">
        <h3 class="text-sm font-semibold tracking-wider text-white/60 uppercase">
          <i class="fa-solid fa-forward mr-2"></i>Skipped
        </h3>
        <div class="flex flex-wrap gap-2">
          {#each skippedWords as word (word)}
            <button
              class={[
                "px-3 py-1.5",
                "text-sm font-medium text-white/60",
                "bg-white/10",
                "rounded-lg",
                "cursor-pointer transition-all hover:scale-105 active:scale-95",
              ]}
              onclick={() => moveToCorrect(word, "skipped")}
            >
              {word}
            </button>
          {/each}
          {#if timedOutWord}
            <button
              class={[
                "px-3 py-1.5",
                "text-sm font-medium text-white/60",
                "bg-white/10",
                "rounded-lg",
                "cursor-pointer transition-all hover:scale-105 active:scale-95",
              ]}
              onclick={() => moveToCorrect(timedOutWord!, "timedOut")}
            >
              {timedOutWord}*
            </button>
          {/if}
        </div>
      </div>
    {/if}
  </div>

  <!-- Action buttons -->
  <div class="flex w-full max-w-sm flex-shrink-0 flex-col gap-3">
    <Button
      variant="standard"
      size="lg"
      icon="fa-solid fa-rotate-right"
      color={GREEN.toRgb()}
      onclick={onPlayAgain}
    >
      Play Again
    </Button>
    <Button variant="outline" size="lg" icon="fa-solid fa-arrow-left" href="/">
      Back to Games
    </Button>
  </div>
</div>
