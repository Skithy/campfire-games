<script lang="ts">
  import { page } from '$app/stores';
  import { onMount } from 'svelte';

  let title = $derived($page.url.pathname.includes('wavelength') ? 'Wavelength' : 'Campfire Games');
  let isMenuOpen = $state(false);
  let menuRef: HTMLElement | null = $state(null);

  function toggleMenu() {
    isMenuOpen = !isMenuOpen;
  }

  function closeMenu() {
    isMenuOpen = false;
  }

  function handleClickOutside(event: MouseEvent) {
    if (isMenuOpen && menuRef && !menuRef.contains(event.target as Node)) {
      closeMenu();
    }
  }

  // Add event listener for click outside
  $effect(() => {
    if (isMenuOpen) {
      window.addEventListener('click', handleClickOutside);
    } else {
      window.removeEventListener('click', handleClickOutside);
    }
    return () => {
      window.removeEventListener('click', handleClickOutside);
    };
  });
</script>

<nav class="sticky top-0 z-50 flex w-full items-center justify-between border-b border-white/10 bg-black/20 px-6 py-4 backdrop-blur-md">
  <div class="flex items-center gap-4">
    <a href="/" class="text-xl font-bold tracking-tight text-white transition-colors hover:text-white/80" onclick={closeMenu}>
      {title}
    </a>
  </div>

  <div class="relative" bind:this={menuRef}>
    <button
      onclick={toggleMenu}
      class="group relative flex items-center justify-center rounded-full bg-white/10 px-4 py-2 text-sm font-medium text-white transition-all hover:bg-white/20 active:scale-95"
      aria-expanded={isMenuOpen}
      aria-haspopup="true"
    >
      <span>Menu</span>
      <!-- Hamburger / Close Icon logic could go here, keeping simple arrow for now but rotating it -->
      <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 20 20"
        fill="currentColor"
        class="ml-2 h-4 w-4 transition-transform duration-200 {isMenuOpen ? 'rotate-180' : ''}"
      >
        <path
          fill-rule="evenodd"
          d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
          clip-rule="evenodd"
        />
      </svg>
    </button>

    {#if isMenuOpen}
      <div
        class="absolute right-0 top-full mt-2 w-56 origin-top-right rounded-xl border border-white/10 bg-gray-900/90 p-2 shadow-xl backdrop-blur-xl transition-all focus:outline-none"
        role="menu"
      >
        <div class="px-2 py-2 text-xs font-semibold uppercase tracking-wider text-gray-400">
          Navigation
        </div>
        <a
          href="/"
          class="block rounded-lg px-4 py-2 text-sm text-white transition-colors hover:bg-white/10"
          role="menuitem"
          onclick={closeMenu}
        >
          Home
        </a>

        <div class="mt-2 border-t border-white/10 pt-2">
          <div class="px-2 py-2 text-xs font-semibold uppercase tracking-wider text-gray-400">
            Games
          </div>
          <a
            href="/wavelength"
            class="block rounded-lg px-4 py-2 text-sm text-white transition-colors hover:bg-white/10"
            role="menuitem"
            onclick={closeMenu}
          >
            Wavelength
          </a>
        </div>
      </div>
    {/if}
  </div>
</nav>
