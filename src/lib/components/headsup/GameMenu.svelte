<script lang="ts">
  import Modal from "$lib/components/layout/Modal.svelte"
  import { Button } from "$lib/components/ui"
  import { GREEN } from "$lib/constants/colors"

  let {
    isOpen,
    showResume = false,
    showResetTurn = false,
    onClose,
    onResume,
    onResetTurn,
    onEndGame,
  }: {
    isOpen: boolean
    showResume?: boolean
    showResetTurn?: boolean
    onClose: () => void
    onResume?: () => void
    onResetTurn?: () => void
    onEndGame: () => void
  } = $props()
</script>

<Modal bind:isOpen {onClose} title="Menu">
  <div class="space-y-4 p-6">
    <div class="flex flex-col gap-2">
      {#if showResume && onResume}
        <Button
          variant="standard"
          size="lg"
          icon="fa-solid fa-play"
          color={GREEN.toRgb()}
          fullWidth
          onclick={onResume}
        >
          Resume
        </Button>
      {/if}

      {#if showResetTurn && onResetTurn}
        <Button variant="standard" size="lg" icon="fa-solid fa-rotate-left" fullWidth onclick={onResetTurn}>
          Reset Turn
        </Button>
      {/if}

      <Button variant="outline" size="lg" icon="fa-solid fa-house" fullWidth onclick={onEndGame}>
        End Game
      </Button>
    </div>
  </div>
</Modal>
