<script lang="ts">
  import { onDestroy } from "svelte"
  import { SvelteSet } from "svelte/reactivity"
  import { fade } from "svelte/transition"

  import { goto } from "$app/navigation"
  import { page } from "$app/stores"
  import GetReadyScreen from "$lib/components/headsup/GetReadyScreen.svelte"
  import PlayScreen from "$lib/components/headsup/PlayScreen.svelte"
  import ResultsScreen from "$lib/components/headsup/ResultsScreen.svelte"
  import SplashScreen from "$lib/components/headsup/SplashScreen.svelte"
  import {
    getGameContainerContext,
    Orientation,
  } from "$lib/components/layout/gameContainerContext.svelte"
  import { getSettingsContext } from "$lib/components/layout/settingsContext.svelte"
  import { tabooCards } from "$lib/data/tabooCards"

  const settings = getSettingsContext()
  const gameContainer = getGameContainerContext()

  // Clean up timer and reset orientation when leaving the page
  onDestroy(() => {
    stopTimer()
    gameContainer.setOrientation(Orientation.Portrait)
  })

  type GamePhase = "splash" | "getReady" | "play" | "results"

  const ROUND_TIME = 60

  // Game state
  let phase = $state<GamePhase>("splash")
  let currentCardIndex = $state(0)
  let timeRemaining = $state(ROUND_TIME)
  let isPaused = $state(false)
  let timerInterval = $state<ReturnType<typeof setInterval> | null>(null)

  // Round tracking
  let correctWords = $state<string[]>([])
  let skippedWords = $state<string[]>([])
  let timedOutWord = $state<string | null>(null)

  // Card deck (shuffled)
  let deck = $state<string[]>([])
  let usedCardIndices = new SvelteSet<number>()

  // Current word
  let currentWord = $derived(deck[currentCardIndex])

  function shuffleDeck() {
    // Get indices of unused cards
    const availableIndices = tabooCards.map((_, i) => i).filter((i) => !usedCardIndices.has(i))

    // If we've used all cards, reset
    if (availableIndices.length === 0) {
      usedCardIndices.clear()
      const shuffledIndices = tabooCards.map((_, i) => i).sort(() => Math.random() - 0.5)
      deck = shuffledIndices.map((i) => tabooCards[i].word)
    } else {
      // Shuffle available cards
      const shuffledIndices = availableIndices.sort(() => Math.random() - 0.5)
      deck = shuffledIndices.map((i) => tabooCards[i].word)
    }
    currentCardIndex = 0
  }

  function startTimer() {
    if (timerInterval) clearInterval(timerInterval)
    timerInterval = setInterval(() => {
      if (!isPaused) {
        timeRemaining--

        // Vibration feedback during countdown
        if (settings.isVibrationEnabled && navigator.vibrate) {
          if (timeRemaining === 3 || timeRemaining === 2 || timeRemaining === 1) {
            navigator.vibrate(100)
          } else if (timeRemaining === 10) {
            navigator.vibrate([100, 100, 100])
          }
        }

        if (timeRemaining <= 0) {
          endRound()
        }
      }
    }, 1000)
  }

  function stopTimer() {
    if (timerInterval) {
      clearInterval(timerInterval)
      timerInterval = null
    }
  }

  function togglePause() {
    isPaused = !isPaused
  }

  function startGame() {
    correctWords = []
    skippedWords = []
    usedCardIndices.clear()
    shuffleDeck()
    phase = "getReady"
  }

  function startRound() {
    timeRemaining = ROUND_TIME
    isPaused = false
    correctWords = []
    skippedWords = []
    timedOutWord = null
    phase = "play"
    startTimer()
  }

  function nextCard() {
    // Mark current card as used
    const cardIndex = tabooCards.findIndex((c) => c.word === currentWord)
    if (cardIndex !== -1) {
      usedCardIndices.add(cardIndex)
    }

    currentCardIndex++
    // If we run out of cards in the deck, reshuffle
    if (currentCardIndex >= deck.length) {
      shuffleDeck()
    }
  }

  function handleCorrect() {
    correctWords = [...correctWords, currentWord]
    nextCard()
  }

  function handleSkip() {
    skippedWords = [...skippedWords, currentWord]
    nextCard()
  }

  function endRound() {
    stopTimer()
    timedOutWord = currentWord
    phase = "results"
  }

  function resetTurn() {
    stopTimer()
    isPaused = false
    correctWords = []
    skippedWords = []
    shuffleDeck()
    phase = "getReady"
  }

  function resetGame() {
    stopTimer()
    isPaused = false
    phase = "splash"
  }

  $effect(() => {
    if ($page.url.searchParams.has("reset")) {
      phase = "splash"
      goto("/headsup", { replaceState: true })
    }
  })
</script>

<svelte:head>
  <title>Heads Up - Campfire Games</title>
  <meta name="description" content="Hold the phone to your forehead and guess the word" />
</svelte:head>

<div class={["relative", "h-full w-full"]}>
  {#key phase}
    <div
      class={[
        "absolute inset-0",
        "flex flex-col",
        "w-full",
        gameContainer.orientation !== Orientation.Landscape && "pt-6",
      ]}
      in:fade={{ duration: 300, delay: 150 }}
      out:fade={{ duration: 150 }}
    >
      {#if phase === "splash"}
        <SplashScreen onStart={startGame} />
      {:else if phase === "getReady"}
        <GetReadyScreen onStart={startRound} />
      {:else if phase === "play" && currentWord}
        <PlayScreen
          word={currentWord}
          {timeRemaining}
          {isPaused}
          onCorrect={handleCorrect}
          onSkip={handleSkip}
          onTogglePause={togglePause}
          onResetTurn={resetTurn}
          onResetGame={resetGame}
        />
      {:else if phase === "results"}
        <ResultsScreen
          bind:correctWords
          bind:skippedWords
          bind:timedOutWord
          onPlayAgain={startGame}
        />
      {/if}
    </div>
  {/key}
</div>
