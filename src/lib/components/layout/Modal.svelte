<script lang="ts">
  import type { Snippet } from "svelte"
  import { fade, scale } from "svelte/transition"

  import { GOLD, ORANGE } from "$lib/constants/colors"
  import { Color } from "$lib/utils/colors"

  import { getGameContainerContext } from "./gameContainerContext.svelte"

  let {
    isOpen = $bindable(),
    children,
    title,
    onClose,
  }: {
    isOpen: boolean
    children: Snippet
    title: string
    onClose?: () => void
  } = $props()

  const ctx = getGameContainerContext()

  let gradient = $derived(
    ctx.backgroundTop && ctx.backgroundBottom
      ? Color.toVerticalGradient(ctx.backgroundTop, ctx.backgroundBottom)
      : Color.toVerticalGradient(ORANGE, GOLD),
  )

  function handleClose() {
    onClose?.()
    isOpen = false
  }

  function handleBackdropClick(e: MouseEvent) {
    if (e.target === e.currentTarget) {
      handleClose()
    }
  }
</script>

{#if isOpen}
  <!-- svelte-ignore a11y_click_events_have_key_events -->
  <div
    class="fixed inset-0 z-50 flex items-center justify-center bg-black/70 p-4 backdrop-blur-sm"
    transition:fade={{ duration: 200 }}
    onclick={handleBackdropClick}
    role="button"
    tabindex="-1"
  >
    <div
      class="mx-auto w-full max-w-sm rounded-2xl p-0.5 shadow-2xl md:max-w-lg"
      style:background={gradient}
      style:max-height="85vh"
      transition:scale={{ duration: 200, start: 0.95 }}
    >
      <div class="flex h-full flex-col rounded-[14px] bg-[#1a1a1a]">
        <div
          class="flex shrink-0 items-center justify-between border-b border-white/10 px-6 py-4 md:px-8 md:py-5"
        >
          <h2 class="text-xl font-bold text-white/90 md:text-2xl">{title}</h2>
          <button
            onclick={handleClose}
            class="text-white/50 transition-colors hover:text-white"
            aria-label="Close"
          >
            <i class="fa-solid fa-xmark text-2xl md:text-3xl"></i>
          </button>
        </div>
        <div class="flex-1 overflow-y-auto">
          {@render children()}
        </div>
      </div>
    </div>
  </div>
{/if}
