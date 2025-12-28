<script lang="ts">
  import Modal from "$lib/components/layout/Modal.svelte"
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

<Modal bind:isOpen {onClose} title="Menu">
  <div class="space-y-4 p-6">
    <div class="flex flex-col gap-2">
      {#if showContinue}
        <button
          class={[
            "flex items-center justify-center gap-2",
            "w-full",
            "px-6 py-4",
            "text-lg font-semibold text-white",
            "rounded-xl",
            "cursor-pointer transition-all hover:opacity-90 active:scale-[0.98]",
          ]}
          style:background-color={teamColor.toRgb()}
          onclick={onClose}
        >
          <i class="fa-solid fa-arrow-left text-base"></i>
          Continue
        </button>
      {/if}

      {#if showResume && onResume}
        <button
          class={[
            "flex items-center justify-center gap-2",
            "w-full",
            "px-6 py-4",
            "text-lg font-semibold text-white",
            "rounded-xl",
            "cursor-pointer transition-all hover:opacity-90 active:scale-[0.98]",
          ]}
          style:background-color={teamColor.toRgb()}
          onclick={onResume}
        >
          <i class="fa-solid fa-play text-base"></i>
          Resume
        </button>
      {/if}

      {#if showResetTurn && onResetTurn}
        <button
          class={[
            "flex items-center justify-center gap-2",
            "w-full",
            "px-6 py-4",
            "text-lg font-semibold text-white",
            "bg-white/10",
            "rounded-xl",
            "cursor-pointer transition-all hover:bg-white/20 active:scale-[0.98]",
          ]}
          onclick={onResetTurn}
        >
          <i class="fa-solid fa-rotate-left text-base"></i>
          Reset Turn
        </button>
      {/if}

      <button
        class={[
          "flex items-center justify-center gap-2",
          "w-full",
          "px-6 py-4",
          "text-lg font-semibold text-white",
          "bg-white/10",
          "rounded-xl",
          "cursor-pointer transition-all hover:bg-white/20 active:scale-[0.98]",
        ]}
        onclick={() => {
          onSkipTeam()
          onClose()
        }}
      >
        <i class="fa-solid fa-forward-step text-base"></i>
        Skip Team
      </button>

      <button
        class={[
          "flex items-center justify-center gap-2",
          "w-full",
          "px-6 py-4",
          "text-lg font-semibold text-white/70",
          "bg-white/10",
          "rounded-xl",
          "cursor-pointer transition-all hover:bg-white/20 hover:text-white active:scale-[0.98]",
        ]}
        onclick={onEndGame}
      >
        <i class="fa-solid fa-house text-base"></i>
        End Game
      </button>
    </div>
  </div>
</Modal>
