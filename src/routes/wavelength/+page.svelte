<script lang="ts">
  import { WavelengthGame } from "./Game.svelte"

  const game = new WavelengthGame()
</script>

<svelte:head>
  <title>Wavelength</title>
  <meta name="description" content="A Wavelength clone written in SvelteKit" />
</svelte:head>

{#if game.screen === "lobby"}
  <div class="flex flex-1 flex-col items-center bg-green-100 font-mono">
    <h1 class="mt-16 mb-10 text-5xl font-bold">Wavelength</h1>
    <button
      onclick={() => game.startGame()}
      class={[
        "cursor-pointer",
        "rounded px-6 py-3",
        "border-2 border-blue-400",
        "bg-blue-200 active:bg-blue-300",
        "transition",
        "text-2xl font-bold",
      ]}
    >
      Start Game
    </button>
  </div>
{:else if game.screen === "prompt"}
  <div class="flex flex-1 flex-col items-center bg-green-100 font-mono">
    <h2 class="mt-16 mb-10 text-4xl">Pick a prompt</h2>

    <!-- All prompts as cards -->
    <div class="flex flex-col gap-y-8">
      {#each game.prompts as prompt (prompt.id)}
        <button
          class={[
            "cursor-pointer",
            "flex flex-col items-center",
            "transition",
            "border-2 border-amber-400",
            "bg-amber-200 active:bg-amber-300",
            "w-60 gap-y-6 rounded-xl p-6 font-bold",
          ]}
          onclick={() => game.selectPrompt(prompt)}
          type="button"
        >
          <div>{prompt.from}</div>
          <i class="fa-solid fa-arrows-up-down"></i>
          <div>{prompt.to}</div>
        </button>
      {/each}
    </div>

    <button
      onclick={() => game.drawPrompts()}
      class={[
        "mt-10 cursor-pointer",
        "rounded px-4 py-2",
        "border-2 border-gray-300",
        "bg-gray-200 active:bg-gray-300",
        "transition",
      ]}
    >
      <i class="fa-solid fa-shuffle"></i>
      Shuffle
    </button>
  </div>
{:else if game.screen === "score"}
  <div class="flex flex-1 flex-col items-center bg-green-100 font-mono">
    <h2 class="mt-16 mb-10 text-4xl">Selected Prompt</h2>
    {#if game.selectedPrompt}
      <div
        class={[
          "flex flex-col items-center",
          "border-2 border-amber-400",
          "bg-amber-200 p-6",
          "w-60 gap-y-6 rounded-xl",
          "font-bold",
        ]}
      >
        <div>{game.selectedPrompt.from}</div>
        <i class="fa-solid fa-arrows-up-down"></i>
        <div>{game.selectedPrompt.to}</div>
      </div>
    {/if}
    <div class="mt-10 text-2xl">
      The rating is: <span class="font-bold">{game.rating}</span>
    </div>
    <button
      onclick={() => game.nextRound()}
      class={[
        "mt-10 cursor-pointer",
        "rounded px-6 py-3",
        "border-2 border-blue-400",
        "bg-blue-200 active:bg-blue-300",
        "transition",
        "text-2xl font-bold",
      ]}
    >
      Next Round
    </button>
  </div>
{/if}
