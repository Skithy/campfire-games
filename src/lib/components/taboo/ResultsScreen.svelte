<script lang="ts">
  import { getGameContainerContext } from "$lib/components/layout/gameContainerContext.svelte"
  import Modal from "$lib/components/layout/Modal.svelte"
  import PageActions from "$lib/components/layout/PageActions.svelte"
  import TabooCardComponent from "$lib/components/taboo/TabooCard.svelte"
  import { Button, IconButton } from "$lib/components/ui"
  import type { TabooCard } from "$lib/data/tabooCards"
  import type { Color } from "$lib/utils/colors"

  let {
    teamName,
    teamColor,
    correctCards = $bindable(),
    skippedCards = $bindable(),
    timedOutCard = $bindable(),
    onNextRound,
    onEndGame,
  }: {
    teamName: string
    teamColor: Color
    correctCards: TabooCard[]
    skippedCards: TabooCard[]
    timedOutCard: TabooCard | null
    onNextRound: () => void
    onEndGame: () => void
  } = $props()

  let selectedCard = $state<TabooCard | null>(null)
  let selectedCardSource = $state<"correct" | "skipped" | "timedOut" | null>(null)
  let isModalOpen = $state(false)

  const ctx = getGameContainerContext()
  $effect(() => {
    ctx.setBackground(teamColor, teamColor)
  })

  function openCardModal(card: TabooCard, source: "correct" | "skipped" | "timedOut") {
    selectedCard = card
    selectedCardSource = source
    isModalOpen = true
  }

  function closeModal() {
    selectedCard = null
    selectedCardSource = null
    isModalOpen = false
  }

  function moveToCorrect() {
    if (!selectedCard) return
    if (selectedCardSource === "skipped") {
      skippedCards = skippedCards.filter((c) => c.word !== selectedCard!.word)
    } else if (selectedCardSource === "timedOut") {
      timedOutCard = null
    }
    correctCards = [...correctCards, selectedCard]
    closeModal()
  }

  function moveToSkipped() {
    if (!selectedCard || selectedCardSource !== "correct") return
    correctCards = correctCards.filter((c) => c.word !== selectedCard!.word)
    skippedCards = [...skippedCards, selectedCard]
    closeModal()
  }
</script>

<div class={["flex flex-1 flex-col items-center gap-6", "w-full", "min-h-0"]}>
  <!-- Header -->
  <div class="flex-shrink-0 space-y-2 text-center">
    <p class="text-sm font-medium tracking-widest text-white/60 uppercase">Time's Up!</p>
    <h1 class="text-4xl font-black text-white" style:color={teamColor.toRgb()}>
      {teamName}
    </h1>
  </div>

  <!-- Score summary -->
  <div class="flex w-full max-w-sm flex-shrink-0 gap-4">
    <div
      class="flex flex-1 flex-col items-center gap-1 rounded-xl py-4"
      style:background-color={teamColor.toRgba(0.2)}
    >
      <span class="text-4xl font-black" style:color={teamColor.toRgb()}>{correctCards.length}</span>
      <span class="text-sm font-medium text-white/60">Correct</span>
    </div>
    <div class="flex flex-1 flex-col items-center gap-1 rounded-xl bg-white/10 py-4">
      <span class="text-4xl font-black text-white/80">{skippedCards.length}</span>
      <span class="text-sm font-medium text-white/60">Skipped</span>
    </div>
  </div>

  <!-- Card lists -->
  <div class="flex min-h-0 w-full max-w-sm flex-1 flex-col gap-6 overflow-auto">
    {#if correctCards.length > 0}
      <div class="space-y-3">
        <h3 class="text-sm font-semibold tracking-wider uppercase" style:color={teamColor.toRgb()}>
          <i class="fa-solid fa-check mr-2"></i>Correct
        </h3>
        <div class="flex flex-wrap gap-2">
          {#each correctCards as card (card.word)}
            <button
              class={[
                "px-3 py-1.5",
                "text-sm font-medium text-white",
                "rounded-lg",
                "cursor-pointer transition-all hover:scale-105 active:scale-95",
              ]}
              style:background-color={teamColor.toRgba(0.3)}
              onclick={() => openCardModal(card, "correct")}
            >
              {card.word}
            </button>
          {/each}
        </div>
      </div>
    {/if}

    {#if skippedCards.length > 0 || timedOutCard}
      <div class="space-y-3">
        <h3 class="text-sm font-semibold tracking-wider text-white/60 uppercase">
          <i class="fa-solid fa-forward mr-2"></i>Skipped
        </h3>
        <div class="flex flex-wrap gap-2">
          {#each skippedCards as card (card.word)}
            <button
              class={[
                "px-3 py-1.5",
                "text-sm font-medium text-white/60",
                "bg-white/10",
                "rounded-lg",
                "cursor-pointer transition-all hover:scale-105 active:scale-95",
              ]}
              onclick={() => openCardModal(card, "skipped")}
            >
              {card.word}
            </button>
          {/each}
          {#if timedOutCard}
            <button
              class={[
                "px-3 py-1.5",
                "text-sm font-medium text-white/60",
                "bg-white/10",
                "rounded-lg",
                "cursor-pointer transition-all hover:scale-105 active:scale-95",
              ]}
              onclick={() => openCardModal(timedOutCard!, "timedOut")}
            >
              {timedOutCard.word}*
            </button>
          {/if}
        </div>
      </div>
    {/if}
  </div>

  <PageActions
    left={{ label: "End Game", onclick: onEndGame, icon: "fa-solid fa-house" }}
    right={{ label: "Next Team", onclick: onNextRound, icon: "fa-solid fa-arrow-right", color: teamColor.toRgb() }}
  />
</div>

<!-- Card Detail Modal -->
<Modal bind:isOpen={isModalOpen} onClose={closeModal} title="Card Details">
  <div class="flex flex-col items-center gap-4 p-6">
    {#if selectedCard}
      <TabooCardComponent card={selectedCard} {teamColor} />

      <!-- Action buttons -->
      <div class="flex gap-3">
        {#if selectedCardSource === "correct"}
          <Button variant="standard" size="sm" icon="fa-solid fa-forward" onclick={moveToSkipped}>
            Move to Skipped
          </Button>
        {:else}
          <Button variant="standard" size="sm" icon="fa-solid fa-check" color={teamColor.toRgb()} onclick={moveToCorrect}>
            Move to Correct
          </Button>
        {/if}

        <IconButton
          icon="fa-solid fa-xmark"
          shape="square"
          size="lg"
          label="Close"
          onclick={closeModal}
        />
      </div>
    {/if}
  </div>
</Modal>
