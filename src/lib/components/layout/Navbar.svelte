<script lang="ts">
  import { page } from "$app/stores"
  import { BLUE, GOLD, GREEN, ORANGE, PURPLE, RED } from "$lib/constants/colors"
  import { Color } from "$lib/utils/colors"

  import Modal from "./Modal.svelte"
  import { getSettingsContext } from "./settingsContext.svelte"

  let isWavelength = $derived($page.url.pathname.includes("wavelength"))
  let isTaboo = $derived($page.url.pathname.includes("taboo"))
  let isHeadsup = $derived($page.url.pathname.includes("headsup"))
  let isMonikers = $derived($page.url.pathname.includes("monikers"))

  let isSettingsOpen = $state(false)

  const settingsContext = getSettingsContext()

  function toggleSettings() {
    isSettingsOpen = !isSettingsOpen
  }
</script>

<nav
  class={[
    "sticky top-0 z-50",
    "flex items-center justify-between",
    "w-full",
    "px-6 py-4",
    "bg-black/30 backdrop-blur-sm",
    "border-b border-white/5",
    "rounded-2xl",
  ]}
>
  <div class="flex items-center gap-2">
    {#if isWavelength}
      <a
        href="/"
        class="text-base font-bold tracking-tight transition-opacity hover:opacity-80 sm:text-lg"
        style:background={Color.toGradient(ORANGE, GOLD)}
        style:-webkit-background-clip="text"
        style:background-clip="text"
        style:color="transparent"
      >
        Campfire Games
      </a>
      <span class="text-base text-white/30 sm:text-lg">/</span>
      <a
        href="/wavelength?reset=true"
        class="text-base font-bold tracking-tight transition-opacity hover:opacity-80 sm:text-lg"
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
        class="text-base font-bold tracking-tight transition-opacity hover:opacity-80 sm:text-lg"
        style:background={Color.toGradient(ORANGE, GOLD)}
        style:-webkit-background-clip="text"
        style:background-clip="text"
        style:color="transparent"
      >
        Campfire Games
      </a>
      <span class="text-base text-white/30 sm:text-lg">/</span>
      <a
        href="/taboo"
        class="text-base font-bold tracking-tight transition-opacity hover:opacity-80 sm:text-lg"
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
        class="text-base font-bold tracking-tight transition-opacity hover:opacity-80 sm:text-lg"
        style:background={Color.toGradient(ORANGE, GOLD)}
        style:-webkit-background-clip="text"
        style:background-clip="text"
        style:color="transparent"
      >
        Campfire Games
      </a>
      <span class="text-base text-white/30 sm:text-lg">/</span>
      <a
        href="/headsup?reset=true"
        class="text-base font-bold tracking-tight transition-opacity hover:opacity-80 sm:text-lg"
        style:background={Color.toGradient(GREEN, PURPLE)}
        style:-webkit-background-clip="text"
        style:background-clip="text"
        style:color="transparent"
      >
        Heads Up
      </a>
    {:else if isMonikers}
      <a
        href="/"
        class="text-base font-bold tracking-tight transition-opacity hover:opacity-80 sm:text-lg"
        style:background={Color.toGradient(ORANGE, GOLD)}
        style:-webkit-background-clip="text"
        style:background-clip="text"
        style:color="transparent"
      >
        Campfire Games
      </a>
      <span class="text-base text-white/30 sm:text-lg">/</span>
      <a
        href="/monikers?reset=true"
        class="text-base font-bold tracking-tight transition-opacity hover:opacity-80 sm:text-lg"
        style:background={Color.toGradient(BLUE, RED)}
        style:-webkit-background-clip="text"
        style:background-clip="text"
        style:color="transparent"
      >
        Monikers
      </a>
    {:else}
      <a
        href="/"
        class="text-base font-bold tracking-tight transition-opacity hover:opacity-80 sm:text-lg"
        style:background={Color.toGradient(ORANGE, GOLD)}
        style:-webkit-background-clip="text"
        style:background-clip="text"
        style:color="transparent"
      >
        Campfire Games
      </a>
    {/if}
  </div>

  <button
    onclick={toggleSettings}
    class={[
      "cursor-pointer",
      "transition-all hover:scale-110 active:scale-95",
      "rounded-lg text-white/70 hover:text-white",
    ]}
    aria-expanded={isSettingsOpen}
    aria-label="Settings"
  >
    <i class="fa-solid fa-gear text-2xl"></i>
  </button>
</nav>

<Modal bind:isOpen={isSettingsOpen} title="Settings">
  <div class="grid grid-cols-2 gap-4 p-6">
    <button
      onclick={settingsContext.toggleMusic}
      class={[
        "flex flex-col items-center justify-center gap-3",
        "aspect-square",
        "p-6",
        "rounded-2xl",
        "transition-all hover:brightness-110 active:scale-95",
        settingsContext.isMusicEnabled ? "bg-white/20 text-white" : "bg-white/5 text-white/50",
      ]}
    >
      <i class="fa-solid fa-music text-4xl"></i>
      <span class="text-sm font-medium">Music</span>
    </button>

    <button
      onclick={settingsContext.toggleVibration}
      class={[
        "flex flex-col items-center justify-center gap-3",
        "aspect-square",
        "p-6",
        "rounded-2xl",
        "transition-all hover:brightness-110 active:scale-95",
        settingsContext.isVibrationEnabled ? "bg-white/20 text-white" : "bg-white/5 text-white/50",
      ]}
    >
      <i class="fa-solid fa-mobile-screen-button text-4xl"></i>
      <span class="text-sm font-medium">Vibration</span>
    </button>
  </div>
</Modal>
