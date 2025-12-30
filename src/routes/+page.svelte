<script lang="ts">
  import { fade } from "svelte/transition"

  import { getGameContainerContext } from "$lib/components/layout/gameContainerContext.svelte"
  import { BLUE, GOLD, GREEN, ORANGE, PURPLE, RED } from "$lib/constants/colors"
  import { Color } from "$lib/utils/colors"

  const { setBackground } = getGameContainerContext()
  setBackground(ORANGE, GOLD)

  const games = [
    {
      name: "Wavelength",
      description: "A game of telepathy and empathy",
      url: "/wavelength",
      gradient: Color.toGradient(PURPLE, GOLD),
    },
    {
      name: "Taboo",
      description: "The word-guessing game with a twist",
      url: "/taboo",
      gradient: Color.toGradient(RED, BLUE),
    },
    {
      name: "Heads Up",
      description: "What's on your head? Find out!",
      url: "/headsup",
      gradient: Color.toGradient(GREEN, PURPLE),
    },
    {
      name: "Monikers",
      description: "One deck, three ways to guess",
      url: "/monikers",
      gradient: Color.toGradient(RED, BLUE),
    },
  ]
</script>

<svelte:head>
  <title>Campfire Games</title>
  <meta name="description" content="Party games for your next gathering" />
</svelte:head>

<div class={["flex flex-col items-center", "h-full min-h-0", "px-4 py-6 pt-12"]} in:fade>
  <div class="flex-shrink-0 space-y-3 pb-2 text-center">
    <h1 class={["pb-1", "text-5xl font-black tracking-tight"]}>
      <span
        style:background={Color.toGradient(ORANGE, GOLD)}
        style:-webkit-background-clip="text"
        style:background-clip="text"
        style:color="transparent"
      >
        Campfire Games
      </span>
    </h1>
    <p class={["text-lg text-white/50"]}>Party games for your next gathering</p>
  </div>

  <div class={["min-h-0 w-full max-w-md flex-1", "overflow-x-hidden overflow-y-auto", "pt-4"]}>
    <div class="grid gap-3">
      {#each games as game (game.name)}
        <a
          href={game.url}
          class={[
            "group relative",
            "p-0.5",
            "rounded-xl",
            "transition-all hover:scale-[1.02] active:scale-[0.98]",
          ]}
          style:background={game.gradient}
        >
          <div
            class={[
              "flex flex-col gap-2",
              "px-5 py-4",
              "bg-[#1a1a1a]",
              "rounded-[10px]",
              "transition-colors group-hover:bg-transparent",
            ]}
          >
            <h3 class="text-xl font-bold text-white transition-colors group-hover:text-black">
              {game.name}
            </h3>
            <p
              class={["pb-1 text-sm text-white/70", "transition-colors group-hover:text-black/80"]}
            >
              {game.description}
            </p>
          </div>
        </a>
      {/each}
    </div>
  </div>
</div>
