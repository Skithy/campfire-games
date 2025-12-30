<script lang="ts">
  import { onDestroy } from "svelte"
  import { SvelteSet } from "svelte/reactivity"
  import { fade } from "svelte/transition"

  import { goto } from "$app/navigation"
  import { page } from "$app/stores"
  import CategorySelectScreen from "$lib/components/headsup/CategorySelectScreen.svelte"
  import GetReadyScreen from "$lib/components/headsup/GetReadyScreen.svelte"
  import PlayScreen from "$lib/components/headsup/PlayScreen.svelte"
  import ResultsScreen from "$lib/components/headsup/ResultsScreen.svelte"
  import SplashScreen from "$lib/components/headsup/SplashScreen.svelte"
  import {
    getGameContainerContext,
    Orientation,
  } from "$lib/components/layout/gameContainerContext.svelte"
  import { getSettingsContext } from "$lib/components/layout/settingsContext.svelte"
  import { type HeadsUpCategory } from "$lib/data/headsupCategories"

  const settings = getSettingsContext()
  const gameContainer = getGameContainerContext()

  // Clean up timer, orientation timeout, and reset orientation when leaving the page
  onDestroy(() => {
    stopTimer()
    if (orientationTimeout) {
      clearTimeout(orientationTimeout)
    }
    gameContainer.setOrientation(Orientation.Portrait)
  })

  let orientationTimeout: ReturnType<typeof setTimeout> | null = null

  type GamePhase = "splash" | "categorySelect" | "getReady" | "play" | "results"

  const ROUND_TIME = 60

  // Game state
  let phase = $state<GamePhase>("splash")
  let selectedCategory = $state<HeadsUpCategory | null>(null)
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
  let usedPromptIndices = new SvelteSet<number>()

  // Current word
  let currentWord = $derived(deck[currentCardIndex])

  function shuffleDeck() {
    if (!selectedCategory) return

    const prompts = selectedCategory.prompts
    // Get indices of unused prompts
    const availableIndices = prompts.map((_, i) => i).filter((i) => !usedPromptIndices.has(i))

    // If we've used all prompts, reset
    if (availableIndices.length === 0) {
      usedPromptIndices.clear()
      const shuffledIndices = prompts.map((_, i) => i).sort(() => Math.random() - 0.5)
      deck = shuffledIndices.map((i) => prompts[i])
    } else {
      // Shuffle available prompts
      const shuffledIndices = availableIndices.sort(() => Math.random() - 0.5)
      deck = shuffledIndices.map((i) => prompts[i])
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
    phase = "categorySelect"
  }

  function selectCategory(category: HeadsUpCategory) {
    selectedCategory = category
    usedPromptIndices.clear()
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
    if (!selectedCategory) return

    // Mark current prompt as used
    const promptIndex = selectedCategory.prompts.findIndex((p) => p === currentWord)
    if (promptIndex !== -1) {
      usedPromptIndices.add(promptIndex)
    }

    currentCardIndex++
    // If we run out of prompts in the deck, reshuffle
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

  // Transition timing constants
  const FADE_OUT_DURATION = 200

  // Set orientation after fade out completes
  function getOrientationForPhase(p: GamePhase): Orientation {
    const landscapePhases: GamePhase[] = ["getReady", "play"]
    return landscapePhases.includes(p) ? Orientation.Landscape : Orientation.Portrait
  }

  $effect(() => {
    const newOrientation = getOrientationForPhase(phase)
    const currentOrientation = gameContainer.orientation

    // Clear any pending orientation change
    if (orientationTimeout) {
      clearTimeout(orientationTimeout)
      orientationTimeout = null
    }

    // If orientation is changing, delay until after fade out
    if (newOrientation !== currentOrientation) {
      orientationTimeout = setTimeout(() => {
        gameContainer.setOrientation(newOrientation)
        orientationTimeout = null
      }, FADE_OUT_DURATION)
    }
  })

  $effect(() => {
    if ($page.url.searchParams.has("reset")) {
      phase = "splash"
      goto("/headsup", { replaceState: true })
    }
  })
</script>

<svelte:head>
  <title>Heads Up - Campfire Games</title>
  <meta name="description" content="What's on your head? Find out!" />
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
      in:fade={{ duration: 200, delay: 200 }}
      out:fade={{ duration: 200 }}
    >
      {#if phase === "splash"}
        <SplashScreen onStart={startGame} />
      {:else if phase === "categorySelect"}
        <CategorySelectScreen onSelect={selectCategory} />
      {:else if phase === "getReady"}
        <GetReadyScreen onStart={startRound} onBack={() => (phase = "categorySelect")} />
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
