<script lang="ts">
  import { fade } from "svelte/transition"

  import { getGameContainerContext } from "$lib/components/layout/gameContainerContext.svelte"
  import { BLUE, GOLD, ORANGE, PURPLE, RED } from "$lib/constants/colors"
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
      description: "Guess the word without forbidden clues",
      url: "/taboo",
      gradient: Color.toGradient(RED, BLUE),
    },
  ]
</script>

<svelte:head>
  <title>Campfire Games</title>
  <meta name="description" content="Party games for your next gathering" />
</svelte:head>

<div class={["flex flex-col items-center justify-center gap-12", "h-full", "px-4 py-6"]} in:fade>
  <div class="space-y-3 text-center">
    <h1 class={["pb-1", "text-5xl font-black tracking-tight sm:text-6xl"]}>
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

  <div class={["w-full max-w-2xl", "space-y-6"]}>
    <h2 class={["text-center text-xl font-semibold text-white/70"]}>Available Games</h2>
    <div class={["flex justify-center"]}>
      <div class="grid gap-4">
        {#each games as game (game.name)}
          <a
            href={game.url}
            class={[
              "group relative overflow-hidden",
              "p-0.5",
              "rounded-2xl",
              "transition-all hover:scale-[1.02] active:scale-[0.98]",
            ]}
            style:background={game.gradient}
          >
            <div
              class={[
                "flex flex-col gap-3",
                "p-6",
                "bg-[#1a1a1a]",
                "rounded-[14px]",
                "transition-colors group-hover:bg-transparent",
              ]}
            >
              <h3 class={["text-2xl font-bold"]}>
                <span
                  class={["transition-colors group-hover:text-black!"]}
                  style:background={game.gradient}
                  style:-webkit-background-clip="text"
                  style:background-clip="text"
                  style:color="transparent"
                >
                  {game.name}
                </span>
              </h3>
              <p class={["text-sm text-white/70", "transition-colors group-hover:text-black/80"]}>
                {game.description}
              </p>
            </div>
          </a>
        {/each}
      </div>
    </div>
  </div>
</div>
