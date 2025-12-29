import { createContext } from "svelte"

import type { Color } from "$lib/utils/colors"

export enum Orientation {
  Portrait = "portrait",
  Landscape = "landscape",
}

export interface GameContainerContext {
  backgroundTop: Color | undefined
  backgroundBottom: Color | undefined
  orientation: Orientation
  setBackground: (top: Color, bottom: Color) => void
  setOrientation: (orientation: Orientation) => void
}

export const [getGameContainerContext, setGameContainerContext] =
  createContext<GameContainerContext>()
