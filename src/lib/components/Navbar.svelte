<script lang="ts">
  import { page } from "$app/stores"
  import { BLUE, GOLD, ORANGE, PURPLE, RED } from "$lib/constants/colors"
  import { Color } from "$lib/utils/colors"

  let isWavelength = $derived($page.url.pathname.includes("wavelength"))
  let isTaboo = $derived($page.url.pathname.includes("taboo"))

  let isMenuOpen = $state(false)
  let menuRef: HTMLElement | null = $state(null)

  function toggleMenu() {
    isMenuOpen = !isMenuOpen
  }

  function closeMenu() {
    isMenuOpen = false
  }

  function handleClickOutside(event: MouseEvent) {
    if (isMenuOpen && menuRef && !menuRef.contains(event.target as Node)) {
      closeMenu()
    }
  }

  // Add event listener for click outside
  $effect(() => {
    if (isMenuOpen) {
      window.addEventListener("click", handleClickOutside)
    } else {
      window.removeEventListener("click", handleClickOutside)
    }
    return () => {
      window.removeEventListener("click", handleClickOutside)
    }
  })
</script>

<nav
  class="sticky top-0 z-50 flex w-full items-center justify-between border-b border-white/10 bg-black/20 px-6 py-4 backdrop-blur-md"
>
  <div class="flex items-center gap-4">
    {#if isWavelength}
      <a
        href="/wavelength?reset=true"
        class="text-xl font-bold tracking-tight transition-opacity hover:opacity-80"
        style:background={Color.toGradient(PURPLE, GOLD)}
        style:-webkit-background-clip="text"
        style:background-clip="text"
        style:color="transparent"
        onclick={closeMenu}
      >
        Wavelength
      </a>
    {:else if isTaboo}
      <a
        href="/taboo"
        class="text-xl font-bold tracking-tight transition-opacity hover:opacity-80"
        style:background={Color.toGradient(RED, BLUE)}
        style:-webkit-background-clip="text"
        style:background-clip="text"
        style:color="transparent"
        onclick={closeMenu}
      >
        Taboo
      </a>
    {:else}
      <a
        href="/"
        class="text-xl font-bold tracking-tight transition-opacity hover:opacity-80"
        style:background={Color.toGradient(ORANGE, GOLD)}
        style:-webkit-background-clip="text"
        style:background-clip="text"
        style:color="transparent"
        onclick={closeMenu}
      >
        Campfire Games
      </a>
    {/if}
  </div>

  <div class="relative" bind:this={menuRef}>
    <button
      onclick={toggleMenu}
      class="cursor-pointer text-2xl transition-transform duration-200 hover:scale-110 active:scale-95"
      aria-expanded={isMenuOpen}
      aria-haspopup="true"
      aria-label="Menu"
    >
      🏕️
    </button>

    {#if isMenuOpen}
      <div
        class="absolute top-full right-0 mt-3 w-48 origin-top-right overflow-hidden rounded-2xl border border-white/10 bg-gray-900/95 shadow-2xl backdrop-blur-xl"
        role="menu"
      >
        <a
          href="/"
          class="flex items-center gap-3 px-4 py-3 text-sm text-white/80 transition-colors hover:bg-white/10 hover:text-white"
          role="menuitem"
          onclick={closeMenu}
        >
          <span class="text-lg">🏠</span>
          Home
        </a>
        <a
          href="/wavelength"
          class="flex items-center gap-3 px-4 py-3 text-sm text-white/80 transition-colors hover:bg-white/10 hover:text-white"
          role="menuitem"
          onclick={closeMenu}
        >
          <span class="text-lg">🎚️</span>
          Wavelength
        </a>
        <a
          href="/taboo"
          class="flex items-center gap-3 px-4 py-3 text-sm text-white/80 transition-colors hover:bg-white/10 hover:text-white"
          role="menuitem"
          onclick={closeMenu}
        >
          <span class="text-lg">🤫</span>
          Taboo
        </a>
      </div>
    {/if}
  </div>
</nav>
