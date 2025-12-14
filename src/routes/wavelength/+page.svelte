<script lang="ts">
  import { goto } from "$app/navigation"
  import { page } from "$app/stores"
  import GuessPhase from "$lib/components/wavelength/GuessPhase.svelte"
  import PromptPhase from "$lib/components/wavelength/PromptPhase.svelte"
  import PsychicPhase from "$lib/components/wavelength/PsychicPhase.svelte"
  import RevealPhase from "$lib/components/wavelength/RevealPhase.svelte"
  import SplashScreen from "$lib/components/wavelength/SplashScreen.svelte"
  import { type Prompt, wavelengthPrompts } from "$lib/data/wavelengthPrompts"
  import { getPromptColors } from "$lib/utils/colors"

  type GamePhase = "splash" | "prompt" | "psychic" | "guess" | "reveal"

  let phase = $state<GamePhase>("splash")
  let currentPrompts = $state<Prompt[]>([])
  let viewedPrompts = $state<Set<string>>(new Set())
  let selectedPrompt = $state<Prompt | null>(null)
  let selectedPromptIndex = $state<number>(0)
  // Target and guess are now -10 to 10 internal values (10% increments)
  // -10 = 100% left, 0 = 0% center, 10 = 100% right
  let target = $state<number>(0)
  let guess = $state<number>(0)
  let promptColors = $state<[string, string]>(["#fff", "#fff"])

  function getPromptKey(prompt: Prompt): string {
    return `${prompt[0]}|${prompt[1]}`
  }

  function getRandomPrompts(count: number): Prompt[] {
    // Get unviewed prompts
    const unviewedPrompts = wavelengthPrompts.filter(
      (prompt) => !viewedPrompts.has(getPromptKey(prompt))
    )

    // If all prompts have been viewed, reset
    if (unviewedPrompts.length < count) {
      viewedPrompts.clear()
      const shuffled = [...wavelengthPrompts].sort(() => 0.5 - Math.random())
      return shuffled.slice(0, count)
    }

    // Select random prompts from unviewed
    const shuffled = [...unviewedPrompts].sort(() => 0.5 - Math.random())
    return shuffled.slice(0, count)
  }

  function startNewRound() {
    currentPrompts = getRandomPrompts(3)
    selectedPrompt = null
    selectedPromptIndex = 0
    target = Math.floor(Math.random() * 21) - 10 // -10 to 10 (representing 10% increments)
    guess = 0 // Start at center (0%)
    phase = "prompt"
  }

  function handleStartGame() {
    startNewRound()
  }

  function handleSelectPrompt(prompt: Prompt, index: number) {
    selectedPrompt = prompt
    selectedPromptIndex = index
    promptColors = getPromptColors(index, 3)
    target = Math.floor(Math.random() * 21) - 10 // -10 to 10
    // Mark prompt as viewed
    viewedPrompts.add(getPromptKey(prompt))
    phase = "psychic"
  }

  function handleReroll() {
    currentPrompts = getRandomPrompts(3)
  }

  function handleBackToPrompts() {
    phase = "prompt"
    selectedPrompt = null
    selectedPromptIndex = 0
  }

  function handleReadyToGuess() {
    phase = "guess"
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
    {:else if phase === "prompt"}
      <PromptPhase
        prompts={currentPrompts}
        onSelectPrompt={handleSelectPrompt}
        onReroll={handleReroll}
      />
    {:else if phase === "psychic"}
      {#if selectedPrompt}
        <PsychicPhase
          {selectedPrompt}
          {selectedPromptIndex}
          {target}
          leftColor={promptColors[0]}
          rightColor={promptColors[1]}
          onReadyToGuess={handleReadyToGuess}
          onBack={handleBackToPrompts}
        />
      {/if}
    {:else if phase === "guess"}
      {#if selectedPrompt}
        <GuessPhase
          prompt={selectedPrompt}
          leftColor={promptColors[0]}
          rightColor={promptColors[1]}
          onLockIn={handleLockIn}
        />
      {/if}
    {:else if phase === "reveal"}
      {#if selectedPrompt}
        <RevealPhase
          prompt={selectedPrompt}
          {target}
          {guess}
          leftColor={promptColors[0]}
          rightColor={promptColors[1]}
          onNextRound={handleNextRound}
        />
      {/if}
    {/if}
  </main>
</div>
