<script lang="ts">
  import { onDestroy } from "svelte"
  import { fade } from "svelte/transition"

  import { page } from "$app/stores"
  import { getSettingsContext } from "$lib/components/layout/settingsContext.svelte"
  import FinalResultsScreen from "$lib/components/monikers/FinalResultsScreen.svelte"
  import GetReadyScreen from "$lib/components/monikers/GetReadyScreen.svelte"
  import PlayScreen from "$lib/components/monikers/PlayScreen.svelte"
  import ResultsScreen from "$lib/components/monikers/ResultsScreen.svelte"
  import SplashScreen from "$lib/components/monikers/SplashScreen.svelte"
  import { type Team, TEAM_BLUE, TEAM_RED } from "$lib/constants/teams"
  import { type MonikersCard, monikersCards } from "$lib/data/monikersCards"

  const settings = getSettingsContext()

  onDestroy(() => {
    stopTimer()
  })

  type GamePhase = "splash" | "getReady" | "play" | "results" | "finalResults"

  const ROUND_TIME = 60
  const TOTAL_ROUNDS = 3
  const DECK_SIZE = 60

  // Round descriptions
  const ROUND_NAMES = ["Describe It", "One Word", "Act It Out"]
  const ROUND_DESCRIPTIONS = [
    "Use any words except the name itself",
    "Say only ONE word as a clue",
    "No words! Act it out like charades",
  ]

  // Game state
  let phase = $state<GamePhase>("splash")
  let currentTeam = $state<Team>(TEAM_RED)
  let currentRound = $state(1) // 1, 2, or 3
  let timeRemaining = $state(ROUND_TIME)
  let isPaused = $state(false)
  let timerInterval = $state<ReturnType<typeof setInterval> | null>(null)

  // The fixed deck for all 3 rounds (60 cards selected at game start)
  let gameDeck = $state<MonikersCard[]>([])

  // Cards remaining in current round (reshuffled each round from gameDeck)
  let roundDeck = $state<MonikersCard[]>([])
  let currentCardIndex = $state(0)

  // Turn tracking (cards got in this 60-second turn)
  let correctCards = $state<MonikersCard[]>([])
  let skippedCards = $state<MonikersCard[]>([])
  let timedOutCard = $state<MonikersCard | null>(null)

  // Team scores (accumulated across all rounds)
  let redTeamScore = $state(0)
  let blueTeamScore = $state(0)

  // Current card
  let currentCard = $derived(roundDeck[currentCardIndex])

  // Round info
  let roundName = $derived(ROUND_NAMES[currentRound - 1])
  let roundDescription = $derived(ROUND_DESCRIPTIONS[currentRound - 1])

  function shuffleArray<T>(array: T[]): T[] {
    const shuffled = [...array]
    for (let i = shuffled.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1))
      ;[shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]]
    }
    return shuffled
  }

  function initializeGameDeck() {
    // Select 60 random cards from the full deck
    const shuffled = shuffleArray(monikersCards)
    gameDeck = shuffled.slice(0, DECK_SIZE)
  }

  function initializeRoundDeck() {
    // Shuffle the game deck for this round
    roundDeck = shuffleArray(gameDeck)
    currentCardIndex = 0
  }

  function startTimer() {
    if (timerInterval) clearInterval(timerInterval)
    timerInterval = setInterval(() => {
      if (!isPaused) {
        timeRemaining--

        if (settings.isVibrationEnabled && navigator.vibrate) {
          if (timeRemaining === 3 || timeRemaining === 2 || timeRemaining === 1) {
            navigator.vibrate(100)
          } else if (timeRemaining === 10) {
            navigator.vibrate([100, 100, 100])
          }
        }

        if (timeRemaining <= 0) {
          endTurn()
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
    currentRound = 1
    redTeamScore = 0
    blueTeamScore = 0
    initializeGameDeck()
    initializeRoundDeck()
    phase = "getReady"
  }

  function startTurn() {
    timeRemaining = ROUND_TIME
    isPaused = false
    correctCards = []
    skippedCards = []
    timedOutCard = null
    phase = "play"
    startTimer()
  }

  function nextCard() {
    // Remove the card from the round deck (it's been guessed)
    roundDeck = roundDeck.filter((_, i) => i !== currentCardIndex)

    // Check if we've completed the round (all cards guessed)
    if (roundDeck.length === 0) {
      endRound()
      return
    }

    // Adjust index if needed
    if (currentCardIndex >= roundDeck.length) {
      currentCardIndex = 0
    }
  }

  function skipCard() {
    // Move to next card without removing from deck
    skippedCards = [...skippedCards, currentCard]
    currentCardIndex = (currentCardIndex + 1) % roundDeck.length
  }

  function handleCorrect() {
    correctCards = [...correctCards, currentCard]
    nextCard()
  }

  function handleSkip() {
    skipCard()
  }

  function endTurn() {
    stopTimer()
    // Save current card as timed out (stays in deck for next turn)
    timedOutCard = currentCard
    phase = "results"

    // Add correct cards to team score
    if (currentTeam.name === TEAM_RED.name) {
      redTeamScore += correctCards.length
    } else {
      blueTeamScore += correctCards.length
    }
  }

  function endRound() {
    stopTimer()
    timedOutCard = null
    phase = "results"

    // Add correct cards to team score
    if (currentTeam.name === TEAM_RED.name) {
      redTeamScore += correctCards.length
    } else {
      blueTeamScore += correctCards.length
    }
  }

  function nextTeamTurn() {
    // Switch teams
    currentTeam = currentTeam.name === TEAM_RED.name ? TEAM_BLUE : TEAM_RED
    correctCards = []
    skippedCards = []
    timedOutCard = null
    // Shuffle remaining cards in the round deck
    roundDeck = shuffleArray(roundDeck)
    currentCardIndex = 0
    phase = "getReady"
  }

  function startNextRound() {
    currentRound++
    currentTeam = TEAM_RED
    correctCards = []
    skippedCards = []
    timedOutCard = null
    initializeRoundDeck()
    phase = "getReady"
  }

  function resetTurn() {
    stopTimer()
    isPaused = false
    // Add back all correct cards from this turn to the deck
    roundDeck = shuffleArray([...roundDeck, ...correctCards])
    correctCards = []
    skippedCards = []
    currentCardIndex = 0
    phase = "getReady"
  }

  function skipTeam() {
    stopTimer()
    isPaused = false
    // Add back all correct cards from this turn to the deck
    roundDeck = shuffleArray([...roundDeck, ...correctCards])
    currentTeam = currentTeam.name === TEAM_RED.name ? TEAM_BLUE : TEAM_RED
    correctCards = []
    skippedCards = []
    currentCardIndex = 0
    phase = "getReady"
  }

  function endGame() {
    stopTimer()
    isPaused = false
    phase = "finalResults"
  }

  // Check if round is complete (all cards guessed)
  let isRoundComplete = $derived(roundDeck.length === 0)
  let isGameComplete = $derived(isRoundComplete && currentRound >= TOTAL_ROUNDS)

  // Handle reset query param from navbar
  $effect(() => {
    if ($page.url.searchParams.get("reset") === "true") {
      stopTimer()
      phase = "splash"
      // Clear the query param
      const url = new URL($page.url)
      url.searchParams.delete("reset")
      history.replaceState({}, "", url)
    }
  })
</script>

<svelte:head>
  <title>Monikers - Campfire Games</title>
  <meta name="description" content="One deck, three ways to guess" />
</svelte:head>

<div class={["relative", "h-full w-full"]}>
  {#key phase + currentRound}
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
          {currentRound}
          {roundName}
          {roundDescription}
          cardsRemaining={roundDeck.length}
          onStart={startTurn}
          onSkipTeam={skipTeam}
          onResetGame={endGame}
        />
      {:else if phase === "play" && currentCard}
        <PlayScreen
          card={currentCard}
          teamColor={currentTeam.color}
          {currentRound}
          {roundName}
          {timeRemaining}
          {isPaused}
          cardsRemaining={roundDeck.length}
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
          {currentRound}
          {roundName}
          bind:correctCards
          bind:skippedCards
          bind:timedOutCard
          {isRoundComplete}
          {isGameComplete}
          redScore={redTeamScore}
          blueScore={blueTeamScore}
          onNextTurn={nextTeamTurn}
          onNextRound={startNextRound}
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
