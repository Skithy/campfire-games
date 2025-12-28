<script lang="ts">
  import { SvelteSet } from "svelte/reactivity"
  import { fade } from "svelte/transition"

  import { getSettingsContext } from "$lib/components/layout/settingsContext.svelte"
  import FinalResultsScreen from "$lib/components/taboo/FinalResultsScreen.svelte"
  import GetReadyScreen from "$lib/components/taboo/GetReadyScreen.svelte"
  import PlayScreen from "$lib/components/taboo/PlayScreen.svelte"
  import ResultsScreen from "$lib/components/taboo/ResultsScreen.svelte"
  import SplashScreen from "$lib/components/taboo/SplashScreen.svelte"
  import { type Team, TEAM_BLUE, TEAM_RED } from "$lib/constants/teams"
  import { type TabooCard, tabooCards } from "$lib/data/tabooCards"

  const settings = getSettingsContext()

  type GamePhase = "splash" | "getReady" | "play" | "results" | "finalResults"

  const ROUND_TIME = 10

  // Game state
  let phase = $state<GamePhase>("splash")
  let currentTeam = $state<Team>(TEAM_RED)
  let currentCardIndex = $state(0)
  let timeRemaining = $state(ROUND_TIME)
  let isPaused = $state(false)
  let timerInterval = $state<ReturnType<typeof setInterval> | null>(null)

  // Round tracking
  let correctCards = $state<TabooCard[]>([])
  let skippedCards = $state<TabooCard[]>([])
  let timedOutCard = $state<TabooCard | null>(null)

  // Team scores
  let redTeamScore = $state(0)
  let blueTeamScore = $state(0)

  // Card deck (shuffled)
  let deck = $state<TabooCard[]>([])
  let usedCardIndices = new SvelteSet<number>()

  // Current card
  let currentCard = $derived(deck[currentCardIndex])

  function shuffleDeck() {
    // Get indices of unused cards
    const availableIndices = tabooCards.map((_, i) => i).filter((i) => !usedCardIndices.has(i))

    // If we've used all cards, reset (shouldn't happen in normal gameplay)
    if (availableIndices.length === 0) {
      usedCardIndices.clear()
      const shuffledIndices = tabooCards.map((_, i) => i).sort(() => Math.random() - 0.5)
      deck = shuffledIndices.map((i) => tabooCards[i])
    } else {
      // Shuffle available cards
      const shuffledIndices = availableIndices.sort(() => Math.random() - 0.5)
      deck = shuffledIndices.map((i) => tabooCards[i])
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
            // Short vibration for last 3 seconds
            navigator.vibrate(100)
          } else if (timeRemaining === 10) {
            // Double vibration at 10 seconds
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
    currentTeam = TEAM_RED
    correctCards = []
    skippedCards = []
    redTeamScore = 0
    blueTeamScore = 0
    usedCardIndices.clear()
    shuffleDeck()
    phase = "getReady"
  }

  function startRound() {
    timeRemaining = ROUND_TIME
    isPaused = false
    correctCards = []
    skippedCards = []
    phase = "play"
    startTimer()
  }

  function nextCard() {
    // Mark current card as used
    const cardIndex = tabooCards.findIndex((c) => c.word === currentCard.word)
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
    correctCards = [...correctCards, currentCard]
    nextCard()
  }

  function handleSkip() {
    skippedCards = [...skippedCards, currentCard]
    nextCard()
  }

  function endRound() {
    stopTimer()
    // Save the current card as timed out (doesn't count as skipped)
    timedOutCard = currentCard

    // Mark the timed-out card as used so it doesn't appear again
    const cardIndex = tabooCards.findIndex((c) => c.word === currentCard.word)
    if (cardIndex !== -1) {
      usedCardIndices.add(cardIndex)
    }

    phase = "results"

    // Add score to current team for correct cards
    // Add score to opposing team for skipped cards
    // Note: timedOutCard does NOT count towards skipped score
    if (currentTeam.name === TEAM_RED.name) {
      redTeamScore += correctCards.length
      blueTeamScore += skippedCards.length
    } else {
      blueTeamScore += correctCards.length
      redTeamScore += skippedCards.length
    }
  }

  function nextTeamRound() {
    // Switch teams
    const nextTeam = currentTeam.name === TEAM_RED.name ? TEAM_BLUE : TEAM_RED
    currentTeam = nextTeam
    correctCards = []
    skippedCards = []
    timedOutCard = null
    shuffleDeck()
    phase = "getReady"
  }

  function resetTurn() {
    stopTimer()
    isPaused = false
    correctCards = []
    skippedCards = []
    shuffleDeck()
    phase = "getReady"
  }

  function skipTeam() {
    stopTimer()
    isPaused = false
    const nextTeam = currentTeam.name === TEAM_RED.name ? TEAM_BLUE : TEAM_RED
    currentTeam = nextTeam
    correctCards = []
    skippedCards = []
    shuffleDeck()
    phase = "getReady"
  }

  function endGame() {
    stopTimer()
    isPaused = false
    phase = "finalResults"
  }
</script>

<svelte:head>
  <title>Taboo - Campfire Games</title>
  <meta name="description" content="Guess the word without forbidden clues" />
</svelte:head>

<div class={["relative", "h-full w-full"]}>
  {#key phase}
    <div
      class={["absolute inset-0", "flex flex-col", "w-full", "pt-6"]}
      in:fade={{ duration: 300, delay: 150 }}
      out:fade={{ duration: 150 }}
    >
      {#if phase === "splash"}
        <SplashScreen onStart={startGame} />
      {:else if phase === "getReady"}
        <GetReadyScreen
          teamName={currentTeam.name}
          teamColor={currentTeam.color}
          onStart={startRound}
          onSkipTeam={skipTeam}
          onResetGame={endGame}
        />
      {:else if phase === "play" && currentCard}
        <PlayScreen
          card={currentCard}
          teamColor={currentTeam.color}
          {timeRemaining}
          {isPaused}
          onCorrect={handleCorrect}
          onSkip={handleSkip}
          onTogglePause={togglePause}
          onResetTurn={resetTurn}
          onSkipTeam={skipTeam}
          onResetGame={endGame}
        />
      {:else if phase === "results"}
        <ResultsScreen
          teamName={currentTeam.name}
          teamColor={currentTeam.color}
          bind:correctCards
          bind:skippedCards
          bind:timedOutCard
          onNextRound={nextTeamRound}
          onEndGame={endGame}
        />
      {:else if phase === "finalResults"}
        <FinalResultsScreen
          redScore={redTeamScore}
          blueScore={blueTeamScore}
          onPlayAgain={startGame}
        />
      {/if}
    </div>
  {/key}
</div>
