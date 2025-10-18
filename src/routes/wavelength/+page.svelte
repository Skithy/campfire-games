<script lang="ts">
  import { WavelengthGame } from "./Game.svelte"

  const game = new WavelengthGame()
  game.drawPrompts()
</script>

<svelte:head>
  <title>Wavelength</title>
  <meta name="description" content="A Wavelength clone written in SvelteKit" />
</svelte:head>

<div class="flex flex-1 flex-col items-center bg-red-50 font-mono">
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
        onclick={() => {
          game.selectedPrompt = prompt
        }}
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
