<script lang="ts">
  import { getGameContainerContext } from "$lib/components/layout/gameContainerContext.svelte"
  import Modal from "$lib/components/layout/Modal.svelte"
  import PageActions from "$lib/components/layout/PageActions.svelte"
  import MonikersCardComponent from "$lib/components/monikers/MonikersCard.svelte"
  import { Button } from "$lib/components/ui"
  import { TEAM_BLUE, TEAM_RED } from "$lib/constants/teams"
  import type { MonikersCard } from "$lib/data/monikersCards"
  import type { Color } from "$lib/utils/colors"

  let {
    teamName,
    teamColor,
    currentRound,
    roundName,
    correctCards = $bindable(),
    skippedCards = $bindable(),
    timedOutCard = $bindable(),
    isRoundComplete,
    isGameComplete,
    redScore,
    blueScore,
    onNextTurn,
    onNextRound,
    onEndGame,
  }: {
    teamName: string
    teamColor: Color
    currentRound: number
    roundName: string
    correctCards: MonikersCard[]
    skippedCards: MonikersCard[]
    timedOutCard: MonikersCard | null
    isRoundComplete: boolean
    isGameComplete: boolean
    redScore: number
    blueScore: number
    onNextTurn: () => void
    onNextRound: () => void
    onEndGame: () => void
  } = $props()

  let selectedCard = $state<MonikersCard | null>(null)
  let selectedCardSource = $state<"correct" | "skipped" | "timedOut" | null>(null)
  let isModalOpen = $state(false)

  const ctx = getGameContainerContext()
  $effect(() => {
    ctx.setBackground(teamColor, teamColor)
  })

  // Determine next action
  let nextAction = $derived(() => {
    if (isGameComplete) {
      return { label: "See Results", onclick: onEndGame, icon: "fa-solid fa-trophy" }
    } else if (isRoundComplete) {
      return { label: "Next Round", onclick: onNextRound, icon: "fa-solid fa-arrow-right" }
    } else {
      return { label: "Next Team", onclick: onNextTurn, icon: "fa-solid fa-arrow-right" }
    }
  })

  function openCardModal(card: MonikersCard, source: "correct" | "skipped" | "timedOut") {
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
      skippedCards = skippedCards.filter((c) => c.name !== selectedCard!.name)
    } else if (selectedCardSource === "timedOut") {
      timedOutCard = null
    }
    correctCards = [...correctCards, selectedCard]
    closeModal()
  }

  function moveToSkipped() {
    if (!selectedCard || selectedCardSource !== "correct") return
    correctCards = correctCards.filter((c) => c.name !== selectedCard!.name)
    skippedCards = [...skippedCards, selectedCard]
    closeModal()
  }
</script>

<div class={["flex flex-1 flex-col items-center gap-6", "w-full", "min-h-0"]}>
  <!-- Header -->
  <div class="shrink-0 space-y-2 text-center">
    <p class="text-sm font-medium tracking-widest text-white/60 uppercase">
      {#if isRoundComplete}
        Round {currentRound} Complete!
      {:else}
        Time's Up!
      {/if}
    </p>
    <h1 class="text-4xl font-black text-white" style:color={teamColor.toRgb()}>
      {teamName}
    </h1>
    <p class="text-sm text-white/60">{roundName}</p>
  </div>

  <!-- Turn score -->
  <div class="flex w-full max-w-sm shrink-0 gap-4">
    <div
      class="flex flex-1 flex-col items-center gap-1 rounded-xl py-4"
      style:background-color={teamColor.toRgba(0.2)}
    >
      <span class="text-4xl font-black" style:color={teamColor.toRgb()}>{correctCards.length}</span>
      <span class="text-sm font-medium text-white/60">This Turn</span>
    </div>
    <div class="flex flex-1 flex-col items-center gap-1 rounded-xl bg-white/10 py-4">
      <span class="text-4xl font-black text-white/80">{skippedCards.length}</span>
      <span class="text-sm font-medium text-white/60">Skipped</span>
    </div>
  </div>

  <!-- Total scores (only show at round end) -->
  {#if isRoundComplete}
    <div class="w-full max-w-sm">
      <p class="mb-2 text-center text-xs font-medium tracking-widest text-white/40 uppercase">
        Total Scores
      </p>
      <div class="flex gap-4">
        <div
          class="flex flex-1 items-center justify-center gap-2 rounded-lg py-2"
          style:background-color={TEAM_RED.color.toRgba(0.15)}
        >
          <span class="text-lg font-black" style:color={TEAM_RED.color.toRgb()}>{redScore}</span>
          <span class="text-xs text-white/60">Red</span>
        </div>
        <div
          class="flex flex-1 items-center justify-center gap-2 rounded-lg py-2"
          style:background-color={TEAM_BLUE.color.toRgba(0.15)}
        >
          <span class="text-lg font-black" style:color={TEAM_BLUE.color.toRgb()}>{blueScore}</span>
          <span class="text-xs text-white/60">Blue</span>
        </div>
      </div>
    </div>
  {/if}

  <!-- Card lists -->
  <p class="text-xs text-white/40">Tap to view card</p>
  <div class="flex min-h-0 w-full max-w-sm flex-1 flex-col gap-4 overflow-auto">
    {#if correctCards.length > 0}
      <div class="space-y-2">
        <h3 class="text-xs font-semibold tracking-wider uppercase" style:color={teamColor.toRgb()}>
          <i class="fa-solid fa-check mr-2"></i>Correct ({correctCards.length})
        </h3>
        <div class="flex flex-wrap gap-2">
          {#each correctCards as card (card.name)}
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
              {card.name}
            </button>
          {/each}
        </div>
      </div>
    {/if}

    {#if skippedCards.length > 0 || timedOutCard}
      <div class="space-y-2">
        <h3 class="text-xs font-semibold tracking-wider text-white/60 uppercase">
          <i class="fa-solid fa-forward mr-2"></i>Skipped
        </h3>
        <div class="flex flex-wrap gap-2">
          {#each skippedCards as card (card.name)}
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
              {card.name}
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
              {timedOutCard.name}*
            </button>
          {/if}
        </div>
      </div>
    {/if}
  </div>

  <PageActions
    left={{ label: "End Game", onclick: onEndGame, icon: "fa-solid fa-house" }}
    right={{
      label: nextAction().label,
      onclick: nextAction().onclick,
      icon: nextAction().icon,
      color: teamColor.toRgb(),
    }}
  />
</div>

<!-- Card Detail Modal -->
<Modal bind:isOpen={isModalOpen} onClose={closeModal} title="Card Details">
  <div class="flex flex-col items-center gap-4 p-6">
    {#if selectedCard}
      <MonikersCardComponent card={selectedCard} {teamColor} />

      <!-- Action button -->
      <div class="flex w-full justify-center">
        {#if selectedCardSource === "correct"}
          <Button variant="standard" size="sm" icon="fa-solid fa-forward" onclick={moveToSkipped}>
            Move to Skipped
          </Button>
        {:else}
          <Button
            variant="standard"
            size="sm"
            icon="fa-solid fa-check"
            color={teamColor.toRgb()}
            onclick={moveToCorrect}
          >
            Move to Correct
          </Button>
        {/if}
      </div>
    {/if}
  </div>
</Modal>
