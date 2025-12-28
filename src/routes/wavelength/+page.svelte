<script lang="ts">
  import { SvelteSet } from "svelte/reactivity"
  import { fade } from "svelte/transition"

  import { goto } from "$app/navigation"
  import { page } from "$app/stores"
  import { getGameContainerContext } from "$lib/components/layout/gameContainerContext.svelte"
  import PageHeader from "$lib/components/layout/PageHeader.svelte"
  import GuessScreen from "$lib/components/wavelength/GuessScreen.svelte"
  import PromptScreen from "$lib/components/wavelength/PromptScreen.svelte"
  import PsychicScreen from "$lib/components/wavelength/PsychicScreen.svelte"
  import RevealScreen from "$lib/components/wavelength/RevealScreen.svelte"
  import SplashScreen from "$lib/components/wavelength/SplashScreen.svelte"
  import { GOLD, GREEN, PURPLE, RED } from "$lib/constants/colors"
  import { type Prompt, wavelengthPrompts } from "$lib/data/wavelengthPrompts"
  import { Color, sliderToDisplayValue } from "$lib/utils/colors"

  type GamePhase = "splash" | "prompt" | "psychic" | "guess" | "reveal"

  let phase = $state<GamePhase>("splash")
  let currentPrompts = $state<Prompt[]>([])
  let promptListColors = $state<Array<[Color, Color]>>([])
  let viewedPrompts = new SvelteSet<string>()
  let selectedPrompt = $state<Prompt | null>(null)
  // Target and guess are now -10 to 10 internal values (10% increments)
  // -10 = 100% left, 0 = 0% center, 10 = 100% right
  let target = $state<number>(0)
  let guess = $state<number>(0)
  let promptColors = $state<[Color, Color]>([Color.rgb(255, 255, 255), Color.rgb(255, 255, 255)])

  // Calculate score level for background color in reveal phase
  let scoreLevel = $derived.by(() => {
    if (phase !== "reveal") return "neutral" as const
    const difference = Math.abs(target - guess)
    if (difference === 0) return "great" as const
    if (difference <= 1) return "good" as const
    if (difference <= 3) return "okay" as const
    return "miss" as const
  })

  // Background gradient colors for each phase
  let backgroundColors = $derived.by((): { top: Color; bottom: Color } => {
    if (phase === "splash") {
      return { top: PURPLE, bottom: GOLD }
    }
    if (phase === "prompt" || phase === "psychic") {
      return { top: PURPLE, bottom: PURPLE }
    }
    if (phase === "guess") {
      return { top: GOLD, bottom: GOLD }
    }
    if (phase === "reveal") {
      switch (scoreLevel) {
        case "great":
        case "good":
          return { top: GREEN, bottom: GREEN }
        case "okay":
          return { top: GOLD, bottom: GOLD }
        case "miss":
        default:
          return { top: RED, bottom: RED }
      }
    }
    return { top: PURPLE, bottom: PURPLE }
  })

  // Header configuration for each phase
  let headerConfig = $derived.by(() => {
    if (phase === "splash") {
      return null // No header for splash
    }

    if (phase === "reveal") {
      const difference = Math.abs(target - guess)
      const diffPercent = Math.abs(sliderToDisplayValue(target) - sliderToDisplayValue(guess))

      if (difference === 0) {
        return {
          label: "Results",
          title: "Perfect!",
          description: "You nailed it exactly!",
          color: GREEN,
        }
      }
      if (difference <= 1) {
        return {
          label: "Results",
          title: "So Close!",
          description: `Almost there! Just ${diffPercent}% off`,
          color: GREEN,
        }
      }
      if (difference <= 3) {
        return {
          label: "Results",
          title: "Not Bad",
          description: `Good effort — ${diffPercent}% off`,
          color: GOLD,
        }
      }
      return {
        label: "Results",
        title: "Way Off...",
        description: "Better luck next time!",
        color: RED,
      }
    }

    switch (phase) {
      case "prompt":
        return {
          label: "Psychic's Turn",
          title: "Pick a Spectrum",
          description: "Choose a prompt for your team",
          color: PURPLE,
        }
      case "psychic":
        return {
          label: "Psychic's Turn",
          title: "Give a Clue",
          description: "Help your team find the target",
          color: PURPLE,
        }
      case "guess":
        return {
          label: "Team's Turn",
          title: "Make a Guess",
          description: "Where on the spectrum is the clue?",
          color: GOLD,
        }
      default:
        return null
    }
  })

  function generatePromptColors(prompts: Prompt[]): Array<[Color, Color]> {
    const count = prompts.length
    // Generate random starting hue, then space hues evenly for distinctness
    const randomStartHue = Math.random() * 360
    const hueStep = 360 / count

    return Array.from({ length: count }, (_, i) => {
      const hue = (randomStartHue + i * hueStep) % 360
      const complementHue = (hue + 180) % 360
      const leftColor = Color.hsl(hue, 70, 80)
      const rightColor = Color.hsl(complementHue, 70, 80)
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

  const ctx = getGameContainerContext()
  $effect(() => {
    ctx.setBackground(backgroundColors.top, backgroundColors.bottom)
  })

  $effect(() => {
    if ($page.url.searchParams.has("reset")) {
      phase = "splash"
      goto("/wavelength", { replaceState: true })
    }
  })
</script>

<div class={["relative", "h-full w-full"]}>
  <!-- Header layer - absolutely positioned so it doesn't cause layout shift -->
  {#if headerConfig}
    <div class={["absolute inset-x-0 top-0 z-10", "pt-6"]} transition:fade={{ duration: 150 }}>
      <PageHeader
        label={headerConfig.label}
        title={headerConfig.title}
        description={headerConfig.description}
        color={headerConfig.color}
      />
    </div>
  {/if}

  <!-- Content layer -->
  {#key phase}
    <div
      class={["absolute inset-0", "flex flex-col items-center gap-4", "w-full", "pt-6"]}
      in:fade={{ duration: 300, delay: 150 }}
      out:fade={{ duration: 150 }}
    >
      {#if phase === "splash"}
        <SplashScreen onStart={handleStartGame} />
      {:else if phase === "prompt"}
        <div class="h-30 shrink-0"></div>
        <PromptScreen
          prompts={currentPrompts}
          promptColors={promptListColors}
          onSelectPrompt={handleSelectPrompt}
          onReroll={handleReroll}
        />
      {:else if phase === "psychic" && selectedPrompt}
        <div class="h-30 shrink-0"></div>
        <PsychicScreen
          {selectedPrompt}
          {target}
          leftColor={promptColors[0]}
          rightColor={promptColors[1]}
          onReadyToGuess={handleReadyToGuess}
          onBack={handleBackToPrompts}
        />
      {:else if phase === "guess" && selectedPrompt}
        <div class="h-30 shrink-0"></div>
        <GuessScreen
          prompt={selectedPrompt}
          leftColor={promptColors[0]}
          rightColor={promptColors[1]}
          onLockIn={handleLockIn}
          onBack={handleBackToPsychic}
        />
      {:else if phase === "reveal" && selectedPrompt}
        <div class="h-30 shrink-0"></div>
        <RevealScreen
          prompt={selectedPrompt}
          {target}
          {guess}
          leftColor={promptColors[0]}
          rightColor={promptColors[1]}
          onNextRound={handleNextRound}
        />
      {/if}
    </div>
  {/key}
</div>
