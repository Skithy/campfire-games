import { createContext } from "svelte"

import type { Color } from "$lib/utils/colors"

export interface GameContainerContext {
  backgroundTop: Color | undefined
  backgroundBottom: Color | undefined
  setBackground: (top: Color, bottom: Color) => void
}

export const [getGameContainerContext, setGameContainerContext] =
  createContext<GameContainerContext>()
