import { differenceBy, random, shuffle } from "es-toolkit"

import { type Prompt, prompts } from "./data"

enum Screens {
  LOBBY = "lobby",
  PROMPT = "prompt",
  SCORE = "score",
}

export class WavelengthGame {
  screen: Screens = $state(Screens.LOBBY)
  selectedPrompt: Prompt | null = $state(null)
  rating: number = $state(0)
  prompts: Prompt[] = $state([])
  playedPrompts: Prompt[] = $state([])

  /**
   * Create a game object from the player's cookie, or initialise a new game
   */
  constructor() {}

  startGame() {
    this.screen = Screens.PROMPT
    this.playedPrompts = []
    this.drawPrompts()
  }

  drawPrompts(): Prompt[] {
    let availablePrompts = differenceBy(
      prompts,
      [...this.prompts, ...this.playedPrompts],
      (p) => p.id,
    )

    // Reset played prompts if all have been used
    if (availablePrompts.length < 3) {
      this.playedPrompts = []
      availablePrompts = prompts
    }

    // Draw three unique random prompts
    this.prompts = shuffle(availablePrompts).slice(0, 3)
    this.selectedPrompt = null

    return this.prompts
  }

  selectPrompt(prompt: Prompt) {
    this.screen = Screens.SCORE
    this.selectedPrompt = prompt
    this.playedPrompts.push(prompt)
    this.rating = Math.floor(random(101))
  }

  nextRound() {
    this.screen = Screens.PROMPT
    this.drawPrompts()
  }
}
