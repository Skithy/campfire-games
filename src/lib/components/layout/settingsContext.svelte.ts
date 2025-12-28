import { createContext } from "svelte"

export interface SettingsContext {
  isMusicEnabled: boolean
  isVibrationEnabled: boolean
  toggleMusic: () => void
  toggleVibration: () => void
}

export const [getSettingsContext, setSettingsContext] = createContext<SettingsContext>()
