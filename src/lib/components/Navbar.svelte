<script lang="ts">
  import { page } from "$app/stores"
  import { GOLD, PURPLE } from "$lib/constants/wavelengthColors"
  import { Color } from "$lib/utils/colors"

  let title = $derived($page.url.pathname.includes("wavelength") ? "Wavelength" : "Campfire Games")
  let isWavelength = $derived($page.url.pathname.includes("wavelength"))
  let isMenuOpen = $state(false)
  let menuRef: HTMLElement | null = $state(null)

  const wavelengthGradient = Color.toGradient(PURPLE, GOLD)

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
    <a
      href={title === "Wavelength" ? "/wavelength?reset=true" : "/"}
      class="text-xl font-bold tracking-tight transition-opacity hover:opacity-80"
      style:background={isWavelength
        ? wavelengthGradient
        : "linear-gradient(to right, hsl(270, 75%, 70%) 0%, hsl(30, 90%, 60%) 100%)"}
      style:-webkit-background-clip="text"
      style:background-clip="text"
      style:color="transparent"
      onclick={closeMenu}
    >
      {title}
    </a>
  </div>

  <div class="relative" bind:this={menuRef}>
    <button
      onclick={toggleMenu}
      class="text-2xl transition-transform duration-200 hover:scale-110 active:scale-95"
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
          <span class="text-lg">📻</span>
          Wavelength
        </a>
      </div>
    {/if}
  </div>
</nav>
