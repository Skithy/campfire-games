<script lang="ts">
  import { fade, scale } from "svelte/transition"

  import type { Color } from "$lib/utils/colors"

  let {
    isOpen,
    teamColor,
    showResume = false,
    showResetTurn = false,
    showContinue = false,
    onClose,
    onResume,
    onResetTurn,
    onSkipTeam,
    onEndGame,
  }: {
    isOpen: boolean
    teamColor: Color
    showResume?: boolean
    showResetTurn?: boolean
    showContinue?: boolean
    onClose: () => void
    onResume?: () => void
    onResetTurn?: () => void
    onSkipTeam: () => void
    onEndGame: () => void
  } = $props()
</script>

{#if isOpen}
  <div
    class="fixed inset-0 z-50 flex items-center justify-center bg-black/80 p-4 backdrop-blur-sm"
    transition:fade
    onclick={onClose}
    role="button"
    tabindex="0"
    onkeydown={(e) => e.key === "Escape" && onClose()}
  >
    <!-- svelte-ignore a11y_no_noninteractive_element_interactions -->
    <div
      class="w-full max-w-sm space-y-4 rounded-2xl border border-white/10 bg-[#1a1a1a] p-6 shadow-2xl"
      transition:scale
      onclick={(e) => e.stopPropagation()}
      onkeydown={(e) => e.stopPropagation()}
      role="document"
    >
      <h3 class="text-center text-2xl font-bold text-white">Menu</h3>

      <div class="flex flex-col gap-2">
        {#if showContinue}
          <button
            class="flex w-full cursor-pointer items-center justify-center gap-2 rounded-xl px-6 py-4 text-lg font-semibold text-white transition-all hover:opacity-90 active:scale-[0.98]"
            style:background-color={teamColor.toRgb()}
            onclick={onClose}
          >
            <i class="fa-solid fa-arrow-left text-base"></i>
            Continue
          </button>
        {/if}

        {#if showResume && onResume}
          <button
            class="flex w-full cursor-pointer items-center justify-center gap-2 rounded-xl px-6 py-4 text-lg font-semibold text-white transition-all hover:opacity-90 active:scale-[0.98]"
            style:background-color={teamColor.toRgb()}
            onclick={onResume}
          >
            <i class="fa-solid fa-play text-base"></i>
            Resume
          </button>
        {/if}

        {#if showResetTurn && onResetTurn}
          <button
            class="flex w-full cursor-pointer items-center justify-center gap-2 rounded-xl bg-white/10 px-6 py-4 text-lg font-semibold text-white transition-all hover:bg-white/20 active:scale-[0.98]"
            onclick={onResetTurn}
          >
            <i class="fa-solid fa-rotate-left text-base"></i>
            Reset Turn
          </button>
        {/if}

        <button
          class="flex w-full cursor-pointer items-center justify-center gap-2 rounded-xl bg-white/10 px-6 py-4 text-lg font-semibold text-white transition-all hover:bg-white/20 active:scale-[0.98]"
          onclick={onSkipTeam}
        >
          <i class="fa-solid fa-forward-step text-base"></i>
          Skip Team
        </button>

        <button
          class="flex w-full cursor-pointer items-center justify-center gap-2 rounded-xl bg-white/10 px-6 py-4 text-lg font-semibold text-white/70 transition-all hover:bg-white/20 hover:text-white active:scale-[0.98]"
          onclick={onEndGame}
        >
          <i class="fa-solid fa-house text-base"></i>
          End Game
        </button>
      </div>
    </div>
  </div>
{/if}
