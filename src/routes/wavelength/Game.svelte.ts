import { differenceBy, shuffle } from "es-toolkit"

import { type Prompt, prompts } from "./data"

export class WavelengthGame {
  selectedPrompt: Prompt | null = $state(null)
  prompts: Prompt[] = $state([])
  playedPrompts: Prompt[] = $state([])

  /**
   * Create a game object from the player's cookie, or initialise a new game
   */
  constructor() {}

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
}
