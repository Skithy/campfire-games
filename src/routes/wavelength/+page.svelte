<script lang="ts">
  import { goto } from "$app/navigation"
  import { page } from "$app/stores"
  import GuessPhase from "$lib/components/wavelength/GuessPhase.svelte"
  import PhaseBackground from "$lib/components/wavelength/PhaseBackground.svelte"
  import PromptPhase from "$lib/components/wavelength/PromptPhase.svelte"
  import PsychicPhase from "$lib/components/wavelength/PsychicPhase.svelte"
  import RevealPhase from "$lib/components/wavelength/RevealPhase.svelte"
  import SplashScreen from "$lib/components/wavelength/SplashScreen.svelte"
  import { type Prompt, wavelengthPrompts } from "$lib/data/wavelengthPrompts"

  type GamePhase = "splash" | "prompt" | "psychic" | "guess" | "reveal"

  let phase = $state<GamePhase>("splash")
  let currentPrompts = $state<Prompt[]>([])
  let promptListColors = $state<Array<[string, string]>>([])
  let viewedPrompts = $state<Set<string>>(new Set())
  let selectedPrompt = $state<Prompt | null>(null)
  // Target and guess are now -10 to 10 internal values (10% increments)
  // -10 = 100% left, 0 = 0% center, 10 = 100% right
  let target = $state<number>(0)
  let guess = $state<number>(0)
  let promptColors = $state<[string, string]>(["#fff", "#fff"])

  // Calculate score level for background color in reveal phase
  let scoreLevel = $derived.by(() => {
    if (phase !== "reveal") return "neutral" as const
    const difference = Math.abs(target - guess)
    if (difference === 0) return "great" as const
    if (difference <= 1) return "good" as const
    if (difference <= 3) return "okay" as const
    return "miss" as const
  })

  function generatePromptColors(prompts: Prompt[]): Array<[string, string]> {
    const count = prompts.length
    // Generate random starting hue, then space hues evenly for distinctness
    const randomStartHue = Math.random() * 360
    const hueStep = 360 / count

    return Array.from({ length: count }, (_, i) => {
      const hue = (randomStartHue + i * hueStep) % 360
      const complementHue = (hue + 180) % 360
      const leftColor = `hsl(${Math.round(hue)}, 70%, 80%)`
      const rightColor = `hsl(${Math.round(complementHue)}, 70%, 80%)`
      return [leftColor, rightColor]
    })
  }

  function getPromptKey(prompt: Prompt): string {
    return `${prompt[0]}|${prompt[1]}`
  }

  function getRandomPrompts(count: number): Prompt[] {
    // Get unviewed prompts
    const unviewedPrompts = wavelengthPrompts.filter(
      (prompt) => !viewedPrompts.has(getPromptKey(prompt)),
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
    promptListColors = generatePromptColors(currentPrompts)
    selectedPrompt = null
    target = Math.floor(Math.random() * 21) - 10 // -10 to 10 (representing 10% increments)
    guess = 0 // Start at center (0%)
    phase = "prompt"
  }

  function handleStartGame() {
    startNewRound()
  }

  function handleSelectPrompt(prompt: Prompt, index: number) {
    selectedPrompt = prompt
    promptColors = promptListColors[index]
    target = Math.floor(Math.random() * 21) - 10 // -10 to 10
    // Mark prompt as viewed
    viewedPrompts.add(getPromptKey(prompt))
    phase = "psychic"
  }

  function handleReroll() {
    currentPrompts = getRandomPrompts(3)
    promptListColors = generatePromptColors(currentPrompts)
  }

  function handleBackToPrompts() {
    phase = "prompt"
    selectedPrompt = null
  }

  function handleBackToPsychic() {
    phase = "psychic"
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

<div class="relative flex h-full flex-col overflow-hidden bg-[#111] font-sans text-white">
  <PhaseBackground {phase} {scoreLevel} />
  <main class="relative flex min-h-0 flex-1 justify-center overflow-auto">
    {#if phase === "splash"}
      <SplashScreen onStart={handleStartGame} />
    {:else if phase === "prompt"}
      <PromptPhase
        prompts={currentPrompts}
        promptColors={promptListColors}
        onSelectPrompt={handleSelectPrompt}
        onReroll={handleReroll}
      />
    {:else if phase === "psychic"}
      {#if selectedPrompt}
        <PsychicPhase
          {selectedPrompt}
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
          onBack={handleBackToPsychic}
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
