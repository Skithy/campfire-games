<script lang="ts">
  import { goto } from "$app/navigation"
  import { page } from "$app/stores"
  import GuessingView from "$lib/components/wavelength/GuessingView.svelte"
  import PsychicView from "$lib/components/wavelength/PsychicView.svelte"
  import RevealView from "$lib/components/wavelength/RevealView.svelte"
  import SplashScreen from "$lib/components/wavelength/SplashScreen.svelte"
  import { type Prompt, wavelengthPrompts } from "$lib/data/wavelengthPrompts"

  type GamePhase = "splash" | "psychic" | "guessing" | "reveal"

  let phase = $state<GamePhase>("splash")
  let currentPrompts = $state<Prompt[]>([])
  let selectedPrompt = $state<Prompt | null>(null)
  // Target and guess are now -10 to 10 internal values (10% increments)
  // -10 = 100% left, 0 = 0% center, 10 = 100% right
  let target = $state<number>(0)
  let guess = $state<number>(0)

  function getRandomPrompts(count: number): Prompt[] {
    const shuffled = [...wavelengthPrompts].sort(() => 0.5 - Math.random())
    return shuffled.slice(0, count)
  }

  function startNewRound() {
    currentPrompts = getRandomPrompts(3)
    selectedPrompt = null
    target = Math.floor(Math.random() * 21) - 10 // -10 to 10 (representing 10% increments)
    guess = 0 // Start at center (0%)
    phase = "psychic"
  }

  function handleStartGame() {
    startNewRound()
  }

  function handleSelectPrompt(prompt: Prompt) {
    selectedPrompt = prompt
    // Regenerate target when a prompt is selected so players get a fresh value if they switch
    target = Math.floor(Math.random() * 21) - 10 // -10 to 10
  }

  function handleReroll() {
    currentPrompts = getRandomPrompts(3)
  }

  function handleReadyToGuess() {
    phase = "guessing"
  }

  function handleLockIn(playerGuess: number) {
    guess = playerGuess
    phase = "reveal"
  }

  function handleNextRound() {
    startNewRound()
  }

  $effect(() => {
    if ($page.url.searchParams.has("reset")) {
      phase = "splash"
      goto("/wavelength", { replaceState: true })
    }
  })
</script>

<div class="flex min-h-screen flex-col bg-[#111] p-4 font-sans text-white">
  <main class="flex flex-1 justify-center">
    {#if phase === "splash"}
      <SplashScreen onStart={handleStartGame} />
    {:else if phase === "psychic"}
      <PsychicView
        prompts={currentPrompts}
        {target}
        onSelectPrompt={handleSelectPrompt}
        onReroll={handleReroll}
        onReadyToGuess={handleReadyToGuess}
      />
    {:else if phase === "guessing"}
      {#if selectedPrompt}
        <GuessingView prompt={selectedPrompt} onLockIn={handleLockIn} />
      {/if}
    {:else if phase === "reveal"}
      {#if selectedPrompt}
        <RevealView prompt={selectedPrompt} {target} {guess} onNextRound={handleNextRound} />
      {/if}
    {/if}
  </main>
</div>
