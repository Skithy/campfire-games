import { createContext } from "svelte"

export interface SettingsContext {
  isMusicEnabled: boolean
  isVibrationEnabled: boolean
  isTiltEnabled: boolean
  isTiltSupported: boolean
  toggleMusic: () => void
  toggleVibration: () => void
  toggleTilt: () => void
}

export const [getSettingsContext, setSettingsContext] = createContext<SettingsContext>()
