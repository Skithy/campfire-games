<script lang="ts">
  import { fade } from "svelte/transition"

  import FinalResultsScreen from "$lib/components/taboo/FinalResultsScreen.svelte"
  import GameContainer from "$lib/components/taboo/GameContainer.svelte"
  import GetReadyScreen from "$lib/components/taboo/GetReadyScreen.svelte"
  import PlayScreen from "$lib/components/taboo/PlayScreen.svelte"
  import ResultsScreen from "$lib/components/taboo/ResultsScreen.svelte"
  import SplashScreen from "$lib/components/taboo/SplashScreen.svelte"
  import { type Team, TEAM_BLUE, TEAM_RED } from "$lib/constants/teams"
  import { type TabooCard, tabooCards } from "$lib/data/tabooCards"

  type GamePhase = "splash" | "getReady" | "play" | "results" | "finalResults"

  const ROUND_TIME = 60

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

  // Team scores
  let redTeamScore = $state(0)
  let blueTeamScore = $state(0)

  // Card deck (shuffled)
  let deck = $state<TabooCard[]>([])
  let usedCardIndices = $state<Set<number>>(new Set())

  // Current card
  let currentCard = $derived(deck[currentCardIndex])

  // Background colors based on phase
  let backgroundTop = $derived.by(() => {
    if (phase === "splash") return TEAM_RED.color
    if (phase === "finalResults") {
      if (redTeamScore > blueTeamScore) return TEAM_RED.color
      if (blueTeamScore > redTeamScore) return TEAM_BLUE.color
      return TEAM_RED.color // tie
    }
    return currentTeam.color
  })
  let backgroundBottom = $derived.by(() => {
    if (phase === "splash") return TEAM_BLUE.color
    if (phase === "finalResults") {
      if (redTeamScore > blueTeamScore) return TEAM_RED.color
      if (blueTeamScore > redTeamScore) return TEAM_BLUE.color
      return TEAM_BLUE.color // tie
    }
    return currentTeam.color
  })

  function shuffleDeck() {
    // Get indices of unused cards
    const availableIndices = tabooCards.map((_, i) => i).filter((i) => !usedCardIndices.has(i))

    // If we've used all cards, reset
    if (availableIndices.length < 10) {
      usedCardIndices.clear()
      deck = [...tabooCards].sort(() => Math.random() - 0.5)
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
    phase = "results"
  }

  function nextTeamRound() {
    // Add score to current team for correct cards
    // Add score to opposing team for skipped cards
    if (currentTeam.name === TEAM_RED.name) {
      redTeamScore += correctCards.length
      blueTeamScore += skippedCards.length
    } else {
      blueTeamScore += correctCards.length
      redTeamScore += skippedCards.length
    }

    // Switch teams
    const nextTeam = currentTeam.name === TEAM_RED.name ? TEAM_BLUE : TEAM_RED
    currentTeam = nextTeam
    correctCards = []
    skippedCards = []
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

<div class="relative flex h-full flex-col overflow-hidden bg-[#111] font-sans text-white">
  <!-- Splash screen -->
  {#key phase === "splash"}
    {#if phase === "splash"}
      <div
        class="absolute inset-0 z-20 flex justify-center overflow-auto"
        in:fade={{ duration: 300, delay: 150 }}
        out:fade={{ duration: 150 }}
      >
        <GameContainer {backgroundTop} {backgroundBottom}>
          <SplashScreen onStart={startGame} />
        </GameContainer>
      </div>
    {/if}
  {/key}

  <!-- Game screens -->
  {#if phase !== "splash"}
    <main class="relative flex h-full flex-1" in:fade={{ duration: 300, delay: 150 }}>
      {#key phase}
        <div class="absolute inset-0 flex justify-center overflow-auto">
          <GameContainer {backgroundTop} {backgroundBottom}>
            {#if phase === "getReady"}
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
                {correctCards}
                {skippedCards}
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
          </GameContainer>
        </div>
      {/key}
    </main>
  {/if}
</div>
