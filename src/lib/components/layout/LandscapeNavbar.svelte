<script lang="ts">
  import { page } from "$app/stores"
  import { BLUE, GOLD, GREEN, ORANGE, PURPLE, RED } from "$lib/constants/colors"
  import { Color } from "$lib/utils/colors"

  let isWavelength = $derived($page.url.pathname.includes("wavelength"))
  let isTaboo = $derived($page.url.pathname.includes("taboo"))
  let isHeadsup = $derived($page.url.pathname.includes("headsup"))
</script>

<nav
  class={[
    "absolute top-3 left-3 z-50",
    "flex items-center gap-2",
    "px-4 py-3",
    "bg-black/30 backdrop-blur-sm",
    "border border-white/10",
    "rounded-xl",
  ]}
>
  {#if isWavelength}
    <a
      href="/"
      class="text-sm font-bold tracking-tight transition-opacity hover:opacity-80"
      style:background={Color.toGradient(ORANGE, GOLD)}
      style:-webkit-background-clip="text"
      style:background-clip="text"
      style:color="transparent"
    >
      Campfire Games
    </a>
    <span class="text-sm text-white/30">/</span>
    <a
      href="/wavelength?reset=true"
      class="text-sm font-bold tracking-tight transition-opacity hover:opacity-80"
      style:background={Color.toGradient(PURPLE, GOLD)}
      style:-webkit-background-clip="text"
      style:background-clip="text"
      style:color="transparent"
    >
      Wavelength
    </a>
  {:else if isTaboo}
    <a
      href="/"
      class="text-sm font-bold tracking-tight transition-opacity hover:opacity-80"
      style:background={Color.toGradient(ORANGE, GOLD)}
      style:-webkit-background-clip="text"
      style:background-clip="text"
      style:color="transparent"
    >
      Campfire Games
    </a>
    <span class="text-sm text-white/30">/</span>
    <a
      href="/taboo?reset=true"
      class="text-sm font-bold tracking-tight transition-opacity hover:opacity-80"
      style:background={Color.toGradient(RED, BLUE)}
      style:-webkit-background-clip="text"
      style:background-clip="text"
      style:color="transparent"
    >
      Taboo
    </a>
  {:else if isHeadsup}
    <a
      href="/"
      class="text-sm font-bold tracking-tight transition-opacity hover:opacity-80"
      style:background={Color.toGradient(ORANGE, GOLD)}
      style:-webkit-background-clip="text"
      style:background-clip="text"
      style:color="transparent"
    >
      Campfire Games
    </a>
    <span class="text-sm text-white/30">/</span>
    <a
      href="/headsup?reset=true"
      class="text-sm font-bold tracking-tight transition-opacity hover:opacity-80"
      style:background={Color.toGradient(GREEN, PURPLE)}
      style:-webkit-background-clip="text"
      style:background-clip="text"
      style:color="transparent"
    >
      Heads Up
    </a>
  {:else}
    <a
      href="/"
      class="text-sm font-bold tracking-tight transition-opacity hover:opacity-80"
      style:background={Color.toGradient(ORANGE, GOLD)}
      style:-webkit-background-clip="text"
      style:background-clip="text"
      style:color="transparent"
    >
      Campfire Games
    </a>
  {/if}
</nav>
