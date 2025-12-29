<script lang="ts">
  import Modal from "$lib/components/layout/Modal.svelte"
  import { Button } from "$lib/components/ui"
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
        <Button
          variant="standard"
          size="lg"
          icon="fa-solid fa-arrow-left"
          color={teamColor.toRgb()}
          fullWidth
          onclick={onClose}
        >
          Continue
        </Button>
      {/if}

      {#if showResume && onResume}
        <Button
          variant="standard"
          size="lg"
          icon="fa-solid fa-play"
          color={teamColor.toRgb()}
          fullWidth
          onclick={onResume}
        >
          Resume
        </Button>
      {/if}

      {#if showResetTurn && onResetTurn}
        <Button
          variant="standard"
          size="lg"
          icon="fa-solid fa-rotate-left"
          fullWidth
          onclick={onResetTurn}
        >
          Reset Turn
        </Button>
      {/if}

      <Button
        variant="standard"
        size="lg"
        icon="fa-solid fa-forward-step"
        fullWidth
        onclick={() => {
          onSkipTeam()
          onClose()
        }}
      >
        Skip Team
      </Button>

      <Button variant="outline" size="lg" icon="fa-solid fa-house" fullWidth onclick={onEndGame}>
        End Game
      </Button>
    </div>
  </div>
</Modal>
